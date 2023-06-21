import React from 'react'
import { Link } from 'react-router-dom'
import { Formik, Field, Form } from 'formik'
const CustomForm = ({ initValues, initFields, textURL, URL, btnText, onSubmit}) => {
  return (
    <div className='p-5'>
        <div className='text-center mb-10 text-2xl font-bold'>
            <p>Invoice Management System</p>
        </div>
        <Formik 
            initialValues={initValues}
            onSubmit={onSubmit}
        >
            <Form>
                {
                    initFields?.map((x) => {
                        return(
                            <div className='flex flex-col mt-3' key={x.labeltext}>
                                <label className='text-xs'>{x.labeltext}</label>
                                <Field {...x} className='mt-2 text-xs px-3 py-2 outline-none rounded-md border' />
                            </div>
                        )
                    })
                }
                <div>
                    <div className=''>
                        <button type="submit" className='bg-blue-500 py-2 text-xs w-full mt-5 rounded text-white hover:bg-blue-700'>{btnText}</button>
                    </div>
                    <Link to={URL} className='text-xs text-blue-500 hover:font-bold'>{textURL}</Link>
                </div>
            </Form>
       </Formik>
       
    </div>
  )
}

export default CustomForm