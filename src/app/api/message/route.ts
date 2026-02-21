import { contactSchema } from "@/schema/contact";
import { Resend } from "resend";
import { successResponse, errorResponse, apiHandler } from "@/lib/api-error";
import { rateLimiters } from "@/lib/rate-limit";
import { createRequestLogger } from "@/lib/request-logger";
import { env } from "@/lib/env";
import ContactEmail from "@/components/Contact/Emails";

const requestLog = createRequestLogger("POST /api/message");

export const POST = apiHandler(async (request: Request) => {
  // Rate limiting
  if (rateLimiters.standard.isLimited(request)) {
    const logger = requestLog(request);
    logger.finish(429);
    throw new Error("Too many requests");
  }

  const logger = requestLog(request);

  // Validate API key
  if (!env.RESEND_API_KEY) {
    logger.finish(500, "RESEND_API_KEY not configured");
    throw new Error("Email service is not configured");
  }

  const resend = new Resend(env.RESEND_API_KEY);

  try {
    const rawData = await request.json();

    // Validate input
    const validation = contactSchema.safeParse(rawData);

    if (!validation.success) {
      logger.finish(400, "Validation failed");
      return errorResponse(validation.error, 400);
    }

    const { gender, firstName, lastName, email, phoneNumber, message } = validation.data;

    // Send email
    const { error } = await resend.emails.send({
      from: "Clinic Website <noreply@clinic.local>",
      to: [env.CONTACT_EMAIL_RECIPIENT],
      subject: `New Message From ${firstName} ${lastName}`,
      replyTo: email,
      react: ContactEmail({
        gender,
        name: `${firstName} ${lastName}`,
        email,
        phoneNumber,
        subject: `New message from ${firstName} ${lastName}`,
        message,
      }),
    });

    if (error) {
      logger.finish(400, `Resend error: ${error.message}`);
      return errorResponse("Failed to send email", 400);
    }

    logger.finish(200);
    return successResponse({ message: "Message sent successfully" }, 200);
  } catch (e) {
    const errorMsg = e instanceof Error ? e.message : "Unknown error";
    logger.finish(500, errorMsg);
    return errorResponse(e instanceof Error ? e : "Internal Server Error", 500);
  }
});