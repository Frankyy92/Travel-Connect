
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class FeaturedService {
  constructor(private prisma: PrismaService) {}

  async list(city?: string) {
    const where:any = city ? { city } : {};
    const rows = await this.prisma.featuredItinerary.findMany({ where, orderBy: { name: 'asc' }});
    return rows.map(r => ({ ...r, poiIds: r.poiIds.split(',') }));
  }

  async get(id: string) {
    const row = await this.prisma.featuredItinerary.findUnique({ where: { id }});
    if (!row) return null;
    const poiIds = row.poiIds.split(',');
    const pois = await this.prisma.pOI.findMany({ where: { id: { in: poiIds }}});
    return { ...row, poiIds, pois };
  }
}
