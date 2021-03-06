import hexToRgb from './hexToRgb';
import hslToHex from './hslToHex';

// Generate a random colour palette:

function generate(userColours) {
  return new Promise((resolve, reject) => {
    // 1. Initiate a set of colours for the palette:

    let primary = [];
    let accent1 = [];
    let accent2 = [];
    let white = [];
    let light = []; // Light grey colour used as background
    let dark = [];
    const hue = [];

    // 1a. If the user entered any colours, integrate them into the palette:

    if (userColours.length > 0) {
      const cols = userColours;

      cols.forEach((col) => {
        const contrastWhite = checkContrast(col, [0, 0, 100]);
        const contrastBlack = checkContrast(col, [0, 0, 0]);

        // If the colour has low contrast with white, use it as white or light:
        if (contrastWhite > 1 / 1.8) {
          if (col[2] >= 95) {
            light =
              // If there is already a white, compare their lightness
              white.length === 0 ? light : white[2] > col[2] ? col : white;
            white = white.length === 0 ? col : white[2] > col[2] ? white : col;

            hue.push(white[0]);
            // If none of the user's colours are set as primary,
            // use the same hue to create a primary colour later
            light.length > 0 && hue.push(light[0]);
          } else if (col[2] > 80 && col[1] <= 15) {
            light = col;
            hue.push(light[0]);
          } else {
            accent1 =
              primary.length === 0 ?
                accent1 :
                primary[1] < col[1] ?
                col :
                primary; // The colour with more saturation is set as an accent
            primary =
              primary.length === 0 ? col : primary[1] < col[1] ? primary : col;

            accent1.length > 0 && hue.push(accent1[0]);
          }

          // If the colour has low contrast with black and low lightness,
          // use it as dark or primary
        } else if (contrastBlack > 1 / 1.8 && col[2] < 25) {
          // If there is already a dark, choose the one with lower lightness
          primary = dark.length === 0 ? primary : dark[2] < col[2] ? col : dark;
          dark = dark.length === 0 ? col : dark[2] < col[2] ? dark : col;

          hue.push(dark[0]);

          // In all other cases, use the user's colours as primary and accent:
        } else {
          accent1 =
            primary.length === 0 ?
              accent1 :
              primary[1] < col[1] ?
              col :
              primary;
          primary =
            primary.length === 0 ? col : primary[1] < col[1] ? primary : col;

          accent1.length > 0 && hue.push(accent1[0]);
        }
      });
    }

    // 1b. If the primary colour wasn't set, generate it randomly:

    primary =
      primary.length > 0 ?
        primary :
        [
            hue.length > 0 ?
              hue[Math.round(Math.random() * (hue.length - 1))] :
            // Use the hue from user's colours, if any, or generate randomly
            Math.round(Math.random() * 360),
            // Saturation >20 to prevent blending in with neutral colours;
            // under 90 to avoid colours that are too bright
            Math.floor(Math.random() * (90 - 20 + 1)) + 20,
            // Lightness from 30-85 to prevent blending in with black and white
            Math.floor(Math.random() * (85 - 30 + 1)) + 30,
        ];

    // 2. Pick a palette generation method

    let Methods = [];

    // 2a. If the user provided two colours
    // approximate appropriate methods based on their difference in hue:
    if (userColours.length === 2) {
      const angle = Math.abs(userColours[0][0] - userColours[1][0]);

      if (angle < 30 || angle > 330) {
        Methods = ['analogue', 'comp', 'split-comp', 'triad', 'square'];
      } else if (angle <= 60 || angle >= 300) {
        Methods = ['mono', 'analogue'];
      } else if ((angle > 60 && angle < 120) || (angle > 240 && angle < 300)) {
        Methods = ['analogue', 'square', 'triad'];
      } else if (angle >= 120 && angle <= 240) {
        Methods = ['triad', 'split-comp', 'comp'];
      }

      // 2b. If the user entered less than two colours, pick a method randomly:
    } else {
      Methods = ['mono', 'analogue', 'comp', 'split-comp', 'triad', 'square'];
    }

    const method = Methods[Math.round(Math.random() * (Methods.length - 1))];

    // 3. Generate accent colour(s) by shifting h, s, l of the primary colour:

    let int = 0;

    switch (method) {
      case 'mono':
        int =
        // Random -15 to +15 deg shift from the hue to allow for more contrast
          (Math.round(Math.random()) * 2 - 1) * Math.round(Math.random() * 15);

        accent1 =
          accent1.length > 0 ?
            accent1 :
            [
                primary[0] + int < 360 ?
                  primary[0] + int :
                  primary[0] + int - 360,
                Math.floor(Math.random() * (90 - 20 + 1)) + 20,
                Math.floor(Math.random() * (85 - 30 + 1)) + 30,
            ];
        accent2 = [
          primary[0],
          Math.floor(Math.random() * (90 - 20 + 1)) + 20,
          Math.floor(Math.random() * (85 - 30 + 1)) + 30,
        ];
        break;

      case 'analogue':
        // Random hue interval of 20-75 degrees
        int = Math.floor(Math.random() * (75 - 20 + 1)) + 20;

        accent1 =
          accent1.length > 0 ?
            accent1 :
            [
                primary[0] + int < 360 ?
                  primary[0] + int :
                  primary[0] + int - 360,
                primary[1] > 50 ?
                  primary[1] * (1 - Math.random() * 0.15) :
                  primary[1] / (1 - Math.random() * 0.15),
                primary[2] > 50 ?
                  primary[2] * (1 - Math.random() * 0.25) :
                  primary[2] / (1 - Math.random() * 0.25),
            ];
        accent2 = [
          primary[0] - int > 0 ? primary[0] - int : primary[0] - int + 360,
          primary[1] > 50 ?
            primary[1] * (1 - Math.random() * 0.15) :
            primary[1] / (1 - Math.random() * 0.15),
          primary[2] > 50 ?
            primary[2] * (1 - Math.random() * 0.25) :
            primary[2] / (1 - Math.random() * 0.25),
        ];
        break;

      case 'comp':
        int =
          (Math.round(Math.random()) * 2 - 1) *
            Math.floor(Math.random() * (15 - 5 + 1)) +
          5;
        // Random +-5-15 shift from the opposing hue to avoid clashing colours

        accent1 =
          accent1.length > 0 ?
            accent1 :
            [
                primary[0] + 180 + int < 360 ?
                  primary[0] + 180 + int :
                  primary[0] + 180 + int - 360,
                primary[1] > 50 ?
                  primary[1] * (1 - Math.random() * 0.2) :
                  primary[1] / (1 - Math.random() * 0.2),
                primary[2] > 50 ?
                  primary[2] * (1 - Math.random() * 0.35) :
                  primary[2] / (1 - Math.random() * 0.35),
            ];
        accent2 = [accent1[0], primary[1], primary[2]];
        break;

      case 'split-comp':
        int =
          (Math.round(Math.random()) * 2 - 1) *
            Math.floor(Math.random() * (75 - 20 + 1)) +
          20; // Random 20-75 deg shift from the opposing hue

        accent1 =
          accent1.length > 0 ?
            accent1 :
            [
                primary[0] + 180 + int < 360 ?
                  primary[0] + 180 + int :
                  primary[0] + 180 + int - 360,
                primary[1] > 50 ?
                  primary[1] * (1 - Math.random() * 0.15) :
                  primary[1] / (1 - Math.random() * 0.15),
                primary[2] > 50 ?
                  primary[2] * (1 - Math.random() * 0.35) :
                  primary[2] / (1 - Math.random() * 0.35),
            ];
        accent2 = [
          primary[0] + 180 - int < 360 ?
            primary[0] + 180 - int :
            primary[0] + 180 - int - 360,
          primary[1] > 50 ?
            primary[1] * (1 - Math.random() * 0.15) :
            primary[1] / (1 - Math.random() * 0.15),
          primary[2] > 50 ?
            primary[2] * (1 - Math.random() * 0.35) :
            primary[2] / (1 - Math.random() * 0.35),
        ];
        break;

      case 'triad':
        int =
          (Math.round(Math.random()) * 2 - 1) * Math.floor(Math.random() * 20);
        // Random -20 to +20 deg shift from each hue

        accent1 =
          accent1.length > 0 ?
            accent1 :
            [
                primary[0] + 120 + int < 360 ?
                  primary[0] + 120 + int :
                  primary[0] + 120 + int - 360,
                primary[1] > 50 ?
                  primary[1] * (1 - Math.random() * 0.1) :
                  primary[1] / (1 - Math.random() * 0.1),
                primary[2] > 50 ?
                  primary[2] * (0.6 - Math.random() * 0.2) :
                  primary[2] / (0.6 - Math.random() * 0.2),
            ];
        accent2 = [
          primary[0] - 120 - int > 0 ?
            primary[0] - 120 - int :
            primary[0] - 120 - int + 360,
          primary[1] > 50 ?
            primary[1] * (1 - Math.random() * 0.15) :
            primary[1] / (1 - Math.random() * 0.1),
          primary[2] > 50 ?
            primary[2] * (1 - Math.random() * 0.25) :
            primary[2] / (1 - Math.random() * 0.25),
        ];
        break;

      case 'square':
        int =
          (Math.round(Math.random()) * 2 - 1) * Math.floor(Math.random() * 20);
        // Random -20 to +20 deg shift from each hue

        accent1 =
          accent1.length > 0 ?
            accent1 :
            [
                primary[0] + 90 + int < 360 ?
                  primary[0] + 90 + int :
                  primary[0] + 90 + int - 360,
                primary[1] > 50 ?
                  primary[1] * (1 - Math.random() * 0.25) :
                  primary[1] / (1 - Math.random() * 0.25),
                primary[2] > 50 ?
                  primary[2] * (1 - Math.random() * 0.3) :
                  primary[2] / (1 - Math.random() * 0.3),
            ];
        accent2 = [
          primary[0] - 90 - int > 0 ?
            primary[0] - 90 - int :
            primary[0] - 90 - int + 360,
          primary[1] > 50 ?
            primary[1] * (1 - Math.random() * 0.25) :
            primary[1] / (1 - Math.random() * 0.25),
          primary[2] > 50 ?
            primary[2] * (1 - Math.random() * 0.3) :
            primary[2] / (1 - Math.random() * 0.3),
        ];
        break;

      default:
        return null;
    }

    // Round the hsl values and make sure random s and l numbers are valid:
    const round = (array) =>
      array.map((num, i) => {
        num =
          i === 1 && num > 100 ?
            100 : // Limit saturation to 100%
            i === 2 && num > 100 ?
            95 :
            num; // Limit lightness to 95% (otherwise too close to white)
        return Math.round(num * 100) / 100;
      });
    accent1 = round(accent1);
    accent2 = round(accent2);

    // 4. Add the neutral colours that are derived from the primary colour:

    white =
      white.length > 0 ?
        white :
        [
          primary[0],
          Math.round(Math.random() * 15),
          100 - Math.round(Math.random() * 3),
        ];

    light =
      light.length > 0 ?
        light :
        [
          primary[0],
          Math.floor(Math.random() * (8 - 2 + 1)) + 2,
          Math.floor(Math.random() * (97 - 93 + 1)) + 93,
        ];

    dark =
      dark.length > 0 ?
        dark :
        [
          primary[0],
          Math.floor(Math.random() * (25 - 2 + 1)) + 2,
          Math.floor(Math.random() * (20 - 2 + 1)) + 2,
        ];

    // 5. If the generated colour palette matches the contrast requirements,
    // set it as the new colour scheme;
    // otherwise, return false (then the function is called again in Generator):

    const test = validateScheme(
        primary,
        accent1,
        accent2,
        white,
        light,
        dark,
        userColours,
    );

    resolve(test);
  });
}

