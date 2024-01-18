import { Transaction as TransactionType } from '@/types'
import Transaction from './Transaction'


interface TransactionsDisplayProps {
    transactions: TransactionType[]
}

const TransactionsDisplay = ({transactions}:TransactionsDisplayProps) => {


    return ( 
    <div className='flex flex-col gap-2 px-[5%]'>
        <div className='flex justify-between'>
            <h2 className='font-bold text-xl'>Transactions:</h2>
            <div className='flex gap-2'>
                <h3 className='text-md'>Total amount spent:</h3>
                <p className='text-md font-bold underline'>{new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(transactions.reduce((total, transaction) => total + transaction.total_amount, 0))}</p>
            </div>
        </div>
        <div className='border-x-4 p-4 flex flex-wrap gap-4 ' >
            {
                transactions.map((transaction) => (
                    <Transaction key={transaction.id} transaction={transaction}/>
                ))
            }
        </div>
    </div>

    )
}

export default TransactionsDisplay
