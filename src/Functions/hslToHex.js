// from https://stackoverflow.com/questions/36721830/convert-hsl-to-rgb-and-hex

function hslToHex(inputHsl) {
  if (inputHsl.length > 0) {
    const h = inputHsl[0];
    const s = inputHsl[1];
    const l = inputHsl[2] / 100;

    const a = (s * Math.min(l, 1 - l)) / 100;

    const f = (num) => {
      const b = (num + h / 30) % 12;
      const hex = l - a * Math.max(Math.min(b - 3, 9 - b, 1), -1);

      return Math.round(255 * hex)
          .toString(16)
          .toUpperCase()
          .padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }
}

export default hslToHex;
