'use client';

import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import {useRouter} from 'next/navigation'

const AuthForm = () => {

    const [isNewUser, setIsNewUser] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [isSigningUp, setIsSigningUp] = useState<boolean>(false)
    const router = useRouter()

    const handleSignUp = async (e:React.FormEvent) => {
        e.preventDefault()
        try {
            const {data, error} = await supabase.auth.signUp({email, password})
            if(!error) setIsSigningUp(true);
            console.log(data, error)
        } catch (error) {   
            console.log(error)
        }
    }

    const handleLogin = async (e:React.FormEvent) => {
        e.preventDefault()
        const {data, error} = await supabase.auth.signInWithPassword({email, password})
        console.log(data, error)
        if(!error) router.push('/transactions')
        if(error) alert(error.message)
    }

    return (
        <form onSubmit={isNewUser ? handleSignUp : handleLogin} className="flex flex-col gap-2 text-black ">
                <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@doe.com"
                className="bg-white p-1 text-black"
                />

                <input
                type="password"
                value={password}
                placeholder="Password"
                className="bg-white p-1 text-black"
                onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit" className="hover:bg-white p-1 hover:border-black border hover:text-black font-bold bg-black text-white border-gray-500">
                    {isNewUser ? "Sign Up" : "Login"}
                </button>
                <p>
                    {isNewUser ? 
                    (<>
                    Already have an account? {" "} <button type="button"  className="underline" onClick={() => setIsNewUser(false)}>Log in</button>
                    </>) : (<>
                    Dont yet have an account? {" "} <button type="button" className="underline" onClick={() => setIsNewUser(true)}>Sign up</button>
                    </>)}
                </p>

                {isSigningUp && (<p>Email sent! Check your email for further instructions.</p>)}

        </form>
    )
}

export default AuthForm
