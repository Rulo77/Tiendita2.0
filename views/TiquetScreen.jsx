import { StyleSheet, Text, View, FlatList, Button } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Alerta } from '../components/AlertComponent';
import { createNewGanancia, getGananciaByfecha } from '../api';
import moment from 'moment';

const TiquetScreen = ({route, navigation}) => {
  const {listaProductos, suma, pago} = route.params;
  const [lista, setlista] = useState([])

  useEffect(() => {
    (async () => {
        const date= new Date()
        const fecha= moment(date).format('DD-MM-YYYY');
       const gananciaObtenida= await getGananciaByfecha(fecha)
       if(gananciaObtenida !== null){
           const {productosVendididos} = gananciaObtenida
           setlista([...productosVendididos])
       }
        })()
  }, [])
  

  const createGanancia= async ()=>{
    const date= new Date()
    const fecha= moment(date).format('DD-MM-YYYY');
  
    console.log(lista)
   
    let ganancia
    if(lista!==[]){
     
    //   ganancia= {"ganancia_del_dia":gananciaObtenida.ganancia_del_dia+suma,fecha,"productosVendididos":listaProductos}
  
      console.log(lista)
      for(let i=0; i< listaProductos.length; i++){
      const index = gananciaObtenida.productosVendididos.findIndex((producto) => producto._id === listaProductos[i]._id)
      console.log(index)
     
      if (index === -1) {
       setlista([...lista, listaProductos[i]])
      //console.log(listaProductos[i])
      }
      else {
     // const cantidad = gananciaObtenida.productosVendididos[index].cantidad ++;
       // lista[index].cantidad++
      }
    }
    ganancia= {"ganancia_del_dia":gananciaObtenida.ganancia_del_dia+suma,fecha,"productosVendididos":lista}
     }
    else{
        
        ganancia= {"ganancia_del_dia":suma,fecha,"productosVendididos":listaProductos}
    }
    console.log(ganancia)
    await createNewGanancia(ganancia)
  }

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
          onPress={()=>Alerta("Compra exitosa","Gracias por su compra, vuelva pronto", () => {
            createGanancia();
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