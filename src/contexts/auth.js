import React, { createContext, useState, useEffect } from 'react';
import firebase from '../services/firebaseConnection.js';
import AsyncStorage from '@react-native-community/async-storage';
export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        async function loadStorage() {
            const storageUser = await AsyncStorage.getItem('auth_user');
            if(storageUser) {
                setUser(JSON.parse(storageUser));
                setLoading(false);
            };
            setLoading(false);
        };
        loadStorage();
    }, [])

    // Logar usuario
    async function signIn(email, password) {
        await firebase.auth().signInWithEmailAndPassword(email, password)
        .then(async (value) => {
            let uid = value.user.uid;
            await firebase.database().ref('users').child(uid).once('value')
            .then((snapshot) => {
                let user = {
                    uid,
                    nome: snapshot.val().nome,
                    email: value.user.email
                };
                setUser(user);
                storageUser(user);
            })
        })
        .catch((error) => {
            alert(error.code);
        });
    };


    // Cadastrar usuario
    async function signUp(email, password, nome) {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(async (value) => {
            let uid = value.user.uid
            await firebase.database().ref('users').child(uid).set({
                saldo: 0,
                nome: nome
            }).then(() => {
                let data = {
                    uid: uid,
                  nome: nome,
                    email: value.user.email
                };
                setUser(data);
                storageUser(data);
            })
            .catch((error) => {
                alert(error.code);
            });
        })
    };

    async function signOut() {
        await firebase.auth().signOut()
        await AsyncStorage.clear()
        .then(() => {
            setUser(null);
        })
    };

    async function storageUser(data) {
        await AsyncStorage.setItem('auth_user', JSON.stringify(data));
    };

    return(
        <AuthContext.Provider value={{ signed: !!user, user, signUp, signIn, signOut, loading }}>
            { children }
        </AuthContext.Provider>
    )
};

export default AuthProvider;