const url = 'https://tiendita-appnew.herokuapp.com'
//const url = 'http://192.168.56.1:5000'

export const getProductos = async () => {
    const res = await fetch(url);
    return await res.json()
}

export const getProducto = async (id) => {
    const res = await fetch(`${url}/buscar/${id}`);
    return await res.json()
}

export const createNewProducto = async (newProducto) => {
    console.log(newProducto)
    const options = {
        method: "POST",
        headers: {
            Accept: 'application.json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newProducto),
        cache: 'default'
    }
    try {
        const res = await fetch(`${url}/producto`, options);
        const data = await res.json();
        return data
    } catch (e) {
        console.log(e);
    }


}

export const deleteProducto = async (id) => {
    const res = await fetch(`${url}/eliminar/${id}`, {method: 'DELETE'});
    return await res.json()
}

export const updateProducto = async (Producto, id) => {
    const options = {
        method: "PUT",
        headers: {
            Accept: 'application.json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(Producto)
    }
    try {
        const res = await fetch(`${url}/editar/${id}`, options);
        const data = await res.json()
        return data
    } catch (e) {
        console.log(e);
    }
}

export const getGanancia = async () => {
    const res = await fetch(`${url}/ganancia`);
    return await res.json()
}

export const createNewGanancia = async (ganancia) => {
  //  console.log(ganancia)
    const options = {
        method: "POST",
        headers: {
            Accept: 'application.json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(ganancia),
        cache: 'default'
    }
    try {
        const res = await fetch(`${url}/ganancia`, options);
        const data = await res.json();
        console.log(data)
        return data
    } catch (e) {
        console.log(e);
    }

}

export const getGananciaByfecha= async (fecha)=>{
    const res= await fetch(`${url}/ganancia/${fecha}`)
    const data= await res.json();
    return data

}