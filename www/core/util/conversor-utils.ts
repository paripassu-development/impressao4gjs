const converterPtParaPX = (pt: number) => {
    return pt * 96 / 72;
};
const converterPXParaPT = (px: number) => {
    return 3 / 4 * px;
};

const converterPTparaMM = (pt: number) => {
    return pt * 0.3528;
};

export { converterPtParaPX, converterPXParaPT, converterPTparaMM };
