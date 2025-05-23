import { RefObject } from "react";

export const useDropDownPosition = (ref : RefObject<HTMLDivElement|null >| RefObject<HTMLDivElement>)=> {
    const getDropDownPosition = () => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            const dropDownWidth = 240
            // Calculate initial position 
            const top = rect.bottom + window.scrollY;
            let left = rect.left + window.scrollX;
            // Check if the dropdown is going out of the screen
            if(left + dropDownWidth > window.innerWidth) {
                // Align to right edge of button instead
                left = rect.right - dropDownWidth + window.scrollX;
                // if still off the screen , align to right edge of viewport with some padding 
                if(left<0){
                    left= window.innerWidth-dropDownWidth - 16;
                }
            }
            // Ensure the dropdown doesn't go off the left edge
            if(left<0){ 
                left = 16;
            }
            return { top, left };
        }
        return { top: 0, left: 0 };
    }
    return {getDropDownPosition};
}