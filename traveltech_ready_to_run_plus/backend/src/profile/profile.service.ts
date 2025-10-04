import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

export const PROFILE_RELATIONS: Prisma.UserInclude = {
  badges: {
    include: {
      badge: true,
    },
    orderBy: {
      ts: 'desc',
    },
  },
};

export type ProfileWithRelations = Prisma.UserGetPayload<{ include: typeof PROFILE_RELATIONS }>;

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async me(userId: string): Promise<ProfileWithRelations> {
    const profile = await this.prisma.user.findUnique({
      where: { id: userId },
      include: PROFILE_RELATIONS,
    });

    if (!profile) {
      throw new NotFoundException('User profile not found');
    }

    return profile;
  }
}
