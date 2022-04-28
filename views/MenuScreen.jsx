import { StyleSheet, Text, View, TouchableHighlight} from 'react-native'
import React from 'react'

const MenuScreen = ({navigation}) => {
  return (
    <View style= {styles.container}>
      <TouchableHighlight  style={styles.navegacion} onPress={()=>{navigation.navigate('Productos')}} >
      <Text style={styles.texto} >Mis Productos</Text>
      </TouchableHighlight>
      <TouchableHighlight style={styles.navegacion} onPress={()=>{navigation.navigate('Agregar')}} >
      <Text style={styles.texto} >Agregar Nuevo Producto</Text>
      </TouchableHighlight>
      <TouchableHighlight style={styles.navegacion} onPress={()=>{navigation.navigate('Compras')}} >
      <Text style={styles.texto} >Realizar Compra</Text>
      </TouchableHighlight>
      <TouchableHighlight style={styles.navegacion} onPress={()=>{navigation.navigate('Ganancias')}} >
      <Text style={styles.texto} >Ganacias del Dia</Text>
      </TouchableHighlight>
    </View>
  )
}

export default MenuScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#00ffff'
},
navegacion: {
    padding: 15,
    borderWidth: 1,
    margin: 3,
    backgroundColor: '#ffffff',
    minWidth: '80%',
    marginVertical: 10,
    borderRadius: 15,
    borderBottomWidth:5
},
texto: {
    fontWeight: 'bold',
    textAlign: 'center'
}

})