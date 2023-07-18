import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { newsletterSubscriberValidationSchema } from 'validationSchema/newsletter-subscribers';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.newsletter_subscriber
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getNewsletterSubscriberById();
    case 'PUT':
      return updateNewsletterSubscriberById();
    case 'DELETE':
      return deleteNewsletterSubscriberById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getNewsletterSubscriberById() {
    const data = await prisma.newsletter_subscriber.findFirst(
      convertQueryToPrismaUtil(req.query, 'newsletter_subscriber'),
    );
    return res.status(200).json(data);
  }

  async function updateNewsletterSubscriberById() {
    await newsletterSubscriberValidationSchema.validate(req.body);
    const data = await prisma.newsletter_subscriber.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteNewsletterSubscriberById() {
    const data = await prisma.newsletter_subscriber.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
