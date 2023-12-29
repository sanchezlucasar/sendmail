'use client'
import { useForm } from "react-hook-form"
import { useRouter } from 'next/navigation'


function Contact() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter();

    const onSubmit = handleSubmit(async (data: any) => {

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: data.name,
                    toemail: data.toemail,
                    message: data.message,
                }),
            });

            if (res.ok) {
                alert("Mensaje enviado correctamente");
            } else {
                const resJSON = await res.json();
                throw new Error(resJSON.message);
            }
        } catch (error) {
            console.error('Error al enviar el mensaje:', error);
            alert("Error al enviar el mensaje");
        }

    });
    return (
        <div className="h-[calc(100vh - 7rem)] flex justify-center item - center" >
            <form
                onSubmit={onSubmit}
                className="w-1/4"
            >
                <h1 className="text-slate-200 font-bold text-4xl mb-4">Send Email</h1>

                <label htmlFor="name" className="text-slate-500 mb-2 block text-sm">
                    name</label>
                <input type="text"
                    {...register("name",
                        {
                            required: {
                                value: true,
                                message: "Username is required"
                            }
                        })}
                    className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
                />
                {
                    errors.username && errors.username.message && (
                        <span className="text-red-500 text-sm">{(errors.username.message).toString()}</span>
                    )
                }
                <label htmlFor="toemail" className="text-slate-500 mb-2 block text-sm">
                    Email</label>
                <input type="email"
                    {...register("toemail",
                        {
                            required: {
                                value: true,
                                message: "Email is required"
                            }
                        })}
                    className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
                />
                {
                    errors.toemail && errors.toemail.message && (
                        <span className="text-red-500 text-sm">{(errors.toemail.message).toString()}</span>
                    )
                }
                <label htmlFor="message" className="text-slate-500 mb-2 block text-sm">
                    Message</label>
                <input type="text"
                    {...register("message",
                        {
                            required: {
                                value: true,
                                message: "message is required"
                            }
                        })}
                    className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
                />
                {
                    errors.password && errors.password.message && (
                        <span className="text-red-500 text-sm">{(errors.password.message).toString()}</span>
                    )
                }

                <button className="w-full bg-blue-500 text-white p-3 rounded-lg mt-2"
                > Send </button>
            </form>
        </div>

    )
}

export default Contact
