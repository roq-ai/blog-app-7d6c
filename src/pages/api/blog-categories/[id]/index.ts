import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { blogCategoryValidationSchema } from 'validationSchema/blog-categories';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.blog_category
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getBlogCategoryById();
    case 'PUT':
      return updateBlogCategoryById();
    case 'DELETE':
      return deleteBlogCategoryById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getBlogCategoryById() {
    const data = await prisma.blog_category.findFirst(convertQueryToPrismaUtil(req.query, 'blog_category'));
    return res.status(200).json(data);
  }

  async function updateBlogCategoryById() {
    await blogCategoryValidationSchema.validate(req.body);
    const data = await prisma.blog_category.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteBlogCategoryById() {
    const data = await prisma.blog_category.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
