import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('me')
  me(@Req() req: Request) {
    const userId = (req.headers['x-user-id'] as string) || 'anonymous';
    return this.profileService.me(userId);
  }
}
