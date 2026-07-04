import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, toEmail, subject } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Nom, email et message sont requis.' },
        { status: 400 }
      );
    }

    // Default to the provided toEmail or a fallback
    const targetEmail = toEmail || process.env.CONTACT_EMAIL || 'contact@innovdev-senegal.com';
    const mailSubject = subject || `Nouveau message de ${name} depuis le site INNOV'DEV`;

    const data = await resend.emails.send({
      from: 'INNOV DEV <onboarding@resend.dev>', // You should verify a domain in Resend for production
      to: [targetEmail],
      subject: mailSubject,
      replyTo: email,
      html: `
        <h2>Nouveau message depuis le site web</h2>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <hr />
        <p><strong>Message :</strong></p>
        <p style="white-space: pre-wrap;">${message}</p>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'envoi de l\'email.' },
      { status: 500 }
    );
  }
}
