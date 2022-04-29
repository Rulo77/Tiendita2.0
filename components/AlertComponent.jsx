import { Alert } from 'react-native'


const Alerta = (title, msg, onPressing)=>{
  Alert.alert(title, msg, [{
    text: "Ok",
    onPress: () => {
      onPressing()
    }
  },])
}

const AlertaConCancel = (title, msg, onPressing) => {
  Alert.alert(title, msg, [
      {
          text: "Ok",
          onPress: () => {
            onPressing()
          }
      }, {
          text: "Cancelar",
          onPress: () => {
              return
          },
          style: "cancel"
      }
  ])
};


export {Alerta, AlertaConCancel}