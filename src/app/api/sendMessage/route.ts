import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  console.log(process.env.MY_EMAIL)
  const body = await req.json();
  const { message } = body;

  if (!message || message.trim().length < 5) {
    return NextResponse.json({ message: 'Please write a message' }, { status: 400 });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Anonymous message" <${process.env.MY_EMAIL}>`,
      to: process.env.RECEIVER_EMAIL,
      subject: 'New message from the website',
      text: message,
    });

    return NextResponse.json({ message: 'Message sent!' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Error sending message' }, { status: 500 });
  }
}
