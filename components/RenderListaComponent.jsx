import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const RenderListaComponent = ({ nombre, precio, stock= null }) => {
    return (
      <>
          <View style={styles.titulo}>
              <Text style={styles.texto}>
                  {nombre}
              </Text>
          </View>
       <View>
          {
            stock != null ? <Text>
            cantidad: {stock}
        </Text> : <></>    
          } 
           <Text>
               precio: ${precio}
           </Text>
       </View>
      </>
    )
}

export default RenderListaComponent

const styles = StyleSheet.create({
    titulo: {
        maxWidth: 150
    },
    texto: {
        fontSize: 17
    }

})