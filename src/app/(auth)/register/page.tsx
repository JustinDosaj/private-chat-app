"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Logo } from '@/components/ui/Logo'
import { TextField } from '@/components/ui/Fields'
import { SlimLayout } from '@/components/auth/SlimLayout'
import { FormEvent, useState } from "react"
import { useAuth } from '@/hooks/useAuth'


export default function Register() {

    const { loginWithGoogle } = useAuth();
    const [email, setEmail] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        try {

            console.log("Sign-in link sent to:", email);
        } catch (error) {
            console.error("Error sending sign-in link:", error);
        } finally {
            setEmail('')
            setIsLoading(false);
        }
    }

    return (
        <SlimLayout>
        <div className="flex">
            <Link href="/" aria-label="Home">
            <Logo className="h-10 w-auto" />
            </Link>
        </div>
        <h2 className="mt-20 text-lg font-semibold text-gray-900">
            Get started for free
        </h2>
        <p className="mt-2 text-sm text-gray-700">
            Already registered?{' '}
            <Link
            href="/login"
            className="font-medium text-blue-600 hover:underline hover:cursor-pointer"
            >
            Sign in
            </Link>{' '}
            to your account.
        </p>
        <form onSubmit={handleSubmit} className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
            <TextField
                className="col-span-full"
                label="Email address"
                name="email"
                type="email"
                value={email}
                onChange={(e) => {setEmail(e.target.value)}}
                autoComplete="email"
                required
            />
            <div className="col-span-full">
            <Button type="submit" variant="solid" color="blue" className="w-full">
                { isLoading ? 
                    <span>Loading...</span>
                :
                    <span>Sign up <span aria-hidden="true">&rarr;</span></span>
                }
            </Button>
            </div>
        </form>

        <div>
            <div className="relative mt-6">
                <div aria-hidden="true" className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm/6 font-medium">
                    <span className="bg-white px-6 text-gray-900">Or continue with</span>
                </div>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-4">
                <button
                onClick={loginWithGoogle}
                className="hover:cursor-pointer flex w-full items-center justify-center gap-3 rounded-full bg-black px-3 py-2 text-sm font-semibold text-white ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-800 focus-visible:ring-transparent"
                >
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                        <path
                        d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                        fill="#EA4335"
                        />
                        <path
                        d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                        fill="#4285F4"
                        />
                        <path
                        d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                        fill="#FBBC05"
                        />
                        <path
                        d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                        fill="#34A853"
                        />
                    </svg>
                    <span className="text-sm/6 font-semibold">Google</span>
                </button>
            </div>
        </div>
        </SlimLayout>
    )
}
