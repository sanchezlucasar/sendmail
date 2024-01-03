
import { validate } from '@/Utils/SchemaValidator/emailSchema';
import { validateData } from '@/Utils/validator';
import ajv from 'ajv';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface IEmail {
    from: string;
    to: string;
    cc: string;
    subject: string;
    text: string;

}

const sendEmails = async (from: string, subject: string, to: string, cc: string, text: string, transporter: any) => {
    // Enviar correos a destinatarios principales

    try {
        await transporter.sendMail({ from, subject, text, to, cc });
        console.log(`Sent to ${to} , ${cc}`);
    } catch (err) {
        console.log(`Sending to ${to}, ${cc} failed: ${err}`);
        // Puedes manejar el error de envío a destinatario principal aquí
    }
    transporter.close();
};

export async function POST(request: Request) {
    try {
        const data: IEmail = await request.json();
        const valid = validateData(data);
        console.log(valid);

        if (!valid) {
            throw new Error(`Datos inválidos`,);
        }

        const username = process.env.EMAIL_USERNAME;
        const password = process.env.EMAIL_PASSWORD;
        const puerto = process.env.SMTP_PORT;
        const apiKey = process.env.SENDGRID_API_KEY;

        if (!apiKey || !username || !password) {
            console.error('No se han proporcionado las credenciales adecuadas para enviar el correo electrónico.');
            return NextResponse.json({ message: 'Credenciales faltantes para enviar el correo electrónico' });
        }

        /* if (apiKey !== data.a) { }
        
        */

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP,
            port: Number(puerto),
            secure: true,
            auth: {
                user: `${username}`,
                pass: `${password}`,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        // Enviar los correos electrónicos
        await sendEmails(data.from, data.subject, data.to, data.cc, data.text, transporter);

        console.log('Correo electrónico enviado:');
        return NextResponse.json({ message: 'Correo electrónico enviado con éxito' });
    } catch (error) {
        console.error('Error al enviar el correo electrónico:', error);
        return NextResponse.json({ message: 'Error al enviar el correo electrónico' });
    }
}
