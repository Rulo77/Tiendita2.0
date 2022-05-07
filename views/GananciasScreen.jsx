import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, {useEffect, useState} from 'react'
import { getGanancia } from '../api';
import moment from 'moment'


const GananciasScreen = () => {
   const [ganancia, setganancia] = useState([])  
   const [loader, setloader] = useState(true);

   useEffect(() => {
    (async () => {
      const data = await getGanancia()
      setganancia(data)
  
      setloader(false)
      })()
   }, [])
 


  
 
  return (
    <View style={styles.pantalla}>
      <FlatList 
      data={ganancia}
      keyExtractor={(item)=> item._id}
      renderItem={({item})=>{
         return(
           <View style={styles.items}>
         <Text> {item.fecha}</Text>

           <Text>Ganancia total: $ {item.ganancia_del_dia}</Text>
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