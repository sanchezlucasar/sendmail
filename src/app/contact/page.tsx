'use client'
import { useForm } from "react-hook-form"

const Contact = () => {
    const { handleSubmit, register } = useForm();

    const onSubmit = handleSubmit(async (data: any) => {
        try {
            console.log('aca la data', data);

            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    from: data.nombre,
                    to: data.to,
                    cc: data.cc,
                    text: data.mensaje,
                    subject: data.asunto
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

    /*const fields = [
        { nombreInput: "nombre", tipoCampo: "text", required: true },
        { nombreInput: "email", tipoCampo: "text", required: true },
        { nombreInput: "cc", tipoCampo: "text", required: false },
        { nombreInput: "asunto", tipoCampo: "text", required: false },
        { nombreInput: "mensaje", tipoCampo: "text", required: true },
    ];*/

    return (
        <section className="py-1 h-[calc(90vh-1rem)] flex justify-center items-center bg-primary-content" >
            <form
                onSubmit={onSubmit}
                className="w-1/4 "
            >
                <h1 className="text-slate-600 font-bold text-4xl mb-4">Enviar email</h1>

                <label htmlFor="nombre" className="text-slate-500 mb-2 block text-sm">
                    Nombre</label>
                <input type="text"
                    {...register("nombre")}
                    required
                    className="p-3 rounded block mb-2 bg-slate-100 text-slate-300 w-full"
                    placeholder="Ejemplo: Pepe"
                />

                <label htmlFor="to" className="text-slate-500 mb-2 block text-sm">
                    Email's (separados por comas, sin espacios) </label>
                <input type="text"
                    {...register("to")}
                    required
                    className="p-3 rounded block mb-2 bg-slate-100 text-slate-300 w-full"
                    placeholder="Ejemplo: correo1@example.com,correo2@example.com"

                />
                <label htmlFor="cc" className="text-slate-500 mb-2 block text-sm">
                    CC (separados por comas, sin espacios)</label>
                <input type="text"
                    {...register("cc")}

                    className="p-3 rounded block mb-2 bg-slate-100 text-slate-300 w-full"
                    placeholder="Ejemplo: correo1@example.com,correo2@example.com"

                />
                <label htmlFor="asunto" className="text-slate-500 mb-2 block text-sm">
                    Asunto </label>
                <input type="text"
                    {...register("asunto")}
                    required
                    className="p-3 rounded block mb-2 bg-slate-100 text-slate-300 w-full"
                    placeholder="Ejemplo: Servicio Nuevo"
                />

                <label htmlFor="mensaje" className="text-slate-500 mb-2 block text-sm">
                    Mensaje</label>
                <input type="text"
                    required
                    {...register("mensaje")}
                    className=" p-3 rounded block mb-2  bg-slate-100 text-slate-300 w-full input-lg w-full "
                />

                <button className="w-full bg-blue-500 text-white p-3 rounded-lg mt-2"
                > Enviar </button>
            </form>

        </section >
    )
}

export default Contact
