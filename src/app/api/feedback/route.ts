import { connectToDatabase } from '@/lib/mongodb';
import { NextRequest } from 'next/server';
import Feedback from '@/models/Feedback';

export async function GET() {
  await connectToDatabase();
  const feedbacks = await Feedback.find().sort({ createdAt: -1 });
  return Response.json(feedbacks);
}

export async function POST(req: NextRequest) {
  await connectToDatabase();

  try {
    const body = await req.json();
    const { name, message } = body;

    if (!name || !message) {
      return Response.json({ error: 'Name and message are required.' }, { status: 400 });
    }

    const newFeedback = await Feedback.create({ name, message });
    return Response.json(newFeedback, { status: 201 });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
