
import { Body, Controller, Post } from '@nestjs/common';
import { ItineraryService } from './itinerary.service';

@Controller('itinerary')
export class ItineraryController {
  constructor(private readonly service: ItineraryService) {}

  @Post('plan')
  async plan(@Body() body: any) {
    const { start, duration=90, prefs } = body;
    const startLat = Number(start?.lat);
    const startLng = Number(start?.lng);
    return this.service.plan(startLat, startLng, Number(duration), prefs);
  }
}
