import React from 'react'

import CustomForm from '../components/CustomForm'
import { useDispatch } from 'react-redux'


const initValues = {
    email: '',
    password: ''
}

const initFields = [
    {
        id:'email',
        type:'email',
        name:'email',
        placeholder:'Please enter your email',
        labeltext: 'Email'
    },{
        id:'password',
        type:'password',
        name:'password',
        placeholder:'Please enter your password',
        labeltext: 'Password'
    }
]


const Login = () => {
    const dispatch = useDispatch()
    const onSubmit = (values) => {
        if(values.email && values.password){
            dispatch({
                type: "LOGIN_REQUEST",
                payload: values
            })
        }
    }

    return (
        <div className='w-1/4'>
            <CustomForm onSubmit={onSubmit} initValues={initValues} initFields={initFields} textURL={"Dont have a account? Register here"} URL={"register"} btnText={"Sign in"}/>
        </div>
    )
}

export default Login