'use client';

import { Transaction } from '@/types'
import {useState}from 'react'
import {editTransaction} from '../server-actions/editTransaction'

interface EditTransactionProps {
    transaction: Transaction
}

const EditTransaction = ({transaction}:EditTransactionProps) => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [formData, setFormData] = useState({title: transaction.title, description: transaction.description, total_amount: transaction.total_amount});
  const handleChange = (e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => setFormData({...formData, [e.target.name]: e.target.value})


  return (
          <div>
            <button type='button' onClick={() => setShowModal(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold  p-1 px-2 rounded">
                Edit
            </button>
            {showModal && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center px-4">
                    <div className="modal-content bg-colorPrimaryBg p-6 rounded-lg w-full max-w-md">
                    <span className="close text-black text-2xl leading-none hover:text-gray-500 cursor-pointer float-right" onClick={() => setShowModal(false)}>&times;</span>
                    <form action={editTransaction} onSubmit={() => setShowModal(false)} className="mt-4">
                        <input 
                            type="hidden" 
                            name="id"   
                            value={transaction.id} 
                        />
                        <div className="mb-4">
                            <label htmlFor="title" className="block mb-2 font-semibold">Title</label>
                            <input 
                                type="text" 
                                id="title"
                                name="title" 
                                value={formData.title} 
                                onChange={handleChange}
                                className="w-full p-2 rounded bg-white text-black border border-gray-700 focus:border-blue-500" 
                            />
                        </div>

                        <div>
                          <label htmlFor="description" className='block text-black font-semibold mb-2'>Description:</label>
                          <textarea 
                          rows={4} cols={40} 
                          name="description" 
                          id="description" 
                          value={formData.description}
                          onChange={handleChange}
                          required 
                          className="shadow appearance-none border border-gray-600 bg-white rounded w-full py-2 px-3 text-black font-semibold"/>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="total_amount" className="block font-semibold mb-2">Total Amount:</label>
                            <input 
                                type="number" 
                                id="total_amount"
                                name="total_amount" 
                                value={formData.total_amount} 
                                onChange={handleChange} 
                                className="w-full p-2 rounded bg-white text-black border border-gray-700 focus:border-blue-500" 
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Update Transaction
                        </button>
                    </form>
                    </div>
                </div>
            )}
        </div>
    )   
}

export default EditTransaction
