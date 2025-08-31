
import { Module } from '@nestjs/common';
import { ItineraryController } from './itinerary.controller';
import { ItineraryService } from './itinerary.service';
import { FeaturedController } from './featured.controller';
import { FeaturedService } from './featured.service';
import { PoiService } from '../poi/poi.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [ItineraryController, FeaturedController],
  providers: [ItineraryService, FeaturedService, PoiService, PrismaService]
})
export class ItineraryModule {}
