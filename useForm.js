/** Formulario con custom Hook */

import { useState } from 'react';

/** Establecemos el initialForm que por defecto va a ser un objeto. 
 * Mi formState va a ser igual a lo que yo le mande como argumento.
*/

export const useForm = (initialForm = {}) => {

    const [formState, setFormState] = useState(initialForm);

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value,
        });
    }

    const onResetForm = () => {
        setFormState(initialForm);
    }

    return {
        /** Para evitar hacer el paso de la desestructuracion del otro lado */
        ...formState,
        formState,
        onInputChange,
        onResetForm,
    }

};
