import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/auth';
import { Container, Name, NewLink, NewText, Logout, LogoutText } from './styles';
import Header from '../../components/Header';


export default function Profile() {
  const navigation = useNavigation();
  const { singOut, user } = useContext(AuthContext);

 return (
   <Container>
     <Header />
     <Name>
       {user.name}
     </Name>

     <NewLink onPress={() => navigation.navigate('Registrar')}>
       <NewText>
        Cadastrar movimentação
       </NewText>
     </NewLink>

     <Logout onPress={() => singOut()}>
      <LogoutText>
        Sair
      </LogoutText>
     </Logout>
   </Container>
  );
}