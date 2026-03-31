import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

export interface NotificationPayload {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

@Injectable()
export class NotificationService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST') || 'smtp.gmail.com',
      port: parseInt(this.configService.get<string>('SMTP_PORT') || '587'),
      secure: false,
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASS'),
      },
    });
  }

  async sendEmail(payload: NotificationPayload): Promise<boolean> {
    try {
      await this.transporter.sendMail({
        from: this.configService.get<string>('SMTP_FROM') || 'noreply@rentro.com',
        to: payload.to,
        subject: payload.subject,
        html: payload.html,
        text: payload.text,
      });
      return true;
    } catch (error) {
      console.error('Email send error:', error);
      return false;
    }
  }

  async sendNewInquiryNotification(ownerEmail: string, data: {
    seekerName: string;
    listingTitle: string;
    message: string;
  }): Promise<boolean> {
    return this.sendEmail({
      to: ownerEmail,
      subject: `New Inquiry: ${data.listingTitle}`,
      html: `
        <h2>New Inquiry Received</h2>
        <p><strong>From:</strong> ${data.seekerName}</p>
        <p><strong>Listing:</strong> ${data.listingTitle}</p>
        <p><strong>Message:</strong></p>
        <blockquote>${data.message}</blockquote>
        <p><a href="${this.configService.get('APP_URL')}/owner/inquiries">View Inquiry</a></p>
      `,
    });
  }

  async sendInquiryResponseNotification(seekerEmail: string, data: {
    ownerName: string;
    listingTitle: string;
    response: string;
  }): Promise<boolean> {
    return this.sendEmail({
      to: seekerEmail,
      subject: `Response to your inquiry: ${data.listingTitle}`,
      html: `
        <h2>You have a response!</h2>
        <p>The owner of <strong>${data.listingTitle}</strong> has responded to your inquiry:</p>
        <blockquote>${data.response}</blockquote>
        <p><a href="${this.configService.get('APP_URL')}/inquiries">View Full Conversation</a></p>
      `,
    });
  }

  async sendListingApprovedNotification(ownerEmail: string, data: {
    listingTitle: string;
    listingId: number;
  }): Promise<boolean> {
    return this.sendEmail({
      to: ownerEmail,
      subject: `Your listing has been approved: ${data.listingTitle}`,
      html: `
        <h2>Listing Approved! 🎉</h2>
        <p>Great news! Your listing <strong>${data.listingTitle}</strong> has been approved and is now live.</p>
        <p><a href="${this.configService.get('APP_URL')}/listings/${data.listingId}">View Your Listing</a></p>
      `,
    });
  }

  async sendListingRejectedNotification(ownerEmail: string, data: {
    listingTitle: string;
    reason: string;
  }): Promise<boolean> {
    return this.sendEmail({
      to: ownerEmail,
      subject: `Listing requires changes: ${data.listingTitle}`,
      html: `
        <h2>Listing Not Approved</h2>
        <p>Your listing <strong>${data.listingTitle}</strong> requires some changes before it can go live.</p>
        <p><strong>Reason:</strong></p>
        <blockquote>${data.reason}</blockquote>
        <p><a href="${this.configService.get('APP_URL')}/owner/listings">Edit Your Listing</a></p>
      `,
    });
  }
}
