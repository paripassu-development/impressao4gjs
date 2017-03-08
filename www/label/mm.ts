const mmPartial = (dpi: number) => {
    return (mm: number) => {
        const MM_INCH_RATIO = 25.4;
        ppm = dpi / MM_INCH_RATIO;
        return mm * ppm;
    };
};

export { mmPartial };

