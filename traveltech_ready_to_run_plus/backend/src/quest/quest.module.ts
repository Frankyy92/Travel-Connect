
import { Module } from '@nestjs/common';
import { QuestController } from './quest.controller';
import { QuestService } from './quest.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [QuestController],
  providers: [QuestService, PrismaService],
})
export class QuestModule {}
