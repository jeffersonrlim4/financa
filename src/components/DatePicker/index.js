import React, { useState } from 'react';
import { Platform, TouchableOpacity, Text } from 'react-native';
import { Container, Header } from './styles';
import DateTimerPicker from '@react-native-community/datetimepicker';

export default function DatePicker({onClose, onChange, date}) {

    const [dateNow, setDateNow] = useState(new Date(date));

 return (
   <Container>
       {Platform.OS === 'ios' &&
        <Header>
            <TouchableOpacity onPress={onClose}>
                <Text>Fechar</Text>
            </TouchableOpacity>
        </Header>

       }
       <DateTimerPicker 
        value={dateNow}
        mode="date"
        display="default"
        onChange={(event, date) => {
            const currentDate = date || dateNow;
            setDateNow(currentDate);
            onChange(currentDate);
        }}
        style={{ backgroundColor: '#fff'}}
       />
   </Container>
  );
}