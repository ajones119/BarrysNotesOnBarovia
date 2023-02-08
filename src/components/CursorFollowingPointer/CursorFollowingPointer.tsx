import React, { useEffect } from "react";
import Sword from '../../images/swordimages-removebg-preview.png';

const IMAGE_DEGREE_OFFSET = 60;

export const CursorFollowingPointer = () => {

    useEffect(() => {
        const handleMouseMove = (event: any) => {//fix this any
            var pointer = document.getElementById("cursor-following-pointer");
            if (pointer) {
            const xoffset = pointer?.offsetLeft + pointer?.offsetWidth/2;
            const yoffset = pointer?.offsetTop + pointer?.offsetHeight/2;

            const xpos = xoffset - event.clientX;
            const ypos = yoffset - event.clientY;
            let degree = Math.atan(-xpos/ypos) * 180 / Math.PI;
            if (ypos > 0) {
                degree += 180;
            }
            degree += IMAGE_DEGREE_OFFSET;
            pointer.style.transform = "rotate("+degree+"deg)"
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener(
                'mousemove',
                handleMouseMove
            );
        };
    }, []);

  return(
    <div>
        <img id='cursor-following-pointer' src={Sword} alt='sword' />
    </div>
  );
}
