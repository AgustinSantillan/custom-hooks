/** useTodo  
 * Nuestro hook tiene toda la informacion agrupada de la tarea
 * Es una abstraccion de la logica
*/

import { useEffect, useReducer } from 'react';
import { todoReducer } from '../08-useReducer/todoReducer';

/** Hacer que nuestros todo no vengan desde el initialState 
 * Pero yo quiero hacer que esta informacion sea persistente.
 * La grabamos => espacio en el navegador web => localStorage.
 * Cookies => podemos utilizarlas para grabar informacion pero lo hacen en menor cantidad que el localStorage. Generalmente viajan cuando hacemos un request. Van implicitas.
 * El localStorage nunca deja nuestra computadora a menos que nosotros explicitamente leamos el localStorage y se lo enviemos a una peticion http (post, etc)
*/

const initialState = [];

/** Tenemos que inicializar nustro state con los todos que previamente existian en el localStorage
 * Tercera funcion en nustro reduce => init (usualmente se le pone asi).
 * init => funcion que inicializa nuestro reducer.
 * json.parse => opuesto de stringify.
 * Que intente parsea lo que se encuentra en el localStorage.getItem
 * La primera vez que la persona carga la aplicacion puede ser nulo entonces regresamos un arreglo [].
 */

const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || [];
}

export const useTodos = () => {

    /** El todoReducer no lo ejecutamos, simplemente pasamos la referencia a la funcion, para que el useReducer lo ejecute cuando lo necesite 
     * state => son nuestros todos. Nuestra lista de tareas que tenemos pendientes.
     * dispatch => usualmente se llama asi, cuando tenemos un solo reducer.
    */

    const [todos, dispatch] = useReducer(todoReducer, initialState, init);


    useEffect(() => {

        /** Voy a grabar los elementos en el localStorage
         * Cuando cambie o agregue una todo cambia.
         * Cuando esto cambia vamos a disparar un efecto secundario. Un => useEffect.
         * Cuando los todos cambian voy a volver a ejecutar el efecto.
         * No debemos importarlo de ningun lugar porque es una api que viene en js.
         */

        /** Vamos a leer esos todos y vamos a serializarlos
         * No podemos grabar objetos en el localStorage unicamente strings.
        */
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);


    const handleNewTodo = (todo) => {

        /** Todo es el payload que quiero enviarle a mi accion */
        const action = {
            type: '[TODO] Add Todo', // type => nombre que nosotros establecimos.
            payload: todo, // payload => es nuestro todo.
        }
        /** Le mando la accion al reducer usando el dispatch */
        dispatch(action);
    }

    /** Eliminamos un todo
     * Recibimos un id como argumento.
     * El payload va a ser el id.
     */

    const handleDeleteTodo = (id) => {
        dispatch({
            type: '[TODO] Remove Todo',
            payload: id,
        });
    }

    /** Toggle Toto */
    const handleToggleTodo = (id) => {
        dispatch({
            type: '[TODO] Toggle Todo',
            payload: id,
        });
    }

    return {
        pendingCount: todos.filter(todo => !todo.done).length,
        todosCount: todos.length, // pordemos tener la logica
        handleDeleteTodo,
        handleNewTodo,
        handleToggleTodo,
        todos,
    }
};
