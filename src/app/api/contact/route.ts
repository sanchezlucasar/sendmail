
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface IEmail {
    name: string;
    toemail: string;
    message: string;
}

export async function POST(request: Request) {
    try {
        const data: IEmail = await request.json()
        // Configurar el transporte para enviar correos electrónicos
        console.log('data aca', data)
        if (!data.toemail || !/^\S+@\S+\.\S+$/.test(data.toemail)) {
            throw new Error('Invalid or empty email');
        }
        const username = process.env.EMAIL_USERNAME;
        const password = process.env.EMAIL_PASSWORD;
        const puerto = process.env.SMTP_PORT;

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP,
            port: Number(puerto),//Number(process.env.SMTP_PORT),
            secure: true,
            auth: {
                user: `${username}`,
                pass: `${password}`,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        // Enviar el correo electrónico

        await transporter.sendMail({
            from: process.env.EMAIL_USERNAME, // Usar el correo configurado en auth como el remitente
            to: data.toemail,
            subject: `Mensaje de contacto de ${data.name}`,
            text: data.message,
        });

        console.log('Correo electrónico enviado:');

        // Devolver una respuesta indicando que el correo fue enviado con éxito
        return NextResponse.json({ message: 'Correo electrónico enviado con éxito' });
    } catch (error) {
        console.error('Error al enviar el correo electrónico:', error);
        // En caso de error, devolver una respuesta con el mensaje de error
        return NextResponse.json({ message: 'Error al enviar el correo electrónico' });
    }
}
