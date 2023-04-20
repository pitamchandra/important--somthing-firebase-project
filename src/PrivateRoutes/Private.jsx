import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const Private = ({children}) => {
    const {user, loading} = useContext(AuthContext)
    const location = useLocation()

    // if load is not finis
    if(loading){
        return <p>loading......</p>;
    }
    // if user logged in
    if(user){
        return children;
    }
    //redirect page where user want to go
    return <Navigate to='/login' state={{from : location}} replace={true}></Navigate>
};

export default Private;