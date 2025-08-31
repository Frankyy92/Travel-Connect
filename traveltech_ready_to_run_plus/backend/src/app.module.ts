
import { Module } from '@nestjs/common';
import { PoiModule } from './poi/poi.module';
import { ItineraryModule } from './itinerary/itinerary.module';
import { QuestModule } from './quest/quest.module';
import { ProfileModule } from './profile/profile.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [PoiModule, ItineraryModule, QuestModule, ProfileModule],
  providers: [PrismaService],
  exports: [PrismaService]
})
export class AppModule {}
