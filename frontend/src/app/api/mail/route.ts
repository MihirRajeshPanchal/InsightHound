import { MailRequestBody } from "@/lib/types/mail"
import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

const ENV_MAIL = process.env.MAIL_USER || ""
const ENV_PASSWORD = process.env.MAIL_PASSWORD || ""

export async function POST(req: NextRequest) {
	try {
		const {
			subject,
			body,
			senderMail,
			senderPassword,
			recipientMail,
			attachments,
		}: MailRequestBody = await req.json()

		const email = senderMail || ENV_MAIL
		const password = senderPassword || ENV_PASSWORD
		if (!email || !password) {
			// return NextResponse.json({ error: 'Sender mail and app password are required.' }, { status: 400 });
			console.error("Sender mail and app password are required.")
		}

		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: email,
				pass: password,
			},
		})

		const formattedAttachments = attachments.map(
			(attachment: { filename: string; content: string }) => ({
				filename: attachment.filename,
				content: attachment.content,
				encoding: "base64",
			}),
		)

		const mailOptions = {
			from: senderMail || email,
			to: recipientMail,
			subject,
			text: body,
			attachments: formattedAttachments,
		}

		await transporter.sendMail(mailOptions)

		return NextResponse.json({ message: "Email sent successfully!" })
	} catch (error) {
		console.error("Error sending email:", error)
		return NextResponse.json(
			{ error: "Failed to send email." },
			{ status: 500 },
		)
	}
}
