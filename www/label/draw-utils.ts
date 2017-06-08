class DrawUtils {

    private ctx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }

    public polygon(xPontos: number[], yPontos: number[], corPreenchimento: string) {
        this.ctx.beginPath();
        for (let i = 0; xPontos.length >= i; i++) {
            this.ctx.lineTo(xPontos[i], yPontos[i]);
        }
        this.ctx.closePath();
        this.ctx.fillStyle = corPreenchimento;
        this.ctx.fill();
    };
}

export { DrawUtils };
