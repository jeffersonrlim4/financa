import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import CustomDrawer from '../components/CustomDrawer';
import Home from '../pages/Home';
import New from '../pages/New';
import Perfil from '../pages/Profile';

const AppDrawer = createDrawerNavigator();

export default function AppRoutes(){
    return(
        <AppDrawer.Navigator
            drawerContent={(props) => <CustomDrawer {...props} />}
            drawerStyle={{
                backgroundColor: '#171717'
            }}
            drawerContentOptions={{
                labelStyle: {
                    fontWeight: 'bold'
                },
                activeTintColor: '#fff',
                activeBackgroundColor: '#00b94a',
                inactiveBackgroundColor: '#000',
                inactiveTintColor: '#ddd',
                itemStyle: {
                    marginVertical: 5
                }
            }}
        >
            <AppDrawer.Screen name="Home" component={Home} />
            <AppDrawer.Screen name="Perfil" component={Perfil} />
            <AppDrawer.Screen name="Registrar" component={New} />
        </AppDrawer.Navigator>
    )
}