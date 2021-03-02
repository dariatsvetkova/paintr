function hexToRgb(inputHex) {
  if (inputHex.length > 0) {
    const resultRgb = [];

    for (let i = 1; i < 7; i += 2) {
      resultRgb.push(parseInt(inputHex[i] + inputHex[i + 1], 16));
    }
    return resultRgb;
  }
}

export default hexToRgb;
