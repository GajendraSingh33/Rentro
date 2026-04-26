export interface EmailOptions {
    to: string;
    subject: string;
    html: string;
    text?: string;
}
export declare class EmailService {
    private readonly logger;
    private transporter;
    constructor();
    private initializeTransporter;
    sendEmail(options: EmailOptions): Promise<void>;
    sendPasswordResetEmail(to: string, resetToken: string): Promise<void>;
    sendWelcomeEmail(to: string, firstName: string): Promise<void>;
    sendEmailVerificationEmail(to: string, verificationToken: string): Promise<void>;
}
