# Paintr

A web app that generates colour schemes for websites, applies them to a demo website, and provides CSS code for your chosen colour scheme.
Built with React, [Create React App](https://github.com/facebook/create-react-app), [color-name-list](https://github.com/meodai/color-names) library, JavaScript and CSS.

## About

This web app is for everyone who wants to design a website without having to fiddle with a colour wheel or figure out how to apply a palette to their design. It generates simple palettes that are geared towards website design and contains a demo page that shows which colour goes where.

## Installation and Setup Instructions

Clone this repository and make sure you have node and npm installed globally.

Installation: `npm install`

To Start Server: `npm start`

To Visit App: open `localhost:3000/` in your browser.

## Features

### Colour scheme generation

The app creates colour schemes based on the common colour palette methods: monochrome, analogue, complementary, split-complementary, triadic, square. Colour combinations are checked for contrast to meet the minimum WCAG requirement of 1 : 4.5 contrast ratio between background and foreground.

:eyes: See [Generator.js](https://github.com/dariatsvetkova/paintr/blob/main/src/Components/Generator.js) and [generate.js](https://github.com/dariatsvetkova/paintr/blob/main/src/Components/generate.js)

### Adding up to two custom colours

Users can add one or two colours that they want to use in the scheme, by providing hex values or colour names.

### Shuffling colours within one scheme

Once the scheme is generated, users can shuffle the colours between different elements of the demo website.

### Navigating back and forward

All schemes are saved into session storage, allowing users to switch back and forth between them

### Copying the colour scheme

The app provides two ways to copy the chosen colour scheme: by hex value and as CSS code. For simplicity, the CSS styling is applied to common html elements.
