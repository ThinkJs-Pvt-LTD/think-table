export const partialStringMatch = (val1, val2) => {
    const _val1 = val1?.toString()?.toLowerCase();
    const _val2 = val2?.toString()?.toLowerCase();
    return _val1?.indexOf(_val2) > -1;
}