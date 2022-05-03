import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'


const GananciasScreen = () => {
  const ganancias= [{_id:1223,'nombre':'Raul'},{_id:6645,'nombre':'Brenda'}]
  return (
    <View style={styles.pantalla}>
      <FlatList 
      data={ganancias}
      keyExtractor={(item)=> item._id}
      renderItem={({item})=>{
         return(
           <View style={styles.items}>
           <Text>{item._id}</Text>
            <Text>{item.nombre}</Text>
           </View>
         )
      }     
      }
      />
    </View>
  )
}

export default GananciasScreen

const styles = StyleSheet.create({

  pantalla:{
    backgroundColor: '#00ffff',
    flex:1,
    padding:25
  },
  items:{
    backgroundColor:'#ffffff',
    margin:15,
    height:150,
    padding:15
  }

})