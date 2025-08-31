
import { Module } from '@nestjs/common';
import { PoiService } from './poi.service';
import { PoiController } from './poi.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [PoiController],
  providers: [PoiService, PrismaService],
  exports: [PoiService]
})
export class PoiModule {}
