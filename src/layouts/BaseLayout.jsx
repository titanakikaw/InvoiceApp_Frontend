import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'

const BaseLayout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("accessToken")
        if(token){
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: JSON.parse(token)
            })
            navigate('/main')
        }
    }, [])

    return (
        <div>
            {<Outlet/>}
        </div>
    )
}

export default BaseLayout