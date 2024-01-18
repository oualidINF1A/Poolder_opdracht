'use server'
import {createServerComponentClient} from '@supabase/auth-helpers-nextjs'
import {revalidatePath} from 'next/cache'
import {cookies} from 'next/headers'

export async function editTransaction(formData) {
    const id = formData.get('id');  
    const title = formData.get('title');
    const description = formData.get('description');
    const total_amount = formData.get('total_amount');

    const cookieStore = cookies();
    const supabase = createServerComponentClient({cookies:() => cookieStore});
    const {data: {session}} = await supabase.auth.getSession();
    const user = session?.user;
    console.log('got here');

    if(!user) {
        console.error('Not logged in');
    }

    const {data, error} = await supabase.from('transactions').
        update({title, description, total_amount}).
        match({id, user_id: user.id});

    if(error) {
        console.error('Something went wrong while updating a transaction:',error);
        return
    }

    revalidatePath('/transactions');
    return {message: 'Transaction updated successfully'};
}