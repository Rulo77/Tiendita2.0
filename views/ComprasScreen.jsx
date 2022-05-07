import { StyleSheet, Text, View, FlatList,TouchableHighlight, TextInput, ActivityIndicator } from 'react-native'
import React, {useEffect, useState, useCallback, useRef} from 'react'
import { getProductos } from '../api';
import {Alerta} from '../components/AlertComponent';
import RenderListaComponent from '../components/RenderListaComponent';
import LIstaDeComprasComponent from '../components/ListaDeComprasComponent';
import {updateProducto, } from '../api'

const ComprasScreen = ({navigation}) => {
  
    const [productos, setproductos] = useState([]);
    const [loader, setloader] = useState(true)
    const [suma, setsuma] = useState(0)
    const [listaProductos, setlistaProductos] = useState([])
    const [pago, setpago] = useState(null)

  useEffect(() => {
     (async ()=> {
       const data = await getProductos();
       setproductos(data);
       setloader(false)
     } )()
  }, [])
  

  const comprar = async () => {
    if (pago === null || pago.trim() == "") {
      Alerta('Error', "Deves ingresar el dinero recivido", ()=>{pagoInput.current.focus()} )
    }
    if (listaProductos !== [] && suma !== 0 && pago !== null && pago.trim() !== "" ) {
        if (pago >= suma) {
            navigation.navigate('Tiquet', {listaProductos, suma, pago})
            for (let i = 0; i < listaProductos.length; i++) {
                await updateProducto(listaProductos[i], listaProductos[i]._id)
            }
        } else {
          Alerta('Error', "asegurate que el monto ingresado sea mayor o igual al total de la compra", ()=>{return} )
        }
    } else {
        return
    }
}


const handleSuma = (item) => {
    if (item.stock === 0) {
      Alerta("Lo sentimos", "Producto no disponible por el momento", ()=>{return} )
    } else {
        setsuma(suma + item.precio)
        const index = listaProductos.findIndex((producto) => producto._id === item._id)

        if (index === -1) {
            let stock_ac = item.stock;
            setlistaProductos([
                ...listaProductos, {
                    ...item,
                    stock: stock_ac - 1,
                    cantidad: 1
                }
            ])
        } else {
            listaProductos[index].cantidad ++;
            listaProductos[index].stock --;
        }
    }

}


const handleResta = (item) => {
    setsuma(suma - item.precio)
    const index = listaProductos.findIndex((producto) => producto._id === item._id)
    listaProductos[index].cantidad --;
    listaProductos[index].stock ++;
    setlistaProductos([...listaProductos.filter((producto) => producto.cantidad !== 0)])
}


const keyExtractor= useCallback(
  (item) => item._id.toString(),[]
);

const pagoInput = useRef(null)

return (
  <View style={
      styles.contain
  }>
      <View>
          <Text style={
              styles.texto
          }>$ {suma}.00</Text>
      </View>

      {
      listaProductos.length != 0 ? <LIstaDeComprasComponent listaProductos={listaProductos} handleResta={handleResta} /> : <View style={styles.blanco}></View>
  }

      {
      loader ? <ActivityIndicator size="large" color="#808080"/> : <FlatList data={productos}
          keyExtractor={keyExtractor }
          renderItem={
            ({item}) => {
          return(
              <TouchableHighlight style={
                styles.container
            }
      
            onPress={
                () => handleSuma(item)
        }>
              <RenderListaComponent nombre={item.nombre} precio={item.precio} />
           
            </TouchableHighlight>
            )
        }

          }/>
  }
      <View style={
          styles.compra
      }>
          <TextInput style={
                  styles.input
              }
              
              placeholderTextColor="#d3d3d3"
              placeholder="dinero recivido"
              keyboardType="numeric"
              onChangeText={setpago}
              value={pago}
              ref= {pagoInput}
              />
          <TouchableHighlight style={
                  styles.boton
              }
              onPress={comprar}>
              <Text>Realizar compra</Text>
          </TouchableHighlight>
      </View>
  </View>

)
}

const styles = StyleSheet.create({

contain: {
  flex: 1,
  justifyContent: 'space-between',
  backgroundColor: '#00ffff',
  alignItems: 'center'
},
container: {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: 15,
  alignItems: 'flex-start',
  borderBottomWidth: 2,
  backgroundColor: '#ffffff',
  minWidth: '67%',
  margin: 1
},
texto: {
  fontSize: 60,
  textAlign: 'center',
  padding: 15,
  marginBottom: 10,
  color: 'black',
},
boton: {
  backgroundColor: "#7fff00",
  padding: 9,
  borderWidth: 2,
  borderRadius: 5,
  height:45,
  width:150,
 alignItems:'center'
},
input: {
  borderWidth: 2,
  borderColor: 'green',
  borderRadius: 7,
  margin: 7,
  fontSize: 17,
  borderRadius: 8,
  textAlign: "center",
  width: 150,
  height: 45,
  backgroundColor: 'white'
},
compra: {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '80%',
  minHeight: 60,
  maxHeight: 60,
  marginBottom: 10,
  alignItems: 'center'

},
blanco:{
  height: 215
}

})
export default ComprasScreen

