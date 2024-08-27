import { matrixSymbols } from "./Symbols";

export class ImageParticle {
    x: number;
    y: number;
    speed: number;
    velocity: number;
    size: number;
    canvasWidth: number;
    canvasHeight: number;
    positionX: number;
    positionY: number;

    fontSize: number;
    text: string;

    constructor(canvasWidth: number, canvasHeight: number) {
        this.x = Math.random() * canvasWidth;
        this.y = 0;
        this.speed = 0;
        this.velocity = Math.random() * 8;
        this.size = Math.random() * 3;
        this.canvasHeight = canvasHeight;
        this.canvasWidth = canvasWidth;
        this.positionX = Math.floor(this.x);
        this.positionY = Math.floor(this.y);

        this.text = '';
        this.fontSize = 10;
    }

    update(mappedImage: []) {
        this.positionX = Math.floor(this.x);
        this.positionY = Math.floor(this.y);

        const brightness = mappedImage[this.positionY][this.positionX][0];
        this.speed = brightness;
        let movement = (2.5 - this.speed) + this.velocity;

        this.y += movement;
        if (this.y > this.canvasHeight) {
            this.y = 0;
            this.x = Math.random() * this.canvasWidth;
            this.speed = 0;
        }
    }

    draw(context: any) {
        context.beginPath();
        context.fillStyle = '#00FF00';
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
    }
}

export function initializeParticles(
    particles: ImageParticle[],
    numberOfParticles: number,
    canvasWidth: number,
    canvasHeight: number,
) {
    for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new ImageParticle(canvasWidth, canvasHeight));
    }
}

export function processFrame(
    context: any,
    canvasWidth: number,
    canvasHeight: number,
    particles: ImageParticle[],
    mappedImage: [],
) {
    context.globalAlpha = 0.1;
    context.fillStyle = 'rgb(10, 0, 10)';
    context.globalAlpha = 0.02;
    context.fillRect(0, 0, canvasWidth, canvasHeight);

    for (let i = 0; i < particles.length; i++) {
        particles[i].update(mappedImage);
        context.globalAlpha = particles[i].speed * 0.07;
        particles[i].draw(context);
    }
}

export default {};