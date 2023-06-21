import React, { useEffect, useRef, useState } from 'react'
import { PlusIcon, TrashIcon} from '@heroicons/react/24/outline'
import { connect, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

const Invoice = ({Auth, Invoices}) => {
    const { invoiceId } = useParams();
    const customerNameRef = useRef();
    const dateRef = useRef();
    const invoiceNumberRef = useRef();
    const navigate = useNavigate ();
    const dispatch = useDispatch()

    const [rows,setRows] = useState([
        {
            productName: '',
            quantity: '',
            pricePerItem: ''
        }
    ], [])
    const [currentInvoice, setCurrenctInvoice] = useState();


    const handleChange = (e, index, field) => {
        const { value } = e.target;
        const updatedRows = [...rows];
        updatedRows[index][field] = value;
        setRows(updatedRows)
    }

    const deleteRow = (index) => {
        const updatedRows = [...rows];
        updatedRows.splice(index, 1);
        setRows(updatedRows)
    }

    const addRow = () => {
        setRows([...rows, { 
            productName: '',
            quantity: '',
            pricePerItem: ''
        }])
    }

    const handleSubmit = (type) => {
        const customerName = customerNameRef.current.value;
        const date = dateRef.current.value;
        const invoiceNumber = invoiceNumberRef.current.value;
        const InvoiceObj = {
            userId: Auth.user.id,
            customerName,
            invoiceDate: date,
            invoiceRef: invoiceNumber,
            products: [...rows]
        }
        if(type == "new"){
            dispatch({
                type: "ADD_INVOICE_REQUEST",
                payload: InvoiceObj
            })
        }else{
            dispatch({
                type: "UPDATE_INVOICE_REQUEST",
                payload: {...InvoiceObj, invoiceId}
            })
        }
        navigate(-1)
    }

    useEffect(() => {
        if(invoiceId){
            const current = Invoices?.find((x) => x.id === parseInt(invoiceId))
            customerNameRef.current.value = current?.customerName;
            dateRef.current.value = current?.invoiceDate;
            invoiceNumberRef.current.value  = current?.invoiceRef;
            setRows([...current.products])
        }
    }, [])



    
    return (
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className='w-full mt-10 bg-white px-5 py-2 text-sm rounded'>
                {/* <p className='text-lg font-bold'>Invoice Form</p>
                <hr/> */}
                <div>
                    <div className='grid grid-cols-3 gap-4 mt-5'>
                        <div className='pt-2'>
                            <p className='font-bold uppercase mb-4'>Invoice Details</p>
                            <hr/>
                            <div className='mt-4'>
                                <label htmlFor="" className='text-xs'>Invoice Number/ Reference No. :</label>
                                <input type='text' className='text-xs mt-1 outline-none border w-full px-5 py-3 rounded' ref={invoiceNumberRef}/>
                            </div>
                            <div className='mt-4'>
                                <label htmlFor="" className='text-xs'>Date :</label>
                                <input type='date' className='mt-1 outline-none border w-full px-5 py-3 rounded' ref={dateRef}/>
                            </div>
                            <div className='mt-4'>
                                <label htmlFor="" className='text-xs'>Customer Name :</label>
                                <input type='text' className='mt-1 outline-none border w-full px-5 py-3 rounded' ref={customerNameRef} 
                                defaultValue={customerNameRef.current && customerNameRef.current} />
                            </div>
                        </div>
                        <div className='col-span-2 px-2'>
                            <div className='flex justify-between items-center mb-3'>
                                <p className='font-bold uppercase'>Invoice products</p>
                                <button className='text-xs bg-blue-400 hover:bg-blue-600 py-2 px-3 text-white flex items-center' onClick={() => addRow()}>
                                    <PlusIcon className='w-4 mr-2'/>
                                    Add row
                                </button>
                            </div>
                            <hr/>
                            <div className='py-1 '>
                                <table className='w-full text-left'>
                                    <thead className='border-b'>
                                        <tr>
                                            <th className='text-xs p-2 font-normal px-3'>Product Name</th>
                                            <th className='text-xs p-2 font-normal px-3'>Quantity</th>
                                            <th className='text-xs p-2 font-normal px-3'>Price per item</th>
                                            <th className='text-xs p-2 font-normal px-3'>Total</th>
                                            <th className='text-xs p-2 font-normal px-3'></th>
                                        </tr>
                                    </thead>
                                </table>
                                <div className='max-h-80 min-h-80 overflow-y-scroll'>
                                    <table className='w-full text-left'>
                                        <tbody className=''>
                                            {
                                                rows.map((x, index) => {
                                                    return(
                                                        <tr className='' key={index}>
                                                            <td className='px-3 py-2'>
                                                                <input 
                                                                    type='text' 
                                                                    className='w-full outline-none py-2 px-3 text-xs rounded border' placeholder='Enter product name'
                                                                    value={x.productName}
                                                                    onChange={(e) => handleChange(e, index, "productName")}
                                                                />
                                                            </td>
                                                            <td className='px-3'>
                                                                <input 
                                                                    type='number' 
                                                                    className='w-full outline-none py-2 px-3 text-xs rounded border' 
                                                                    placeholder='Enter quantity'
                                                                    value={x.quantity}
                                                                    onChange={(e) => handleChange(e, index, "quantity")}
                                                                />
                                                            </td>
                                                            <td className='px-3'>
                                                                <input 
                                                                type='number' 
                                                                className='w-full outline-none py-2 px-3 text-xs rounded border' 
                                                                placeholder='Enter price'
                                                                value={x.pricePerItem}
                                                                onChange={(e) => handleChange(e, index, "pricePerItem")}
                                                                />
                                                            </td>
                                                            <td className='py-2 px-1'>
                                                                <p className='text-xs'>
                                                                    {
                                                                        (x.quantity * x.pricePerItem).toLocaleString('en-ph',{
                                                                            currency: 'PHP',
                                                                            style: 'currency'
                                                                        })
                                                                    }
                                                                </p>
                                                            </td>
                                                            <td className='py-2 px-1'>
                                                            <TrashIcon className='w-4 text-red-500 cursor-pointer hover:text-red-700' onClick={() => deleteRow(index) }/>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                            
                                        </tbody>
                                    </table>
                                </div>
                                <hr/>
                                <div className='text-right '>
                                    <p className='text-xs uppercase mt-2'>
                                        Total amount:
                                        <span className='font-bold ml-2'>
                                            {
                                                (rows.reduce((p,c) => {
                                                    let total = (c.quantity * c.pricePerItem);
                                                    p = total + p;
                                                    return p
                                                },0)).toLocaleString('en-ph',{
                                                    currency: 'PHP',
                                                    style: 'currency'
                                                })
                                            }
                                        </span>
                                    </p>
                                </div>
                             
                            </div>
                        </div>
                    </div>
                    <div className='text-right  mt-5'>
                        <button 
                            className='py-2 px-3 text-xs bg-green-400 rounded text-white hover:bg-green-600' 
                            onClick={() => handleSubmit(invoiceId ? "update" : "new" )}
                        >
                            Save
                        </button>
                        <button 
                            className='py-2 px-3 text-xs bg-red-400 rounded text-white hover:bg-red-600 ml-2'
                            onClick={() => navigate(-1)}
                        >
                            Cancel
                        </button>
                    </div>
                  
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = ({ Auth, Invoices }) => ({
    Auth,
    Invoices
})

export default connect(mapStateToProps, null)(Invoice)