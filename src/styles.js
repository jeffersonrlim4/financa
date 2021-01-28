import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.cor};
  padding-top: ${0 + getStatusBarHeight()}px;
`;

export const Title = styled.Text`
  font-size: 18px;
  color: white;
  text-align: center;
  padding: 0 20px;
`;

export const ButtonLabel = styled.Text`
    color: white;
    font-size: 14px;
`;

export const Button = styled.TouchableOpacity`
    background-color: #3498db;
    padding: 10px;
    border-radius: 10px;
    margin: 20px 0;
    width: 80%;
    align-items: center;
    justify-content: center;
`;
