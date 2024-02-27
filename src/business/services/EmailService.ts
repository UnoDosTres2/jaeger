enum TemplateName {
  WELCOME_FACTORY = "welcome_factory",
  WELCOME_SERVICEPROVIDER = "welcome_serviceprovider",
  PASSWORD_RESET = "password_reset",
}

export interface EmailService {
  sendEmail(
    recipientEmail: string,
    senderEmail: string,
    subject: string,
    // ...
    templateName: TemplateName,
  ): Promise<number>;
}
