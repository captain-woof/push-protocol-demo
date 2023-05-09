// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { sendNotification } from '@/utils/notification';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Invoke notification
    const { status, data } = await sendNotification(req.body);

    // Send success response
    res.status(status ?? 200).json({
      success: true,
      resp: data
    });
  } catch (e: any) {
    console.error(e);

    // Send failure response
    res.status(500).json({
      success: false,
      error: e.toString()
    });
  }
}
