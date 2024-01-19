'use client';
import React, { useRef } from 'react'
import { addTransaction } from '../server-actions/addTransaction'

const TransactionForm = () => {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form action={async (formData) =>{
      await addTransaction(formData)
      formRef.current?.reset()
    }
    } 
      ref={formRef}
    id='transaction_form' className='mb-6 px-[5%] py-8 flex flex-col gap-2 bg-colorPrimaryBg border-2'>
        <h2 className='font-bold text-xl'>Add a transaction:</h2>
        <div>
          <label htmlFor="title" className='block text-black font-semibold mb-2'>Title:</label>
          <input type="text" name="title" id="title" required className="shadow appearance-none border border-gray-600 bg-white rounded w-full py-2 px-3 text-black font-semibold"/>
        </div>
        <div>
          <label htmlFor="description" className='block text-black font-semibold mb-2'>Description:</label>
          <textarea maxLength={200} rows={2} cols={40} name="description" id="description" required className="shadow appearance-none border border-gray-600 bg-white rounded w-full py-2 px-3 text-black font-semibold"/>
        </div>
        <div>
          <label htmlFor="total_amount" className='block text-black font-semibold mb-2'>Total Amount:</label>
          <input type="number" name="total_amount" id="total_amount" required className="shadow appearance-none border border-gray-600 bg-white rounded w-full py-2 px-3 text-black font-semibold"/>
        </div>
        <button type="submit" className="hover:opacity-90 p-2 w-1/5 min-w-fit border rounded font-bold bg-white text-black border-gray-500">
          Add Transaction
        </button>
    </form>
  )
}

export default TransactionForm
    