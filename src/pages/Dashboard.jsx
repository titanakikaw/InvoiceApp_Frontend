import React, { useEffect } from 'react'
import { PencilSquareIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { connect, useDispatch } from 'react-redux'
const Dashboard = ({ Invoices }) => {
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch({
            type: "LOAD_INVOICE_REQUEST"
        })
    }, [])


    return (
        <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 '>
            <div className='border rounded-t-lg mt-5 bg-white p-5 text-sm h-full'>
                <div className='flex justify-between items-center'>
                    <div>
                        <p className='text-xl'>Invoices</p>
                        <p className='text-gray-500'>Please review the results below</p>
                    </div>
                    <div className='flex items-center'>
                        <Link to={"invoice"} className='uppercase py-3 px-5 mx-5 rounded text-white text-xs bg-blue-400 font-bold hover:bg-blue-700'>Add new invoice</Link>
                        <div>
                            <input 
                                type='text' 
                                placeholder='Search invoice' 
                                className='border px-5 py-3 text-xs bg-gray-100 outline-none rounded-md'
                            />
                        </div>
                    </div>
                </div>
                <div className='my-10'>
                    <table className="min-w-full divide-y divide-gray-200 text-xs">
                        <thead className="bg-gray-50">
                            <tr>
                               
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice Number</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice Date</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Products</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Invoice Amount</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {
                                Invoices?.map((x) => {
                                    return(
                                        <tr key={x.id}>
                                          
                                            <td className="px-6 py-4 whitespace-nowrap">{x.invoiceRef}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{x.invoiceDate}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{x.customerName}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{x.products.length}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {
                                                    (x.products.reduce((p,c) => {
                                                        let total = (c.pricePerItem * c.quantity);
                                                        p = total + p
                                                        return p
                                                    }, 0)).toLocaleString('en-ph', {
                                                        style: 'currency',
                                                        currency: 'PHP'
                                                    })
                                                }
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap flex justify-between">
                                                {/* <button className=" py-1 px-2 rounded">
                                                    <EyeIcon className='w-6 text-green-600 hover:text-green-800'/>
                                                </button> */}
                                                <Link to={`invoice/${x.id}`} className=" py-1 px-2 rounded">
                                                    <PencilSquareIcon className='w-6 text-blue-600 hover:text-blue-800'/>
                                                </Link>
                                                <button onClick={() => dispatch({
                                                    type: "DELETE_INVOICE_REQUEST",
                                                    payload: x.id
                                                })}>
                                                    <TrashIcon className='w-6 text-red-600 hover:text-red-800'/>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                          
                            
                        
                        </tbody>
                    </table>
                    <hr/>
                    <p className='mt-5 text-xs font-bold'>Total number of invoices: {Invoices.length}</p>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ Invoices }) => ({
    Invoices
})

export default connect (mapStateToProps, null)(Dashboard)