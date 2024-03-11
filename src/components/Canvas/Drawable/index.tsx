import React, { useRef, useEffect, useState, BaseSyntheticEvent } from 'react';

type DrawableCanvasProps = {
    width: number,
    height: number
    onDrawEnd: (data: string) => void,
    loadData: string,
    disabled?: boolean,
    pointSize?: number,
    pointColor?: string,
    isErasing?: boolean,
}

function DrawableCanvas({ width, height, onDrawEnd, loadData, disabled = false, pointSize = 1, pointColor = "black", isErasing = false }: DrawableCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const contextRef = useRef<any>(null);
    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            //do i really need to double pixel density?

            canvas.width = width;
            canvas.height = height;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            const context = canvas.getContext("2d");
            if (context) {
                context.clearRect(0,0,width,height);

                //context?.scale(2,2);
                context.lineCap = "round"
                contextRef.current = context;
                context.strokeStyle = pointColor;
                context.lineWidth = pointSize;
                if (loadData) {
                    console.log(loadData)
                    const image = new Image();
                    image.onload = () => {
                        context.drawImage(image, 0, 0)
                    }

                    image.src = loadData
                }
            }
        }

    }, [width, height, loadData, isErasing, disabled, pointColor, pointSize]);

    useEffect(() => {
       
    }, [isErasing])

    const startDrawing = ({nativeEvent}: BaseSyntheticEvent<MouseEvent>) => {
        console.log("START DRAWING")
        if (disabled) return;

        const offsetX = nativeEvent.offsetX;
        const offsetY = nativeEvent.offsetY;
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY)
        setIsDrawing(true);
    };

    const finishDrawing = () => {
        console.log("END DRAWING")
        if (!isDrawing) return;

        contextRef.current.closePath();
        setIsDrawing(false);
        const imageData = canvasRef.current?.toDataURL();
        console.log(imageData)
        onDrawEnd(imageData || "");
    }

    const draw = ({nativeEvent}: BaseSyntheticEvent<MouseEvent>) => {
        if (!isDrawing) return;

        if (isErasing) {
            contextRef.current.globalCompositeOperation = "destination-out";
         }

        const offsetX = nativeEvent?.offsetX;
        const offsetY = nativeEvent.offsetY;
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();

    };

    return (
        <canvas
            ref={canvasRef}
            width={width}
            height={height}
            onMouseDown={startDrawing}
            onMouseUp={finishDrawing}
            onMouseMove={draw}
            style={{ border: '6px solid black', backgroundColor: "transparent" }}
        />
    );
}

export default DrawableCanvas;