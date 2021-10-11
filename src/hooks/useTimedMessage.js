import { useRef, useState, useEffect } from "react";

/**This custom hooks helps with managing 
 * flash messages 
 * 
 * In the component utilizing this hook:
 * 
 * const [msgFlag, setMsgFlag] = useTimedMessage();
 * 
 * 
 * function somethingDidntWork (){
 * setMsgFlag(true)}
 * 
 * return (
 * {msgFlag ? <p>Flash Message</p> : null})
 * 
 * 
 * While this hook was written for showing flash messages, it's really just
 * a hook for timed state clearing -- this same pattern could be useful for
 * other tasks.
 */

 function useTimedMessage (timeInMsec = 3000) {
     const [active, setActive] = useState(false);

     const messageShownRef = useRef(false);

     useEffect(function showSavedMessage(){
         if(active && !messageShownRef.current) {
             messageShownRef.current = true;
             setTimeout(function removeMessage(){
                 setActive(false);
                 messageShownRef.current = false;
             }, timeInMsec);
         }
     }, [active, timeInMsec]);

     return [active, setActive];
 }

 export default useTimedMessage;