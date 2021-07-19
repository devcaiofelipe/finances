import React, { useContext, useState } from 'react';
import Header from '../../components/Header/index.js';
import HistoricoList from '../../components/HistoricoList/index.js'
import { AuthContext } from '../../contexts/auth';
import { Background, Container, Nome, Saldo, Title, List } from './styles.js';


export default function Home() {
    const [historico, setHistorico ] = useState([
        { key: '1', tipo: 'Receita', valor: 1200 },
        { key: '2', tipo: 'Despesa', valor: 200 },
        { key: '3', tipo: 'Receita', valor: 40 },
        { key: '4', tipo: 'Receita', valor: 89.62 },
        { key: '5', tipo: 'Despesa', valor: 500.32 },
        { key: '6', tipo: 'Despesa', valor: 500.32 },
        { key: '7', tipo: 'Receita', valor: 10.32 },
        { key: '8', tipo: 'Despesa', valor: 230.12 },
        { key: '9', tipo: 'Despesa', valor: 100 },
        { key: '10', tipo: 'Despesa', valor: 340.20 },
    ]);
    const { user } = useContext(AuthContext);
    return(
        <Background>
            <Header/>
            <Container>
                <Nome>{ user && user.nome }</Nome>
                <Saldo>R$ 123,00</Saldo>
            </Container>
            <Title>Ultimas movimentações</Title>
            <List
            showsVerticalScrollIndicator={false}
            data={historico}
            keyExtractor={item => item.key}
            renderItem={({ item }) => <HistoricoList data={item}/> }/>
        </Background>
    
    )
};