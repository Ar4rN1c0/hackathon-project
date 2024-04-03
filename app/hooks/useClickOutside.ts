import { Dispatch, RefObject, SetStateAction, useEffect } from "react";

export default function useClickOutside (ref: RefObject<HTMLDivElement>, callbackHook: Dispatch<SetStateAction<boolean>>, value: boolean) {
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
          if (ref.current && !ref.current.contains(event.target as Node)) {
            callbackHook(value)
          }
        }
        document.addEventListener('click', handleClickOutside);
    
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }, []);
}