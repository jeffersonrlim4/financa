import React, { useState, useContext } from 'react';
import { Background, Container, AreaInput, Input, SubmitButton, SubmitText, Loading } from './styles';
import { Platform } from 'react-native';
import { AuthContext } from '../../contexts/auth';

export default function SignUp() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { signUp, loading } = useContext(AuthContext);

  function handleSubmit(){
    signUp(email, password, name);
  }

  if(loading){
    return <Loading size="large" color="#00ff00" />
  }

 return (
    <Background>
      <Container behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled>

        <AreaInput>
          <Input 
            placeholder="Nome"
            autoCorrect={false}
            autoCapitalize="none"
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </AreaInput>

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

        <SubmitButton onPress={handleSubmit}>
          <SubmitText>
            Cadastrar
          </SubmitText>
        </SubmitButton>

      </Container>
    </Background>
  );
}