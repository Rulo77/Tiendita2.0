import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import React from 'react';
import {useForm, Controller} from 'react-hook-form';
import {createNewProducto} from '../api';
import {Alerta} from '../components/AlertComponent'

const AgregarProductoScreen = ({navigation}) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    initialValues: {
      categoria:null,
      nombre: null,
      precio: null,
      stock: null
    }
  });
  const onSubmit = async (producto) => {
    const respuesta = await createNewProducto(producto);
    if (respuesta.correcto) {
     Alerta("Producto Guardado",respuesta.msg, () => {
      navigation.navigate('Menu')
  })
  } else {
    Alerta("Error al guardar Producto", respuesta.msg, () => { return })     
  }
  }

  return (
    <View style={
      styles.pantalla
  }>
      <Controller 
      control={control}
      rules={{required:true,}}
      render={({field:{onChange, value}})=>(
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
      autoFocus= {true}
        />
        </View>
      )}
       name='categoria'
      />
      {errors.categoria && <Text style={styles.error}>* Categoria es requirida.</Text>}
        <Controller 
      control={control}
      rules={{required:true,}}
      render={({field:{onChange, value}})=>(
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
      render={({field:{onChange, value}})=>(
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
      render={({field:{onChange, value}})=>(
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
    </View>
  )
}

export default AgregarProductoScreen

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