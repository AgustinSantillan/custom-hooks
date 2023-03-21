import { useEffect, useState } from 'react';

export const useFetch = (url) => {

    const [state, setState] = useState({
        data: null, // Producto de la peticion.
        isLoading: true, // Saber cuando se esta cargando. En true => al inicio.
        hasError: null, // si hubo un error.
    });


    const getFetch = async () => {

        /** Si volvemos a llamar el getFetch queremos poner el isLoading => true */
        setState({
            ...state, // Desestructuro el estado actual y cambio el estado del isLoading.
            isLoading: true,
        })

        const resp = await fetch(url); // Mandamos el url que me esta pidiendo como argumento.
        const data = await resp.json();

        /** Mandamos a llamar el setState */
        setState({
            data,
            isLoading: false,
            hasError: null,
        });
    }

    /** Cada vez que el url cambia el useEffect se va a disparar 
     * Internamente si puede tener tareas asincronas pero no puedo definir que su callback va a ser asincrono.
    */

    useEffect(() => {
        getFetch(); // Mandamos a llamar el getFetch.
    }, [url]);

    /** Definir valores de retorno
     * Aunque se mire redundante ayuda a la lectura.
     * Apuntamos al state con las mismas propiedades. Pero si quiero expandirlo o quiero agregar un nuevo metodo, lo puedo exponer facilmente.
     */

    return {
        data: state.data,
        isLoading: state.isLoading,
        hasError: state.hasError,
    };

};

