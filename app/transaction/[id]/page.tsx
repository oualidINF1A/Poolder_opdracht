import { deleteTransaction } from '@/app/server-actions/deleteTransaction';
import React from 'react'
import {cookies} from 'next/headers'
import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import { Transaction } from '@/types';
import EditTransaction from '@/app/components/EditTransaction';


const TransactionPage = async ({ params, searchParams }: { params: { id: number }; searchParams: { page: string } })=> {
    const cookieStore = cookies();
    const supabase = createServerComponentClient({cookies: () => cookieStore});
    const {data: {session}} = await supabase.auth.getSession();
    const user = session?.user;
    const transaction_id = params.id;

    const {data:transactions, error} = await supabase.
    from('transactions')
    .select('*')
    .limit(1)
    .match({id: transaction_id, user_id: user?.id});

    if(error){
        console.error('Something went wrong while fetching transaction', error)
    }

    const validateTransaction = (transaction: unknown): transaction is Transaction => {
        // Validate if transaction is of type Transaction

            return (
            typeof transaction === 'object' &&
            transaction !== null && 
            'id' in transaction && 
            'user_id' in transaction &&
            'title' in transaction &&
            'description' in transaction &&
            'date' in transaction &&
            'updated_at' in transaction &&
            'total_amount' in transaction
            )

    };

    if (!transactions || !transactions[0] || !validateTransaction(transactions[0])) {
        return <div>Transaction not found</div>;
    }

    const transaction = transactions[0];
    return (
        <div className="mx-[5%] ">
        <div className="bg-colorPrimaryBg rounded shadow p-4 flex-col">
            <div className='flex justify-between'>
                <div className='flex flex-col'>
                    <h2 className="text-xl font-bold">{transaction.title}</h2>
                    <p className="mb-2 text-gray-500 text-sm"> January 18, 2024</p>
                </div>
                <div className='flex gap-2'>
                    <p className=''>Total amount: </p>
                    <p>{new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(transaction.total_amount)}</p>
                </div>
            </div>

            <div className='flex-col gap-2 text-wrap'>
                <p className="mb-1 font-bold ">Description: </p>
                <p className='mb-4'>{transaction.description}</p>
            </div>

            <div className='flex gap-2'>
            <form action={deleteTransaction}>
                <input type="hidden" name="id" value={transaction.id}/>
                <div className='flex gap-2'>
                    <button type='submit' className='bg-red-500 text-white p-1 font-semibold rounded'>
                        Delete
                    </button>
                </div>
            </form>
            <EditTransaction transaction={transaction}/>
            </div>


        </div>
        </div>
    );
};

export default TransactionPage;
  