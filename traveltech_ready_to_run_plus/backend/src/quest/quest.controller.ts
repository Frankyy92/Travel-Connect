
import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { QuestService } from './quest.service';
import { Request } from 'express';

@Controller('quest')
export class QuestController {
  constructor(private readonly service: QuestService) {}

  @Get('poi/:poiId')
  async byPoi(@Param('poiId') poiId: string) {
    return this.service.questsNearPoi(poiId);
  }

  @Post('validate')
  async validate(@Req() req: Request, @Body() body: any) {
    const userId = (req.headers['x-user-id'] as string) || body.userId || 'anonymous';
    return this.service.validate(userId, body.questId, body.evidence || {});
  }
}
