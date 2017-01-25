const mmPartial = (dpi: number) => {
    return (mm: number) => {
        const MM_INCH_RATIO = 25.4;
        this.ppm = dpi / MM_INCH_RATIO;
        return mm * this.ppm;
    };
};

export { mmPartial };

