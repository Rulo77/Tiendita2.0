import { StyleSheet, Text, View, FlatList, Button } from 'react-native'
import React from 'react'
import { Alerta } from '../components/AlertComponent';
import { createNewGanancia, getGananciaByfecha } from '../api';
import moment from 'moment';

const TiquetScreen = ({route, navigation}) => {
  const {listaProductos, suma, pago} = route.params;

  return (
    <View style={
      styles.pantalla
  }>
      <FlatList data={listaProductos}
          keyExtractor={
              (item) => item._id
          }
          renderItem={
              ({item}) => {
                  return <View style={
                      styles.lista
                  }>
                      <Text>{
                          item.cantidad
                      }</Text>
                      <Text>{
                          item.nombre
                      }</Text>
                      <Text>$ {
                          item.precio
                      }</Text>
                  </View>
          }
          }/>
      <View style={
          styles.cambio
      }>
          <Text style={
              styles.texto
          }>Total:        $ {suma}</Text>
          <Text style={
              styles.texto
          }>Pago:      $ {pago} </Text>
          <Text style={
              styles.texto
          }>Cambio:    $ {
              pago - suma
          } </Text>
      </View>
      <Button title='aceptar'
          onPress={()=>Alerta("Compra exitosa","Gracias por su compra, vuelva pronto", async () => {
              const date= new Date()
              const fecha= moment(date).format('DD-MM-YYYY');
             const gananciaObtenida= await getGananciaByfecha(fecha)
              console.log(moment(date).format('DD-MM-YYYY'))
              let ganancia
              if(gananciaObtenida.ganancia_del_dia!==null){
                ganancia= {"ganancia_del_dia":gananciaObtenida.ganancia_del_dia+suma,fecha,"productosVendididos":listaProductos}
              }
              else{
                ganancia= {"ganancia_del_dia":suma,fecha,"productosVendididos":listaProductos}
              }
              await createNewGanancia(ganancia)
            navigation.navigate('Menu')
        })} with='50%'/>

  </View>
  )
}

export default TiquetScreen

const styles = StyleSheet.create({
  pantalla: {
    backgroundColor: '#00ffff',
    flex:1
},
lista: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 12,
    borderBottomWidth: 1
},
cambio: {
    alignItems: 'flex-end',
    padding: 10,
    marginEnd: 15
},
texto: {
    fontWeight: "bold",
    fontSize: 18
}

})