import React, { useContext } from 'react';
import { View, Text, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { AuthContext } from '../../contexts/auth';


export default function CustomDrawer(props) {

    const { user, singOut } = useContext(AuthContext);

 return (
   <DrawerContentScrollView {...props}>
       <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 25}}>
           <Image 
            source={require('../../assets/Logo.png')}
            style={{width: 85, height: 85}}
            resizeMode="contain"
           />
           <Text style={{color: '#fff', fontSize: 17, marginTop: 5}}>Bem vindo</Text>
           <Text style={{color: '#fff', fontSize: 18, fontWeight: 'bold', paddingBottom: 25}}>{user.name}</Text>
       </View>

        <DrawerItemList {...props} />

        <DrawerItem {...props} 
        label="Sair do App" 
        onPress={() => singOut()} 
        inactiveBackgroundColor="#c62c36"/>

   </DrawerContentScrollView>
  );
}