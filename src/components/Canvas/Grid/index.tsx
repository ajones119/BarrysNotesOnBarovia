import React, { useRef, useEffect } from 'react';

type GridCanvasProps = {
    width?: number,
    height?: number,
    sideLength: number,
    rows?: number,
    cols?: number,
    gridColor?: string,
    lineWidth?: number;
}

const  GridCanvas = ({ lineWidth = 1, width = 0, height = 0, sideLength = 0, rows = 0, cols = 0, gridColor = "black" }: GridCanvasProps) =>  {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    // Clear the canvas
    ctx?.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    if (ctx) {
        ctx.strokeStyle = gridColor;
        ctx.lineWidth = lineWidth;
    }

    // Draw horizontal lines
    if (rows) {
        const width = cols * sideLength;
        for (let i = 0; i < rows; i++) {
            const y = i * sideLength;
            ctx?.beginPath();
            ctx?.moveTo(0, y);
            ctx?.lineTo(width, y);
            ctx?.stroke();
        }
    } else if (height) {
        for (let y = 0; y < height; y += sideLength) {
            console.log("Y", y)
            ctx?.beginPath();
            ctx?.moveTo(0, y);
            ctx?.lineTo(width, y);
            ctx?.stroke();
        }
    }

    // Draw vertical lines
    if (cols) {
        const height = rows * sideLength
        for (let i = 0; i < cols; i++) {
            const x = i * sideLength;
            ctx?.beginPath();
            ctx?.moveTo(x, 0);
            ctx?.lineTo(x, height);
            ctx?.stroke();
        }
    } else if (width) {
        for (let x = 0; x < width; x += sideLength) {
            ctx?.beginPath();
            ctx?.moveTo(x, 0);
            ctx?.lineTo(x, height);
            ctx?.stroke();
        }
    }
  }, [width, height, sideLength, rows, cols, gridColor, lineWidth]);

  const totalWidth = cols ? cols * sideLength : width;
  const totalHeight = rows ? rows * sideLength : height;

  return <canvas ref={canvasRef} width={totalWidth} height={totalHeight} />;
}

export default GridCanvas