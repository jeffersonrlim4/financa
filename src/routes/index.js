import React, { useContext } from 'react';
import { ActivityIndicator } from 'react-native';
import { AuthContext } from '../contexts/auth';

import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

export default function Routes(){

    const { signed, loading } = useContext(AuthContext);

    if(loading){
        <ActivityIndicator size="large" color="#00ff00" />
    }

    return (
        signed ? <AppRoutes/> : <AuthRoutes/>
    )
}