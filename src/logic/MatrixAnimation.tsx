import { MatrixEffect } from './MatrixEffect';

export function processFrame(
    matrixEffect: MatrixEffect,
    context: any,
    width: number,
    height: number,
    gradient: any,
) {
    context.fillStyle = 'rgba(0, 0, 0, 0.05)';
    context.fillRect(0, 0, width, height);
    context.textAlign = 'center';
    context.font = matrixEffect.fontSize + 'px monospace';
    if (Math.random() * 1 > 0.95) {
        context.fillStyle = '#FFFFFF';
    } else {
        context.fillStyle = gradient;
    }
    matrixEffect.symbols.forEach(s => {
        s.draw(context);
    });
}

export default {};