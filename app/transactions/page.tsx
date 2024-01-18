import {cookies} from 'next/headers'
import TransactionsDisplay from '../components/TransactionsDisplay'
import TransactionForm from '../components/TransactionForm';
import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import { Transaction } from '@/types';



const transactions = async () => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({cookies: () => cookieStore});
  const {data: {session}} = await supabase.auth.getSession();
  const user = session?.user;

  const {data:transactions, error} = await supabase.
    from('transactions')
    .select('*').
    eq('user_id', user?.id).
    order('date', {ascending: false});

  if(error){
    console.error(error)
  }

  const filteredTransactions = transactions?.filter((transaction: unknown): transaction is Transaction => {
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
    );
  });

  return (
    <div className=''>

      <TransactionForm/> 

      {filteredTransactions && filteredTransactions?.length > 0 && <TransactionsDisplay transactions={filteredTransactions}/>}


    </div>
  )
}

export default transactions


