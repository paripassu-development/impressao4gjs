class DrawUtils {

    private ctx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }

    public polygon(coordenadas: ICoordenada[], corPreenchimento: string) {
        this.ctx.beginPath();
        coordenadas.forEach((coordenada) => {
            this.ctx.lineTo(coordenada.x, coordenada.y);
        });
        this.ctx.closePath();
        this.ctx.fillStyle = corPreenchimento;
        this.ctx.fill();
    }
}

interface ICoordenada {
    x: number;
    y: number;
}

export { DrawUtils };
