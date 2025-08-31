
import { Controller, Get, Param, Query } from '@nestjs/common';
import { FeaturedService } from './featured.service';

@Controller('itinerary/featured')
export class FeaturedController {
  constructor(private readonly service: FeaturedService) {}

  @Get()
  async list(@Query('city') city?: string) {
    return this.service.list(city);
  }

  @Get(':id')
  async one(@Param('id') id: string) {
    return this.service.get(id);
  }
}
