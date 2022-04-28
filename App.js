import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AgregarProductoScreen from './views/AgregarProductoScreen';
import ComprasScreen from './views/ComprasScreen';
import EditarScreen from './views/EditarScreen';
import GananciasScreen from './views/GananciasScreen';
import MenuScreen from './views/MenuScreen';
import ProductosScreen from './views/ProductosScreen';
import TiquetScreen from './views/TiquetScreen';


const MyStack = ()=> {
    
    const Stack =createNativeStackNavigator();
return <Stack.Navigator>
   <Stack.Screen name='Menu' component={MenuScreen}
    options={
                    {
                        title: 'Tiendita',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            fontSize: 25

                        },
                        headerTitleAlign: 'center'
                    }
            }
   />
   <Stack.Screen name='Productos' component={ProductosScreen}
       options={
        {
            title: 'Lista de Productos',
            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 25

            },
            headerTitleAlign: 'center'
        }
}
   />
   <Stack.Screen name='Agregar' component={AgregarProductoScreen} 
       options={
        {
            title: 'Nuevo Producto',
            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 25

            },
            headerTitleAlign: 'center'
        }
}
   />
   <Stack.Screen name='Compras' component={ComprasScreen}
       options={
        {
            title: 'Compras',
            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 25

            },
            headerTitleAlign: 'center'
        }
}
   />
   <Stack.Screen name='Tiquet' component={TiquetScreen}
       options={
        {
            title: 'Tiket',
            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 25

            },
            headerTitleAlign: 'center'
        }
}
   />
   <Stack.Screen name='Editar' component={EditarScreen} 
       options={
        {
            title: 'Editar Producto',
            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 25

            },
            headerTitleAlign: 'center'
        }
}
   />
   <Stack.Screen name='Ganancias' component={GananciasScreen} 
   options={
    {
        title: 'Ganancias del Dia',
        headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 25

        },
        headerTitleAlign: 'center'
    }
}
/>
</Stack.Navigator>

}
const App= () => {
    return (
<NavigationContainer>
  <MyStack />
</NavigationContainer>
    )
}

export default App