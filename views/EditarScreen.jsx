import { StyleSheet, Text, View, Button, TextInput, ActivityIndicator } from 'react-native'
import React, {useEffect, useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {Alerta} from '../components/AlertComponent';
import {getProducto, updateProducto} from '../api'


const EditarScreen = ({route, navigation}) => {
  const [loader, setloader] = useState(true);
  const [producto, setproducto] = useState({
    categoria:'',
    nombre: '',
    precio: null,
    stock: null
  });

  
  useEffect(() => {
    (async () => {
      const prod = await getProducto(route.params.id)
      setproducto({categoria:prod.categoria,nombre: prod.nombre, precio: prod.precio, stock: prod.stock})
      setloader(false)
  })();
  }, [])

  const { control, handleSubmit, formState: { errors } } = useForm({
    initialValues: {...producto}
  });

  const onSubmit= async () => {
    (async () => {
        const respuesta = await updateProducto(producto, route.params.id);
        Alerta("Producto Actualizado", respuesta.msg,  () => {
          navigation.navigate('Productos')} )
    })()
};


 return(
   <View style={
    styles.pantalla
}>
  {loader ? <ActivityIndicator size="large" color="#808080" /> : <View >
    <Controller 
    control={control}
    rules={{required:true,}}
    render={({field:{onChange, value=producto.categoria}})=>(
      <View style={
        styles.container
    }>
      <Text style={
                  styles.texto
              }>Categoria:</Text>
      <TextInput 
       onChangeText={onChange}
       value={value}
       placeholder= {'Categoria'}
       style={
        styles.input
    }
      />
      </View>
    )}
     name='categoria'
    />
    {errors.categoria && <Text style={styles.error}>* Categoria es requirida.</Text>}
      <Controller 
    control={control}
    rules={{required:true,}}
    render={({field:{onChange, value=producto.nombre}})=>(
      <View style={
        styles.container
    }>
      <Text style={
                  styles.texto
              }>Producto:</Text>
      <TextInput 
       onChangeText={onChange}
       value={value}
       placeholder= {'Nombre del Producto'}
       style={
        styles.input
    }
      />
      </View>
    )}
     name='nombre'
    />
    {errors.nombre ? <Text style={styles.error}>*El nombre del Producto es requiro.</Text>:<></>}
      <Controller 
    control={control}
    rules={{required:true,}}
    render={({field:{onChange, value=producto.precio+''}})=>(
      <View style={
        styles.container
    }>
      <Text style={
                  styles.texto
              }>Precio:</Text>
      <TextInput 
       onChangeText={onChange}
       value={value}
       placeholder= {'Ingrese el Precio'}
       keyboardType='numeric'
       style={
        styles.input
    }
      />
      </View>
    )}
     name='precio'
    />
{errors.precio ? <Text style={styles.error}>*El precio es requiro.</Text>:<></>}
      <Controller 
    control={control}
    rules={{required:true,}}
    render={({field:{onChange, value=producto.stock+""}})=>(
      <View style={
        styles.container
    }>
      <Text style={
                  styles.texto
              }>Cantidad:</Text>
      <TextInput 
       onChangeText={onChange}
       value={value}
       placeholder= {'Catidad en existencia'}
       keyboardType='numeric'
       style={
        styles.input
    }
      />
      </View>
    )}
     name='stock'
    />
      {errors.stock ? <Text style={styles.error}>*La cantidad de Producto es requiro.</Text>:<></>}
    <Button title="Agregar" onPress={handleSubmit(onSubmit)} />
  </View>}
  </View>
)
}

export default EditarScreen

const styles = StyleSheet.create({

  pantalla:{
    backgroundColor: '#00ffff',
    padding: 20,
    flex:1
  },
  container: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    padding:30,

},
input: {
  borderWidth: 2,
  borderColor: 'black',
  fontSize: 17,
  borderRadius: 8,
  textAlign: "center",
  backgroundColor: 'white',
  flex:1,
  marginLeft: -55,
  marginRight:-25

},
texto: {
  fontSize: 22,
  fontWeight: 'bold',
  flex:1
},
error:{
  color:'red',
  fontSize: 14,
  marginTop:-27,
 marginHorizontal: 100
  
}


})