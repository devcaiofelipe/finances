import React, { useContext, useState, useEffect } from 'react';
import Header from '../../components/Header/index.js';
import HistoricoList from '../../components/HistoricoList/index.js'
import firebase from '../../services/firebaseConnection.js';
import { Alert } from 'react-native';
import { format, isBefore } from 'date-fns';
import { AuthContext } from '../../contexts/auth';
import { Background, Container, Nome, Saldo, Title, List } from './styles.js';


export default function Home() {
    const [historico, setHistorico] = useState([]);
    const [saldo, setSaldo] = useState(0);

    const { user } = useContext(AuthContext);
    const uid = user && user.uid;

    useEffect(() => {
        async function loadList() {
            await firebase.database().ref('users').child(uid).on('value', (snapshot) => {
                setSaldo(snapshot.val().saldo);           
            });
            await firebase.database().ref('historico')
                                     .child(uid)
                                     .orderByChild('date').equalTo(format(new Date(), 'dd/MM/yyyy'))
                                     .limitToLast(10)
                                     .on('value', (snapshot) => {
                                         setHistorico([]);
                                         snapshot.forEach((childItem) => {
                                             let list = {
                                                 key: childItem.key,
                                                 tipo: childItem.val().tipo,
                                                 valor: childItem.val().valor,
                                                 date: childItem.val().date,
                                             };
                                             setHistorico(oldArray => [...oldArray, list].reverse())
                                         })
                                     })
                                }
        loadList();
    }, []);

    function handleDelete(data) {
        const [day, month, year] = data.date.split('/');
        const newDate = new Date(`${year}/${month}/${day}`);
        const dateToday = format(new Date(), 'dd/MM/yyyy');
        const [ dayToday, monthToday, yearToday ] = dateToday.split('/');
        const newDateToday = new Date(`${yearToday}/${monthToday}/${dayToday}`)
        console.log(newDateToday);
        if(isBefore(newDate, newDateToday)) {
            alert('Você não pode excluir um registro antigo');
            return;
        };
        Alert.alert('Atenção', `Você deseja excluir ${data.tipo} - Valor: ${data.valor}`,
        [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Confirmar', onPress: () => handleDeleteSuccess(data) },
        ])
    };

    async function handleDeleteSuccess(data) {
        await firebase.database().ref('historico')
        .child(uid).child(data.key).remove()
        .then(async() => {
            let saldoAtual = saldo;
            data.tipo === 'despesa' ? saldoAtual += parseFloat(data.valor) : saldoAtual -= parseFloat(data.valor)
            await firebase.database().ref('users').child(uid).child('saldo').set(saldoAtual);
        })
        .catch((error) => {
            console.log(error)
        })
    };

    return(
        <Background>
            <Header/>
            <Container>
                <Nome>{ user && user.nome }</Nome>
                <Saldo>R$ {saldo}</Saldo>
            </Container>
            <Title>Ultimas movimentações</Title>
            <List
            showsVerticalScrollIndicator={false}
            data={historico}
            keyExtractor={item => item.key}
            renderItem={({ item }) => <HistoricoList data={item} deleteItem={handleDelete}/> }/>
        </Background>
    
    )
};