import { prisma } from '@/configs/database';
import { updateUserService } from '@/service/users/update.service';
import { NotFoundError } from '@/shared/errors/notFoundError';

jest.mock('@/configs/database', () => ({
  prisma: {
    user: {
      update: jest.fn(),
    },
  },
}));

describe('UpdateUserService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // first test
  it('should update user successfully', async () => {
    const userId = 'user-123';

    const data = {
      username: 'ali',
      email: 'update-test@gmail.com',
    };

    (prisma.user.update as jest.Mock).mockResolvedValue({
      id: userId,
      username: data.username,
      email: data.email,
    });

    const result = await updateUserService.updateUser(userId, data);

    expect(prisma.user.update).toHaveBeenCalledWith({
      where: {
        id: userId,
      },
      data: {
        username: data.username,
        email: data.email,
      },
    });

    expect(result).toEqual({
      id: userId,
      username: data.username,
      email: data.email,
    });
  });

  // secend test
  it('should throw NotFoundError when user does not exist', async () => {
    const userId = 'user-123';

    const data = {
      username: 'ali',
      email: 'update-test@gmail.com',
    };

    (prisma.user.update as jest.Mock).mockResolvedValue(null);

    await expect(updateUserService.updateUser(userId, data)).rejects.toThrow(
      new NotFoundError('user not found'),
    );
  });
});
