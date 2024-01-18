'use client';
import { Transaction } from '@/types'
import React from 'react'
import EditTransaction from './EditTransaction'
import {format} from 'date-fns'
import {deleteTransaction} from '../server-actions/deleteTransaction'
import {useRouter} from 'next/navigation'

interface TransactionProps {
    transaction: Transaction
}



const Transaction = ({transaction}:TransactionProps) => {
  const router = useRouter();

  function truncateText(text:string, maxLength:number) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  }

  return (
    <div key={transaction.id} 
    className='hover:cursor-pointer hover:shadow hover:border-gray-300 border flex flex-col gap-2 p-2 sm:min-w-[250px] sm:max-w-[250px] max-h-[300px] md:min-w-[330px] xl:max-w-[430px] md:max-w-[330px] xl:min-w-[430px]'>

        <div className='flex justify-between'>
            <h3 className='font-bold'>{transaction.title}</h3>
            <p className='text-sm text-gray-500'>{format(transaction.date, 'dd/MM/yyyy')}</p>
            
        </div>
        
        <div>
          <p className='font-semibold'>Total amount: </p>
          <p>{new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(transaction.total_amount)}</p>
        </div>

        <div>
          <p className='font-semibold'>Transaction description: </p>
          <p>{truncateText(transaction.description, 20)}</p>
        </div>

        <div className='flex justify-between'>
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
            <button onClick={() => router.push(`/transaction/${transaction.id}`)} className='bg-blue-500 text-white p-1 font-semibold rounded'>
                View
            </button>
        </div>




        
    </div>  
  )
}

export default Transaction
