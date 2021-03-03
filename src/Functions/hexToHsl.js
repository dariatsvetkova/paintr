function hexToHsl(inputHex) {
  if (inputHex.length > 0) {
    const r = parseInt(inputHex.slice(1, 3), 16) / 255;
    const g = parseInt(inputHex.slice(3, 5), 16) / 255;
    const b = parseInt(inputHex.slice(5), 16) / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let l = (max + min) / 2;
    let h;
    let s;

    if (max === min) {
      h = s = 0;
    } else {
      s = l > 0.5 ? (max - min) / (2 - max - min) : (max - min) / (max + min);

      switch (max) {
        case r:
          h = (g - b) / (max - min) + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / (max - min) + 2;
          break;
        case b:
          h = (r - g) / (max - min) + 4;
          break;
        default:
          return null;
      }
      h *= 60;
    }
    s *= 100;
    l *= 100;
    return [
      Math.round(h * 100) / 100,
      Math.round(s * 100) / 100,
      Math.round(l * 100) / 100,
    ];
  }
}

export default hexToHsl;