// Check the contrast ratio of two colours
// based on the WCAG formula (https://www.w3.org/TR/WCAG21/#dfn-relative-luminance):

function checkContrast(colour1, colour2) {
  const col1 = hexToRgb(hslToHex(colour1));
  const col2 = hexToRgb(hslToHex(colour2));

  const luminance = (col) => {
    col = col.map((val) => {
      val /= 255;
      return val <= 0.03928 ?
        val / 12.92 :
        Math.pow((val + 0.055) / 1.055, 2.4);
    });

    return col[0] * 0.2126 + col[1] * 0.7152 + col[2] * 0.0722;
  };

  const lum1 = luminance(col1);
  const lum2 = luminance(col2);

  return (
    (Math.min(lum1, lum2) + 0.05) /
    (Math.max(lum1, lum2) + 0.05)
  ).toFixed(5);
}

// Check if all colours in the palette have enough contrast between each other:

function validateScheme(p, a1, a2, w, l, d, userColours) {
  let core = [p, a1, a2];
  const neutrals = [w, l, d];

  // 1. Check contrast between the neutral colours:

  if (checkContrast(w, d) > 1 / 7) {
    // (has to match 7.0 : 1 ratio or higher)
    return false; // Not enough contrast between white and dark
  } else {
    if (checkContrast(w, l) > 1 / 4.5 && checkContrast(d, l) > 1 / 4.5) {
      return false; // Not enough contrast between light-grey and white and dark
    }
  }

  // 2. Check that core colours (primary, accent1 and accent2)
  // are different enough in either contrast or hue
  // (doesn't have to match the 4.5 : 1 ratio,
  // since they are not used in text/background pairs):

  const check = (c1, c2) => {
    return (
      checkContrast(c1, c2) <= 1 / 1.8 ||
      (Math.abs(c1[0] - c2[0]) >= 35 && Math.abs(c1[0] - c2[0]) <= 325)
    );
  };

  if (!check(p, a1) && !check(p, a2)) {
    // Both accent colours are too close to primary
    return false;
  } else if (check(p, a1) && !check(p, a2)) {
    // Accent2 is too close to primary
    core.splice(2, 1); // Remove accent2 from the palette and only use accent1
  } else if (!check(p, a1) && check(p, a2)) {
    // Accent1 is too close to primary
    if (!userColours.some((val) => val.every((num, i) => num === a1[i]))) {
      // If accent1 was not set by the user, remove it and only use accent2
      core.splice(1, 1);
    }
    // If accent1 was set by the user, let them get away with it.
  } else {
    // Both accent colours have enough contrast with primary
    if (!check(a1, a2)) {
      // Accent1 is too close to accent2
      if (userColours.some((val) => val.every((num, i) => num === a1[i]))) {
        // If accent1 was set by the user, leave it and remove accent2
        core.splice(2, 1);
      } else {
        // If accent1 wasn't set by the user, remove a random accent colour
        core.splice(Math.round(Math.random() + 1), 1);
      }
    }
  }

  // 3. Check contrast between the neutral colours and the core colours
  // (has to match 4.5 : 1 ratio or higher):

  core = core.map((col) => {
    const colourObj = {
      colour: col,
      pairs: [],
    };

    neutrals.forEach((neut, i) => {
      i !== 1 &&
        checkContrast(col, neut) < 1 / 4.5 &&
        // Add white and dark if they meet contrast requirements
        colourObj.pairs.push(neut);
    });

    return colourObj;
  });

  if (
    !core.every((colourObj, i) => {
      if (colourObj.pairs.length > 0) {
        return true;
      } else {
        if (i === 2) {
          core.splice(2, 1);
          return true;
        } else {
          return false;
        }
      }
    })
  ) {
    // If any of the core colours don't meet contrast requirements,
    // the whole scheme is not validated
    return false;
  } else {
    // If all tests are passed, return the colour palette with updates (if any)
    return {
      primary: core[0],
      accent1: core[1],
      accent2: core[2] ? core[2] : {colour: [], pairs: []},
      white: neutrals[0],
      light: neutrals[1],
      dark: neutrals[2],
    };
  }
}

export default generate;
