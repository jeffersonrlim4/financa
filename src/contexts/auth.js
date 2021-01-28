import React, { useState, createContext, useEffect } from 'react';
import firebase from '../services/firebaseConnection';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});

export default function AuthProvider({ children }){

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        async function loadStorage(){
            const storageUser = await AsyncStorage.getItem('Auth_user');
            
            if(storageUser){
                setUser(JSON.parse(storageUser));
            }

            setLoading(false);
        }

        loadStorage();
    }, []);

    //Logando o usuário
    async function signIn(email, password){
        setLoading(true)
        await firebase.auth().signInWithEmailAndPassword(email, password)
        .then( async (value) => {
            let uid = value.user.uid;
            await firebase.database().ref('users').child(uid).once('value')
            .then((snapshot) => {
                let data = {
                    uid: uid,
                    name: snapshot.val().name,
                    email: value.user.email,
                }
                setLoading(false);
                storageUser(data);
                setUser(data);
            })
        })
        .catch((error) => {
            setLoading(false);
            alert(error.code);
        })
    }

    //Cadastrando novo usuário
    async function signUp(email, password, name){
        setLoading(true);
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then( async (value) => {
            let  uid = value.user.uid;
            await firebase.database().ref('users').child(uid).set({
                saldo: 0,
                name
            }).then(() => {
                const data = {
                    uid: uid,
                    name,
                    email: value.user.email
                };
                setUser(data);
                storageUser(data);
                setLoading(false);
            }).catch(error => {
                alert(error.code)
                setLoading(false);
            });
        })
        .catch((error) => {
            alert(error.code)
            setLoading(false);
        });
    }

    //Salvando os dados no AsyncStorage
    async function storageUser(data){
        await AsyncStorage.setItem('Auth_user', JSON.stringify(data));
    }

    //Logout do usuário
    async function singOut(){
        await firebase.auth().signOut();
        await AsyncStorage.clear().then(() => setUser(null));
    }

     return(
         <AuthContext.Provider value={{ signed: !!user, user, signUp, loading, signIn, singOut }}>
             { children }
         </AuthContext.Provider>
     )
}