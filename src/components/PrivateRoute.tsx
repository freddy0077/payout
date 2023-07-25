import React, { useEffect, useState } from 'react';
import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import { authActions, userActions } from '../_store';
import {useDispatch, useSelector} from 'react-redux';

interface PrivateRouteProps {
    isAuthenticated: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ isAuthenticated }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [authenticated, setAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    // @ts-ignore
    const {isVerified} = useSelector(x => x.auth)

    const redirectToOtpIfRequired = (response: any) => {
        // if (response.payload.enableMFA) {
        //    return  navigate('/otp');
        // }
    };

    useEffect(() => {
        // @ts-ignore
        dispatch(userActions.getUser())
            .then((response: any) => {
                if (response.type === 'users/getUser/rejected') {
                    dispatch(authActions.setLogout(true));
                    localStorage.clear();
                    setAuthenticated(false);
                    setIsLoading(false);
                    return;
                }

                setAuthenticated(true);
                setIsLoading(false);

                redirectToOtpIfRequired(response);
            });
    }, [dispatch, navigate]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!authenticated) {
        return <Navigate to="/login" />;
    }

    // if (authenticated && !isVerified){
    //     return <Navigate to={`/otp`} />
    // }

    // if (isVerified){
        return <Outlet />;
    // }
};


export default PrivateRoute;
