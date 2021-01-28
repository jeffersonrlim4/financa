import React, { useContext, useState, useEffect } from 'react';
import { Alert, TouchableOpacity, Platform } from 'react-native';
import { AuthContext } from '../../contexts/auth';
import { Background, Container, Nome, Saldo, Title, List, Area } from './styles';
import Header from '../../components/Header';
import HistoricoList from '../../components/HistoricoList';
import firebase from '../../services/firebaseConnection';
import DatePicker from '../../components/DatePicker';
import { format, isBefore } from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Home() {
  const { user } = useContext(AuthContext);
  const uid = user.uid;
  const [historico, setHistorico] = useState([]);
  const [saldo, setSaldo] = useState(0);
  const [newDate, setNewDate] = useState(new Date());
  const [show, setShow] = useState(false);

  useEffect(() => {
    async function loadList(){
      
      await firebase.database().ref('users').child(uid).on('value', (snapshot) => {
        setSaldo(snapshot.val().saldo);
      });

      await firebase.database().ref('historico')
      .child(uid)
      .orderByChild('date').equalTo(format(newDate, 'dd/MM/yyyy'))
      .limitToLast(10).on('value', (snapshot) => {
        setHistorico([]);

        snapshot.forEach((childItem) => {
          let list = {
            key: childItem.key,
            tipo: childItem.val().tipo,
            valor: childItem.val().valor,
            date: childItem.val().date,
          };

          setHistorico(oldArray => [...oldArray, list].reverse());

        })
      })
    } 

    loadList();

  }, [newDate]);

  async function handleDeleteSuccess(data){
    await firebase.database().ref('historico')
    .child(uid)
    .child(data.key)
    .remove()
    .then( async () => {
      let saldoAtual = saldo;
      data.tipo === 'despesa' ? saldoAtual += parseFloat(data.valor) : saldoAtual -= parseFloat(data.valor);

      await firebase.database().ref('users')
      .child(uid)
      .child('saldo')
      .set(saldoAtual);
    })
    .catch(error => alert(error.code));
  }

  function handleDelete(data){

    //Pega a data do Item
    const [diaItem, mesItem, anoItem] = data.date.split('/');
    const dateItem = new Date(`${anoItem}/${mesItem}/${diaItem}`);

    //Pegando data de hoje
    const formatDiaHoje = format(new Date(), 'dd/MM/yyyy');
    const [diaHoje, mesHoje, anoHoje] = formatDiaHoje.split('/');
    const dateHoje = new Date(`${anoHoje}/${mesHoje}/${diaHoje}`);



    if( isBefore(dateItem, dateHoje)){
      //Se a data do registro é anterior a data de hoje
      alert('Você não pode excluir um registro antigo');
      return;
    }

    Alert.alert(
      'Excluir registro',
      `Tem certeza que deseja excluir o regitro no valor de ${data.valor}`,
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Apagar Registro',
          onPress: () => handleDeleteSuccess(data)
        }
      ]
    )
  }

  function handleShowPicker(){
    setShow(true);
  }

  function handleClose(){
    setShow(false);
  }

  const onChange = (date) => {
    setShow(Platform.OS === 'ios');
    setNewDate(date);
  }

  return (
     <Background>
       <Header />
       <Container>
         <Nome>{user.name}</Nome>
         <Saldo>R$ {saldo.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</Saldo>
       </Container>

        <Area>
          <TouchableOpacity onPress={handleShowPicker}>
            <Icon name="event" color="#fff" size={30}/>
          </TouchableOpacity>
          <Title>Últimas Movimentações</Title>
        </Area>
       <List 
          showsVerticalScrollIndicator={false}
          data={historico}
          keyExtractor={item => item.key}
          renderItem={({item}) => (<HistoricoList data={item} deleteItem={handleDelete}/>)}
       />

       {show &&
        <DatePicker 
          onClose={handleClose}
          date={newDate}
          onChange={onChange}
        />
       }
     </Background>
    );
}