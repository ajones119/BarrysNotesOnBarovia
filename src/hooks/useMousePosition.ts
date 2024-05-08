import { useEffect, useState } from 'react';
const useMousePosition = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const updateMousePosition = (event: any) => {
            setPosition({ x: event.clientX, y: event.clientY });
        };

        window.addEventListener('mousemove', updateMousePosition);

        // Cleanup function to remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
        };
    }, []);

    return position;
};

export default useMousePosition;
