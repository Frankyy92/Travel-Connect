
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

function distanceMeters(a:{lat:number,lng:number}, b:{lat:number,lng:number}) {
  const R = 6371e3;
  const toRad = (d:number)=> d*Math.PI/180;
  const φ1 = toRad(a.lat), φ2 = toRad(b.lat), dφ = toRad(b.lat-a.lat), dλ = toRad(b.lng-a.lng);
  const x = Math.sin(dφ/2)**2 + Math.cos(φ1)*Math.cos(φ2)*Math.sin(dλ/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1-x));
}

@Injectable()
export class QuestService {
  constructor(private prisma: PrismaService) {}

  async questsNearPoi(poiId: string) {
    return this.prisma.quest.findMany({ where: { poiId }});
  }

  async validate(userId: string, questId: string, evidence: any) {
    const q = await this.prisma.quest.findUnique({ where: { id: questId }});
    if (!q) return { ok: false, reason: 'not_found' };
    const poi = await this.prisma.pOI.findUnique({ where: { id: q.poiId }});
    if (!poi) return { ok: false, reason: 'poi_not_found' };

    // Simple geofence: must be within 75 m for PHOTO/AR, 150 m for QUIZ
    const hasCoords = evidence && typeof evidence.lat==='number' && typeof evidence.lng==='number';
    const d = hasCoords ? distanceMeters({lat:evidence.lat,lng:evidence.lng},{lat:poi.lat,lng:poi.lng}) : Infinity;
    const maxD = q.type === 'QUIZ' ? 150 : 75;
    if (d > maxD) return { ok: false, reason: 'too_far', distance: Math.round(d) };

    // MVP: accept any text/photo flag; AR accepted if within 50m
    if (q.type === 'AR' && d > 50) return { ok: false, reason: 'ar_range', distance: Math.round(d) };

    const points = q.points || 20;
    const user = await this.prisma.user.upsert({
      where: { id: userId },
      update: { xp: { increment: points }},
      create: { id: userId, xp: points }
    });
    await this.prisma.visit.create({
      data: { userId: user.id, poiId: q.poiId, method: q.type, validated: true }
    });
    let badgeEarned: any = null;
    const countVisits = await this.prisma.visit.count({ where: { userId: user.id }});
    if (countVisits === 3) {
      const b = await this.prisma.badge.findFirst({ where: { name: 'Explorateur·rice' }});
      if (b) {
        await this.prisma.userBadge.create({ data: { userId: user.id, badgeId: b.id }});
        badgeEarned = b;
      }
    }
    return { ok: true, points, badge: badgeEarned };
  }
}
