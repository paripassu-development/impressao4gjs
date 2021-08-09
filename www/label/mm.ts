const mmPartial = (dpi: number) => {
    return (mm: number) => {
        const MM_INCH_RATIO = 25.4;
        const ppm = dpi / MM_INCH_RATIO;
        return Math.round(mm * ppm);
    };
};

export { mmPartial };

