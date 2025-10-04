import { NotFoundException } from '@nestjs/common';
import { ProfileService, PROFILE_RELATIONS } from '../src/profile/profile.service';

describe('ProfileService', () => {
  const findUnique = jest.fn();
  const prismaMock = {
    user: { findUnique },
  } as any;
  const service = new ProfileService(prismaMock);

  beforeEach(() => {
    findUnique.mockReset();
  });

  it('returns the existing profile when found', async () => {
    const profile = { id: 'user-1', xp: 42, level: 3, badges: [] };
    findUnique.mockResolvedValueOnce(profile);

    await expect(service.me('user-1')).resolves.toBe(profile);

    expect(findUnique).toHaveBeenCalledWith({
      where: { id: 'user-1' },
      include: PROFILE_RELATIONS,
    });
  });

  it('throws NotFoundException when the user is absent', async () => {
    findUnique.mockResolvedValueOnce(null);

    await expect(service.me('missing-user')).rejects.toBeInstanceOf(NotFoundException);
  });
});
