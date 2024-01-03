'use client'
import { useForm } from "react-hook-form";

interface Field {
    nombreInput: string;
    tipoCampo: string;
    required: boolean;
}

interface ContactFormProps {
    onSubmit: (data: any) => void; // Función onSubmit
    fields: Field[]; // Arreglo de objetos que describen los campos
}

const ContactForm = ({ onSubmit, fields }: ContactFormProps) => {
    const { register, handleSubmit } = useForm();


    return (
        <form onSubmit={onSubmit} className="w-1/4">
            <h1 className="text-slate-600 font-bold text-4xl mb-4">Enviar email</h1>
            {fields.map((field, index) => (
                <div key={index}>
                    <label htmlFor={field.nombreInput} className="text-slate-500 mb-2 block text-sm">
                        {field.nombreInput}
                    </label>
                    <input
                        type={field.tipoCampo}
                        required={field.required}
                        {...register(field.nombreInput)}
                        className="p-3 rounded block mb-2 bg-slate-100 text-slate-300 w-full"
                        placeholder={
                            (field.nombreInput === "email" || field.nombreInput === "cc")
                                ? "Ejemplo: correo1@example.com,correo2@example.com"
                                : `Ejemplo: ${field.nombreInput}`
                        }
                    />
                </div>
            ))}
            <button className="w-full bg-blue-500 text-white p-3 rounded-lg mt-2">Enviar</button>
        </form>
    );
};

export default ContactForm;
