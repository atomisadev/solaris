import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connect";
import { Email } from "@/lib/models/Email";
import { z } from "zod";
import { Resend } from "resend";
import { render } from "@react-email/render";
import RecruitmentEmail from "@/components/emails/RecruitmentEmail";
const resend = new Resend(process.env.RESEND_KEY);

const emailSchema = z.object({
  email: z.string().email(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = emailSchema.parse(body);

    await connectDB();

    const ipAddress = req.headers.get("x-forwarded-for") || "unknown";

    await Email.create({
      email,
      ipAddress,
    });

    // Render the React Email component to HTML
    // const html = render(RecruitmentEmail({ recipientEmail: email }));

    await resend.emails.send({
      from: "Solaris Mission Control <onboarding@hacksolaris.com>",
      to: email,
      subject: "Your Solaris Recruitment Letter",
      react: RecruitmentEmail({ recipientEmail: email }),
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email submission error:", error);
    return NextResponse.json({ error: "Failed to submit email", status: 400 });
  }
}
