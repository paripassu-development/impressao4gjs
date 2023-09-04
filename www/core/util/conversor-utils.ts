const converterPtParaPX = (pt: number) => {
    return pt * 96 / 72;
};
const convertPXParaPT = (px: number) => {
    return 3 / 4 * px;
};

export { converterPtParaPX, convertPXParaPT };
