import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// ── Simple in-memory rate limiter ──────────────────────────────────────────
// Limits each IP to MAX_REQUESTS per WINDOW_MS to protect Resend quota.
// Note: resets on serverless cold start; sufficient for a portfolio contact form.
const rateMap = new Map<string, { count: number; resetAt: number }>();
const MAX_REQUESTS = 3;
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const entry = rateMap.get(ip);

    if (!entry || now > entry.resetAt) {
        rateMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
        return false;
    }

    if (entry.count >= MAX_REQUESTS) return true;

    entry.count++;
    return false;
}

// ── Input validation ───────────────────────────────────────────────────────
const EMAIL_REGEX = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
const MAX_NAME_LEN = 100;
const MAX_EMAIL_LEN = 254; // RFC 5321 max
const MAX_MSG_LEN = 2000;

// ── HTML entity escaping to prevent XSS in email body ─────────────────────
function escapeHtml(str: string): string {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
        .replace(/\n/g, '<br/>');
}

export async function POST(request: NextRequest) {
    try {
        // ── Rate limiting ──────────────────────────────────────────────────
        const ip =
            request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
            request.headers.get('x-real-ip') ??
            'unknown';

        if (isRateLimited(ip)) {
            return NextResponse.json(
                { error: 'Too many requests. Please wait 10 minutes before trying again.' },
                { status: 429 }
            );
        }

        // ── Parse body ─────────────────────────────────────────────────────
        let body: unknown;
        try {
            body = await request.json();
        } catch {
            return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
        }

        const { name, email, message } = body as Record<string, unknown>;

        // ── Validation ─────────────────────────────────────────────────────
        if (
            typeof name !== 'string' ||
            typeof email !== 'string' ||
            typeof message !== 'string'
        ) {
            return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
        }

        const trimName = name.trim();
        const trimEmail = email.trim();
        const trimMsg = message.trim();

        if (!trimName || !trimEmail || !trimMsg) {
            return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
        }
        if (trimName.length > MAX_NAME_LEN) {
            return NextResponse.json({ error: 'Name is too long.' }, { status: 400 });
        }
        if (trimEmail.length > MAX_EMAIL_LEN || !EMAIL_REGEX.test(trimEmail)) {
            return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
        }
        if (trimMsg.length > MAX_MSG_LEN) {
            return NextResponse.json(
                { error: `Message must be under ${MAX_MSG_LEN} characters.` },
                { status: 400 }
            );
        }

        // ── Sanitise inputs before embedding into HTML email ───────────────
        const safeName = escapeHtml(trimName);
        const safeEmail = escapeHtml(trimEmail);
        const safeMsg = escapeHtml(trimMsg);

        // ── Send via Resend ────────────────────────────────────────────────
        // TODO: Once you verify a sender domain in Resend (e.g., contact@nishantunavane.qzz.io),
        //       replace 'onboarding@resend.dev' with that address.
        //       See: https://resend.com/domains
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: process.env.EMAIL_TO || 'nishant.unavane@outlook.com',
            replyTo: trimEmail, // Replies go directly to the sender
            subject: `Portfolio contact from ${safeName}`,
            html: `
                <div style="font-family: monospace; max-width: 600px; margin: 0 auto; padding: 24px; background: #0c0c0b; color: #fff; border: 1px solid #1f2228;">
                    <h2 style="color: #eaeaea; margin: 0 0 20px; font-size: 20px; font-weight: 400;">
                        New Contact Form Submission
                    </h2>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr style="border-bottom: 1px solid #1f2228;">
                            <td style="padding: 10px 0; color: #7d8187; width: 80px;">Name</td>
                            <td style="padding: 10px 0; color: #fff;">${safeName}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #1f2228;">
                            <td style="padding: 10px 0; color: #7d8187;">Email</td>
                            <td style="padding: 10px 0; color: #fff;">${safeEmail}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; color: #7d8187; vertical-align: top;">Message</td>
                            <td style="padding: 10px 0; color: #fff; line-height: 1.6;">${safeMsg}</td>
                        </tr>
                    </table>
                    <p style="margin: 24px 0 0; font-size: 12px; color: #7d8187;">
                        Sent from nishantunavane.qzz.io · Reply to this email to respond directly.
                    </p>
                </div>
            `,
        });

        return NextResponse.json({ message: 'Email sent successfully.' }, { status: 200 });
    } catch (error) {
        console.error('Contact API error:', error);
        return NextResponse.json({ error: 'Failed to send email. Please try again.' }, { status: 500 });
    }
}
