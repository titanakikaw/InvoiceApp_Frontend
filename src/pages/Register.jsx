import React from 'react'
import CustomForm from '../components/CustomForm'
import { useDispatch } from 'react-redux'

const initValues = {
    fullname: '',
    email: '',
    password: ''
}

const initFields = [
    {
        id:'fullname',
        type: 'text',
        name:'fullname',
        placeholder: 'Please enter your fullname',
        labeltext: "FullName"
    },
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


const Register = () => {
    const dispatch = useDispatch()
    const onSubmit = (values) => {
        dispatch({
            type: "REGISTER_REQUEST",
            payload: values
        })
    }

    return (
        <div className='w-1/4'>
            <CustomForm onSubmit={onSubmit} initValues={initValues} initFields={initFields} textURL={"Already have an account? Sign in here"} URL={"/auth"} btnText={"Create Account"}/>
        </div>
    )
}

export default Register