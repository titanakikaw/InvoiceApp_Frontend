import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { connect } from 'react-redux'

const MainLayout = ({Auth}) => {
    const navigate = useNavigate();

    useEffect(() => {
        if(!Auth.user){
            navigate('/auth')
        }
    }, [Auth])

    return (
        <div className='bg-gray-200 h-screen'>
            <Navbar/>
            {<Outlet/>}
        </div>
    )
}

const mapStateToProps = ({Auth}) => ({
    Auth
})

export default connect(mapStateToProps, null)( MainLayout)