'use server'
import {createServerComponentClient} from '@supabase/auth-helpers-nextjs'
import {revalidatePath} from 'next/cache'
import {cookies} from 'next/headers'

export async function deleteTransaction(formData) {
    const transaction_id = formData.get('id');


    const cookieStore = cookies();
    const supabase = createServerComponentClient({cookies:() => cookieStore});
    const {data: {session}} = await supabase.auth.getSession();
    const user = session?.user;
    if(!user) {
        console.error('Not logged in');
    }

    const {data, error} = await supabase.from('transactions').delete().match({id: transaction_id, user_id: user.id});

    if(error) {
        console.error('Something went wrong while deleting a transaction:',error);
        return
    }

    revalidatePath('/transactions');
    return {message: 'Transaction deleted successfully'};
}