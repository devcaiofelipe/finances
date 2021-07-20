import React, { useState, useContext } from 'react';
import { Platform, ActivityIndicator } from 'react-native';
import { AuthContext } from '../../contexts/auth.js';
import { Background, Container, Logo, AreaInput, Input, SubmitButton,
         SubmitText, Link, LinkText } from '../SignIn/styles';


export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nome, setNome] = useState('');
    const { signUp, loadingAuth } = useContext(AuthContext);

    function handleSignUp() {
        signUp(email, password, nome);
    };
    
    return(
        <Background>
            <Container
            behaviour={Platform.OS === 'ios' ? 'padding': ''}
            enabled>
                <AreaInput>
                    <Input 
                    placeholder="Nome"
                    autoCorrect={ false }
                    autoCapitalize="none"
                    value={ nome }
                    onChangeText={(text) => setNome(text)}/>
                </AreaInput>
                <AreaInput>
                    <Input 
                    placeholder="Email"
                    autoCorrect={ false }
                    autoCapitalize="none"
                    value={ email }
                    onChangeText={(text) => setEmail(text)}
                    secureTextEntry={true}/>
                </AreaInput>
                <AreaInput>
                    <Input 
                    placeholder="Senha"
                    autoCorrect={ false }
                    autoCapitalize="none"
                    value={ password }
                    onChangeText={(text) => setPassword(text)}/>
                </AreaInput>
                <SubmitButton onPress={handleSignUp}>
                    { loadingAuth ? (
                        <ActivityIndicator size={20} color="#FFF"/>
                    ) : (
                        <SubmitText>Cadastrar</SubmitText>
                    )}
                </SubmitButton>
            </Container>
        </Background>
    )
};