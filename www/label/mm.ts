const OVERSAMPLED_FACTOR = 1;

const mmPartial = (dpi: number) => {
    return (mm: number) => {
        const MM_INCH_RATIO = 25.4;
        this.ppm = dpi / MM_INCH_RATIO;
        return mm * this.ppm;
    };
};

const mmPartialOversampled = (dpi: number) => {
    return (mm: number) => {
        const MM_INCH_RATIO = 25.4;
        this.ppm = dpi / MM_INCH_RATIO;
        return mm * this.ppm * OVERSAMPLED_FACTOR;
    };
};

export { mmPartial, mmPartialOversampled, OVERSAMPLED_FACTOR };

