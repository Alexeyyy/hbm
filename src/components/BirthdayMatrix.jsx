import { useEffect, useRef } from 'react';
import { MatrixEffect } from '../logic/MatrixEffect';
import { processFrame } from '../logic/MatrixAnimation';

const BirthdayMatrix = props => {
    const canvasRef = useRef(null);

    let lastTime = 0;
    let timer = 0;
    const fps = 40;
    const nextFrame = 1000 / fps;

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#00FF00');
        gradient.addColorStop(1.0, '#00FF00');
        
        const matrixEffect = new MatrixEffect(
            canvas.width,
            canvas.height,
            gradient,
        );

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            matrixEffect.resizeWindow(canvas.width, canvas.height);
        });

        let animationFrameId;
        const render = (timeStamp) => {
            const deltaTime = timeStamp - lastTime;
            lastTime = timeStamp;
            if (timer > nextFrame) {
                processFrame(matrixEffect, context, canvas.width, canvas.height, gradient);
                timer = 0;
            } else {
                timer += deltaTime;
            }
            animationFrameId = window.requestAnimationFrame(render);
        };
        render(0);
        
        return () => {
            window.cancelAnimationFrame(animationFrameId);
        }

    }, []);

    return <canvas ref={canvasRef} {...props}/>
}

export default BirthdayMatrix;