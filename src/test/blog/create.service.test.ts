import { prisma } from '@/configs/database';
import { createBlogService } from '@/service/blog/create.service';
import { CreateBlogData } from '@/shared/interfaces';

jest.mock('@/configs/database', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
    },
    blog: {
      create: jest.fn(),
    },
  },
}));

describe('CreateBlogService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // first test
  it('should create blog successfully', async () => {
    const userId = 'user-id';

    const data: CreateBlogData = {
      title: 'this is title',
      content: 'this is content test',
      status: 'DRAFT',
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: userId,
      isActive: 'ACTIVE',
    });

    (prisma.blog.create as jest.Mock).mockResolvedValue({
      id: 'blog-id',
      title: data.title,
      content: data.content,
      status: data.status,
    });

    const result = await createBlogService.createBlog(userId, data);

    expect(result).toEqual({
      id: 'blog-id',
      title: data.title,
      content: data.content,
      status: data.status,
    });

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: {
        id: userId,
      },
    });

    expect(prisma.blog.create).toHaveBeenCalledWith({
      data: {
        title: data.title,
        slug: expect.any(String),
        content: data.content,
        banner: null,
        status: data.status,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  });

  // user not found test
  it('should throw NotFoundError if user does not exist', async () => {
    const userId = 'user-id';

    const data: CreateBlogData = {
      title: 'this is title',
      content: 'this is content test',
      status: 'DRAFT',
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    await expect(createBlogService.createBlog(userId, data)).rejects.toThrow(
      'User not found',
    );

    expect(prisma.blog.create).not.toHaveBeenCalled();
  });

  // user is not active test
  it('should throw AuthorizedError if user is not active', async () => {
    const userId = 'user-id';

    const data: CreateBlogData = {
      title: 'this is title',
      content: 'this is content test',
      status: 'DRAFT',
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: userId,
      isActive: 'BANNED',
    });

    await expect(createBlogService.createBlog(userId, data)).rejects.toThrow(
      'user is not allowed to create blog',
    );

    expect(prisma.blog.create).not.toHaveBeenCalled();
  });

  // create blog with banner test
  it('should create blog with banner successfully', async () => {
    const userId = 'user-id';

    const data: CreateBlogData = {
      title: 'this is title',
      content: 'this is content test',
      status: 'DRAFT',
    };

    const file = {
      filename: 'blog-banner.jpg',
    } as Express.Multer.File;

    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: userId,
      isActive: 'ACTIVE',
    });

    (prisma.blog.create as jest.Mock).mockResolvedValue({
      id: 'blog-id',
      title: data.title,
      content: data.content,
      slug: 'this-is-title',
      banner: file.filename,
      status: data.status,
    });

    const result = await createBlogService.createBlog(userId, data, file);

    expect(result).toEqual({
      id: 'blog-id',
      title: data.title,
      content: data.content,
      slug: 'this-is-title',
      banner: file.filename,
      status: data.status,
    });

    expect(prisma.blog.create).toHaveBeenCalledWith({
      data: {
        title: data.title,
        slug: expect.any(String),
        content: data.content,
        banner: file.filename,
        status: data.status,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  });
});
