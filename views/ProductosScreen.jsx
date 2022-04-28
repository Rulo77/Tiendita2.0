import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, {useEffect, useState, useCallback} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {getProductos, deleteProducto} from '../api';
import RenderListaComponent from '../components/RenderListaComponent'


const ProductosScreen = ({navigation}) => {

  const [productos, setproductos] = useState([]);

    const [loader, setloader] = useState(true);

    const isfocus = useIsFocused();


  useEffect(() => {
    (async () => {
      const data = await getProductos()
      setproductos(data)
      setloader(false)
      })()
  
  }, []);

  const actualizarProducto = (producto_id) => {
    navigation.navigate("Editar", {id: producto_id})
};
  
  const borrar = async (id) => {
    await deleteProducto(id)
    navigation.navigate('home')
   };

const renderItems = useCallback(
  ({item}) => {
    return (
      <View style= {styles.container}>
      <RenderListaComponent 
           nombre= {item.nombre}
           precio= {item.precio}
           stock= {item.stock}
      />
      <View>
        <TouchableOpacity style={
                styles.actualizar
            }
            onPress={
                () => {
                    actualizarProducto(item._id)
                }
        }>
            <Text style={
                styles.textBoton
            }>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={
                styles.borrar
            }

            onPress={
                () => alertaMensaje(item._id)
        }>
            <Text style={
                styles.textBoton
            }>Eliminar</Text>
        </TouchableOpacity>
    </View>
      </ View>
    )

  }
  ,
  [],
)

const keyExtractor= useCallback(
  (item) => item._id.toString(),[]
);


  return (
    <View style={
      styles.fondo
  } > 
       {
         loader ? <View style= {styles.loader}>
             <ActivityIndicator size="large" color="#808080" />
         </View> : <FlatList 
         data={productos}
         keyExtractor={keyExtractor}
         renderItem={renderItems}
         initialNumToRender={6}
         maxToRenderPerBatch={10}
         windowSize={10}
         />
       }
    </View>
  )
}

export default ProductosScreen

const styles = StyleSheet.create({
fondo: {
    backgroundColor: '#00ffff',
    flex: 1
},
loader: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 250,
    width: '100%'
},
container: {
  flex: 1,
  flexDirection: 'row',
  padding: 10,
  backgroundColor: '#ffffff',
  margin: 4,
  borderRadius: 5,
  justifyContent: 'space-between',
  minWidth: '80%'
},
actualizar: {
  borderColor: 'black',
  borderWidth: 2,
  backgroundColor: 'yellow',
  padding: 10,
  marginBottom: 15,
  borderRadius: 10,
  alignItems: 'center',
  borderRightWidth: 6,
  borderBottomWidth: 7

},
borrar: {
  borderColor: 'black',
  borderWidth: 2,
  backgroundColor: 'red',
  padding: 10,
  borderRadius: 10,
  alignItems: 'center',
  borderRightWidth: 6,
  borderBottomWidth: 7
},
textBoton: {
  color: 'black',
  fontWeight: 'bold',
  fontSize: 13
}

}
  )