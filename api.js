const url = 'https://back-end-tiendita.herokuapp.com'


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