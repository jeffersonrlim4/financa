import React, { useState, useContext } from 'react';
import { Background, Container, Logo, AreaInput, Input, SubmitButton, SubmitText, Link, LinkText, Loading } from './styles';
import { Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/auth';

export default function SignIn() {

  const { signIn, loading } = useContext(AuthContext);

  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if(loading){
    return <Loading size="large" color="#00ff00" />
  }

 return (
    <Background>
      <Container behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled>
        <Logo source={require('../../assets/Logo.png')} />

        <AreaInput>
          <Input 
            placeholder="E-mail"
            autoCorrect={false}
            autoCapitalize="none"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </AreaInput>

        <AreaInput>
          <Input 
            placeholder="Senha"
            autoCorrect={false}
            autoCapitalize="none"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </AreaInput>

        <SubmitButton onPress={() => signIn(email, password)}>
          <SubmitText>
            Login
          </SubmitText>
        </SubmitButton>

        <Link onPress={() => navigation.navigate('Cadastro')}>
          <LinkText>Não possui conta? Clique Aqui!</LinkText>
        </Link>

      </Container>
    </Background>
  );
}