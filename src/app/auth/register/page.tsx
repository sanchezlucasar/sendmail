'use client'
import { useForm } from "react-hook-form"
import { useRouter } from 'next/navigation'


function RegisterPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const router = useRouter();

    const onSubmit = handleSubmit(async (data: any) => {

        if (data.password !== data.confirmPassword) alert("El password tiene que ser igual al password de confirmación")
        else {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: data.username,
                    email: data.email,
                    password: data.password
                })
            })

            const resJSON = await res.json();
            if (res.ok) {
                router.push('/auth/login')
            }
        }
    })
    return (
        <div className="h-[calc(100vh - 7rem)] flex justify-center item - center" >
            <form
                onSubmit={onSubmit}
                className="w-1/4"
            >
                <h1 className="text-slate-200 font-bold text-4xl mb-4">Register</h1>

                <label htmlFor="username" className="text-slate-500 mb-2 block text-sm">
                    Username</label>
                <input type="text"
                    {...register("username",
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
                <label htmlFor="email" className="text-slate-500 mb-2 block text-sm">
                    Email</label>
                <input type="email"
                    {...register("email",
                        {
                            required: {
                                value: true,
                                message: "Email is required"
                            }
                        })}
                    className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
                />
                {
                    errors.email && errors.email.message && (
                        <span className="text-red-500 text-sm">{(errors.email.message).toString()}</span>
                    )
                }
                <label htmlFor="pasword" className="text-slate-500 mb-2 block text-sm">
                    Password</label>
                <input type="password"
                    {...register("password",
                        {
                            required: {
                                value: true,
                                message: "Password is required"
                            }
                        })}
                    className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
                />
                {
                    errors.password && errors.password.message && (
                        <span className="text-red-500 text-sm">{(errors.password.message).toString()}</span>
                    )
                }

                <label htmlFor="confirmPassword" className="text-slate-500 mb-2 block text-sm">
                    Confirm Password</label>
                <input type="confirmPassword" {...register("confirmPassword",
                    {
                        required: {
                            value: true,
                            message: "Confirm Password is required"
                        }
                    })}
                    className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
                />
                {
                    errors.confirmPassword && errors.confirmPassword.message && (
                        <span className="text-red-500 text-sm">{(errors.confirmPassword.message).toString()}</span>
                    )
                }

                <button className="w-full bg-blue-500 text-white p-3 rounded-lg mt-2"
                > Register </button>
            </form>
        </div>

    )
}

export default RegisterPage
