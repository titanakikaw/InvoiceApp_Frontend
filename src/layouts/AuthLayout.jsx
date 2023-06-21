import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'

const AuthLayout = ({Auth}) => {
    const navigate = useNavigate()
    
    useEffect(() => {
        if(Auth.user){
            navigate('/main')
        }
    }, [Auth])

    return (
        <div className='flex h-screen items-center justify-center'>
            { <Outlet/> }
        </div>
    )
}

const mapStateToProps = ({Auth}) => ({
    Auth   
})

export default connect(mapStateToProps, null)( AuthLayout)