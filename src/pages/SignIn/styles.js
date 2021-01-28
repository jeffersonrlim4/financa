import styled from 'styled-components/native';

export const Background = styled.View`
    flex: 1;
    background-color: #131313;
`;

export const Container = styled.KeyboardAvoidingView`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const Logo = styled.Image`
    margin-bottom: 20px;
`;

export const AreaInput = styled.View`
    flex-direction: row;
    margin-bottom: 20px;
`;

export const Input = styled.TextInput.attrs({
    placeholderTextColor: 'rgba(255, 255, 255, .2)'
})`
    background: rgba(0, 0, 0, .2);
    width: 90%;
    font-size: 17px;
    color: #fff;
    padding: 10px;
    border-radius: 8px;
`;

export const SubmitButton = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    background-color: #00b94a;
    width: 90%;
    height: 45px;
    border-radius: 20px;
    margin-top: 10px;
`;

export const SubmitText = styled.Text`
    font-size: 18px;
    color: #131313;
`;

export const Link = styled.TouchableOpacity`
    position: absolute;
    bottom: 40px;
`;

export const LinkText = styled.Text`
    color: #fff;
`;

export const Loading = styled.ActivityIndicator`
    flex: 1;
    justify-content: center;
    align-items: center;
`;