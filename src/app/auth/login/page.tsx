'use client'
import { useForm } from "react-hook-form";
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation'
import { useState } from "react";

function LoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter()
    const [error, setError] = useState(null)

    const onSubmit = handleSubmit(async (data) => {
        const res: undefined | any = await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false
        })

        if (res.error) { setError(res.error) }
        else {
            router.push('/dashboard')
            router.refresh()
        }
    })

    return (
        <div className="h-[calc(100vh - 7rem)] flex justify-center item - center" >

            <form
                onSubmit={onSubmit}
                className="w-1/4"
            >
                {(error) && (
                    <p className="bg-red-500 text-lg text-white p-3 rounded mb-2">{error}</p>
                )}
                <h1 className="text-slate-200 font-bold text-4xl mb-4">Login</h1>

                <label htmlFor="email" className="text-slate-500 mb-2 block text-sm">
                    Email</label>
                <input type="text"
                    {...register("email",
                        {
                            required: {
                                value: true,
                                message: "email is required"
                            }
                        })}
                    className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
                    placeholder="user@email.com"
                />
                {
                    errors.email && errors.email.message && (
                        <span className="text-red-500 text-sm">{(errors.email.message).toString()}</span>
                    )
                }
                <label htmlFor="password" className="text-slate-500 mb-2 block text-sm">
                    Password</label>
                <input type="password"
                    {...register("password",
                        {
                            required: {
                                value: true,
                                message: "password is required"
                            }
                        })}
                    className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
                    placeholder="**********"
                />
                {
                    errors.password && errors.password.message && (
                        <span className="text-red-500 text-sm">{(errors.password.message).toString()}</span>
                    )
                }
                <button className="w-full bg-blue-500 text-white p-3 rounded-lg mt-2"
                > Login </button>
            </form>
        </div>
    )
}

export default LoginPage
