
import { Controller, Get, Param, Query } from '@nestjs/common';
import { PoiService } from './poi.service';
import { NearbyDto } from './dto/nearby.dto';

@Controller('poi')
export class PoiController {
  constructor(private readonly poi: PoiService) {}

  @Get('nearby')
  async nearby(@Query() q: NearbyDto) {
    const lat = Number(q.lat), lng = Number(q.lng);
    const radius = q.radius ? Number(q.radius) : 1000;
    return this.poi.nearby(lat, lng, radius, q.prefs);
  }

  @Get(':id')
  async one(@Param('id') id: string) {
    return this.poi.getOne(id);
  }
}
