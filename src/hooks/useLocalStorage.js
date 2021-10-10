import { useState, useEffect } from "react";

/**This is a custom hook for keeping data saved on the 
 * browser in Local Storage.
 * 
 * How this works is that it creates an 'item' as state and 
 * looks in Local Storage for a current value.
 * If current value is not found, it defaults to the 
 * first value.
 * 
 * When there is a change in 'item', useeffect re runs:
 * - If new state is null, removes from Local storage 
 * - else, updates localstorage 
 * 
 * To the component that utilizes this, it just acts like 
 * state that is also synced to Local Storage
 * 
 * const [item, setItem] = useLocalStorage("Item")
 */

 function useLocalStorage(key, firstValue = null) {
     const init = localStorage.getItem(key) || firstValue;

     const [item, setItem] = useState(init);

     useEffect(function setKeyInLocalStorage() {
         if(item === null){
             localStorage.removeItem(key);
         } else {
             localStorage.setItem(key, item);
         }
     }, [key, item]);

     return [item, setItem];

 }

 export default useLocalStorage;