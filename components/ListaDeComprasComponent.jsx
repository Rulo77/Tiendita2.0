import React from 'react';
import {
    View,
    Text,
    FlatList,
    Button,
    StyleSheet
} from 'react-native';

const LIstaDeComprasComponent = ({listaProductos, handleResta}) => {
    return <View style={
        styles.contenido
    }><FlatList data={listaProductos}
            keyExtractor={
                (item) => item._id
            }
            renderItem={
                ({item}) => {
                    return <View style={
                        styles.lista
                    }>
                        <View>
                            <Text style={
                                styles.colorw
                            }>
                                {
                                item.cantidad
                            }</Text>
                        </View>
                        <View>
                            <Text style={
                                styles.colorw
                            }>
                                {
                                item.nombre
                            }</Text>
                        </View>

                        <View style={
                            styles.precio
                        }>
                            <Text style={
                                styles.colorw
                            }>$ {
                                item.precio
                            }</Text>
                            <Button title='Quitar'
                                onPress={
                                    () => handleResta(item)
                                }/>
                        </View>
                    </View>
            }
            }/>
    </View>
};

const styles = StyleSheet.create({
    lista: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        alignItems: 'flex-start',
        borderBottomWidth: 2,
        marginTop: 1,
        alignItems: 'center',
        alignContent: 'center',
        maxWidth: '100%',
        minWidth: '75%'
    },
    precio: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        minWidth: '28%'
    },
    contenido: {
        maxHeight: '30%'
    },
    colorw: {
        color: 'black',
        marginEnd: 15
    }

});


export default LIstaDeComprasComponent
