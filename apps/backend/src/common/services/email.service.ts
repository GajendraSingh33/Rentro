import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter: nodemailer.Transporter;

  constructor() {
    this.initializeTransporter();
  }

  private initializeTransporter(): void {
    // For development, use Ethereal (fake SMTP service)
    if (process.env.NODE_ENV === 'development' && !process.env.EMAIL_HOST) {
      this.logger.warn('Using Ethereal email service for development. Set EMAIL_HOST for production!');
      // In production, configure with real email service
      this.transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: 'your_ethereal_email@ethereal.email',
          pass: 'your_ethereal_password',
        },
      });
    } else {
      // Production configuration
      this.transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT || '587'),
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
    }
  }

  async sendEmail(options: EmailOptions): Promise<void> {
    try {
      const info = await this.transporter.sendMail({
        from: process.env.EMAIL_FROM || 'noreply@rentro.com',
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text,
      });

      this.logger.log(`Email sent to ${options.to}. Message ID: ${info.messageId}`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${options.to}: ${error.message}`);
      throw error;
    }
  }

  async sendPasswordResetEmail(to: string, resetToken: string): Promise<void> {
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;

    const html = `
      <h2>Password Reset Request</h2>
      <p>Hello,</p>
      <p>We received a request to reset your password. Click the link below to proceed:</p>
      <a href="${resetUrl}" style="background-color: #0ea5e9; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none; display: inline-block; margin: 20px 0;">
        Reset Password
      </a>
      <p>Or copy this link: <a href="${resetUrl}">${resetUrl}</a></p>
      <p>This link will expire in 1 hour.</p>
      <p>If you didn't request this, please ignore this email.</p>
      <hr />
      <p style="color: #999; font-size: 12px;">Rentro - PG Accommodation Platform</p>
    `;

    await this.sendEmail({
      to,
      subject: 'Reset Your Rentro Password',
      html,
      text: `Click here to reset your password: ${resetUrl}`,
    });
  }

  async sendWelcomeEmail(to: string, firstName: string): Promise<void> {
    const html = `
      <h2>Welcome to Rentro!</h2>
      <p>Hi ${firstName},</p>
      <p>Thank you for joining Rentro - your destination for finding the perfect PG accommodation.</p>
      <p>Your account is now active and ready to use. Start exploring amazing listings or list your property today!</p>
      <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/dashboard" style="background-color: #0ea5e9; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none; display: inline-block; margin: 20px 0;">
        Go to Dashboard
      </a>
      <p>Questions? Visit our <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/help">Help Center</a></p>
      <hr />
      <p style="color: #999; font-size: 12px;">Rentro - PG Accommodation Platform</p>
    `;

    await this.sendEmail({
      to,
      subject: 'Welcome to Rentro!',
      html,
      text: 'Welcome to Rentro!',
    });
  }

  async sendEmailVerificationEmail(to: string, verificationToken: string): Promise<void> {
    const verifyUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/verify-email?token=${verificationToken}`;

    const html = `
      <h2>Verify Your Email Address</h2>
      <p>Hello,</p>
      <p>Please verify your email address by clicking the link below:</p>
      <a href="${verifyUrl}" style="background-color: #0ea5e9; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none; display: inline-block; margin: 20px 0;">
        Verify Email
      </a>
      <p>Or copy this link: <a href="${verifyUrl}">${verifyUrl}</a></p>
      <p>This link will expire in 24 hours.</p>
      <hr />
      <p style="color: #999; font-size: 12px;">Rentro - PG Accommodation Platform</p>
    `;

    await this.sendEmail({
      to,
      subject: 'Verify Your Rentro Email',
      html,
      text: `Click here to verify your email: ${verifyUrl}`,
    });
  }
}
