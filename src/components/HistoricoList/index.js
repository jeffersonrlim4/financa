import React from 'react';
import { Container, Tipo, IconView, TipoText, ValorText } from './styles';
import { TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function HistoricoList({ data, deleteItem }) {
 return (
   <TouchableWithoutFeedback onLongPress={() => deleteItem(data)}>
    <Container>
        <Tipo>
          <IconView color={data.tipo === 'receita' ? '#049301' : '#c62c36'}>
            <Icon name={data.tipo === 'receita' ? "arrow-up" : "arrow-down"} color="#FFF" size={20} />
            <TipoText>{data.tipo} {data.date}</TipoText>
          </IconView>
        </Tipo>
        <ValorText>
          R$ {data.valor}
        </ValorText>
    </Container>
   </TouchableWithoutFeedback>
  );
}