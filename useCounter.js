import { useState } from 'react';

export const useCounter = (initialValue = 10) => {

    const [counter, setCounter] = useState(initialValue);

    /** value = 1 => establecemos varialbe para decidir por cuanto queremos sumarlo o restarlo 
     *  setCounter((current) => current + value) => para que tome le valor actual y lo sume o reste.
    */
    const increment = (value = 1) => {
        setCounter((current) => current + value);
    }

    const decrement = (value = 1) => {
        if (counter - value <= 0) return setCounter(0);
        if (counter === 0) return;
        setCounter((current) => current - value);
    }

    const reset = () => {
        setCounter(initialValue);
    }

    /** Lo devolvemos como un objeto. Por eso podemos desestructurarlo. Si fuera un arreglo seria con []. */
    return {
        counter,
        increment,
        decrement,
        reset,
    }
};
