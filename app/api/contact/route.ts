import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        // In a real application, you would parse the body
        // const { name, email, message } = await request.json();

        // Basic validation logic would go here

        // Nodemailer setup
        // const transporter = nodemailer.createTransport({
        //   host: process.env.SMTP_HOST,
        //   port: parseInt(process.env.SMTP_PORT || '587'),
        //   secure: false,
        //   auth: {
        //     user: process.env.SMTP_USER,
        //     pass: process.env.SMTP_PASS,
        //   },
        // });

        // await transporter.sendMail({
        //   from: process.env.SMTP_FROM,
        //   to: 'portfolio-owner@example.com',
        //   subject: `New Contact from ${name}`,
        //   text: message,
        //   html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
        // });

        // Simulating delay and success
        await new Promise(resolve => setTimeout(resolve, 500));
        console.log("Contact form submitted (Simulation)");

        return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }
}
