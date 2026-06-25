import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailSenderService {
    private from!: string;
    private transporter!: nodemailer.Transporter;

    constructor(
        configService: ConfigService
    ) {
        this.from = configService.get('SMTP_FROM')!;
        this.transporter = nodemailer.createTransport({
            port: Number(configService.get('SMTP_PORT')!),
            host: configService.get('SMTP_HOST')!,
            auth: {
                user: configService.get('SMTP_USER')!,
                pass: configService.get("SMTP_PASS")!
            },
            tls: {
                rejectUnauthorized: false
            },
            secure: false
        });
    }

    async sendEmail(to: string, subject: string, html: string): Promise<void> {
        await this.transporter.sendMail({
            from: this.from,
            to, 
            subject, 
            html
        })
    } 

    async sendEmailVerification(token: string, to: string): Promise<void> {
        const subject = 'Email Verification';
        const html = `<p>Please verify your email.</p> <a href="http://localhost:4200/verify-email?token=${token}">Verify your email</a>`;
        await this.sendEmail(to, subject, html);
    }

    async sendEmailResetPassword(token: string, to: string): Promise<void> {
        const subject = 'Reset your password';
        const html = `<p>Email password reset.</p> <a href="http://localhost:4200/verify-email?token=${token}">Reset your password</a>`;
        await this.sendEmail(to, subject, html);
    }
}