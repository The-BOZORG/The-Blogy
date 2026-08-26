import { prisma } from '@/configs/database';

import { GoogleUserData } from '@/shared/interfaces/google.interface';

class GoogleService {
  public async findOrCreateGoogleUser(data: GoogleUserData) {
    const { googleId, email, username } = data;

    const existingGoogleUser = await prisma.user.findUnique({
      where: {
        googleId,
      },
    });

    if (existingGoogleUser) return existingGoogleUser;

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return prisma.user.update({
        where: {
          id: existingUser.id,
        },
        data: {
          googleId,
        },
      });
    }

    return prisma.user.create({
      data: {
        googleId,
        email,
        username,
        password: null,
        status: 'VERIFIED',
      },
    });
  }
}

export const googleService = new GoogleService();
