
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { haversineDistance } from '../common/utils/geo';
import { poiScore } from '../common/utils/score';

@Injectable()
export class PoiService {
  constructor(private prisma: PrismaService) {}

  async nearby(lat:number, lng:number, radius=1000, prefsCsv?: string) {
    const prefs = (prefsCsv || '').split(',').map(s=>s.trim().toLowerCase()).filter(Boolean);
    const all = await this.prisma.pOI.findMany();
    const enriched = all.map(p => {
      const dist = haversineDistance(lat, lng, p.lat, p.lng);
      const prefMatch = prefs.length ? (p.categories.some(c => prefs.includes(c.toLowerCase())) ? 1 : 0) : 0.5;
      const affluence = 0.4; // heuristique v1
      const score = poiScore(dist, p.popularity ?? 0.5, prefMatch, affluence);
      return { ...p, distance: dist, score };
    }).filter(p => p.distance <= radius);
    enriched.sort((a,b)=> b.score - a.score);
    return enriched.slice(0, 30);
  }

  async getOne(id: string) {
    return this.prisma.pOI.findUnique({ where: { id } });
  }
}
