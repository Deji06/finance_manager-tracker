import { supabase } from "../lib/supabase";
import { type signInFormData, type signUpFormData } from "../types/auth";
import { sync_user_data } from "../lib/api";


export const signUp = async( data: signUpFormData) => {
    const {data: authData, error} = await supabase.auth.signUp({
        email:data.email,
        password:data.password,
        options: {
            data: {
                username: data.username
            }
        }
    })
    if (error) throw error
    return authData
}

export const signIn = async( data: signInFormData) => {
    const {data:authData, error} = await supabase.auth.signInWithPassword({
        email:data.email,
        password:data.password
    })

    if(error) throw error

    // localStorage.setItem("token", authData.session?.access_token)
    // console.log('data:', token);
    return authData

}

export const sync_user = async() => {
    await sync_user_data()
}

export const logOut = async() => {
   const {error} = await supabase.auth.signOut()

   if(error) throw error
}

