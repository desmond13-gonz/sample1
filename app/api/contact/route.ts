// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { layout } from "@/config/layout";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Get contact section config
    const contactSection = layout.find((s) => s.id === "contact");

    if (!contactSection || !contactSection.enabled) {
      return NextResponse.json({ error: "Contact form disabled" }, { status: 400 });
    }

    // Pull from config
    const apiKey = contactSection.mailgunApiKey || process.env.MAILGUN_API_KEY;
    const domain = contactSection.mailgunDomain || process.env.MAILGUN_DOMAIN;
    const apiUrl = contactSection.mailgunApiUrl || "https://api.mailgun.net/v3";
    const to = contactSection.contactOwnerEmail || process.env.CONTACT_OWNER_EMAIL;

    if (!apiKey || !domain || !to) {
      return NextResponse.json(
        { error: "Mailgun not configured" },
        { status: 500 }
      );
    }

    // Send email via Mailgun
    const formData = new URLSearchParams();
    formData.append("from", `${name} <${email}>`);
    formData.append("to", to);
    formData.append("subject", `New message from ${name}`);
    formData.append("text", message);

    const res = await fetch(`${apiUrl}/${domain}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`api:${apiKey}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Mailgun error:", text);
      return NextResponse.json({ error: "Failed to send" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
