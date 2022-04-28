import { Alert } from 'react-native'


const Alerta = (title, msg, onPressing)=>{
  Alert.alert(title, msg, [{
    text: "Ok",
    onPress: () => {
      onPressing()
    }
  },])
}


export {Alerta}