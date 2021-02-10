import React from "react";
import "../App.css";
import generate from "./generate";
// import hexToRgb from './hexToRgb';
import hslToHex from "./hslToHex";
import hexToHsl from "./hexToHsl";
import UserColour from "./UserColour";
import ColourForm from "./ColourForm";
import Palette from "./Palette";
import {
  IoShuffle,
  IoReturnDownBack,
  IoReturnUpForward,
  IoCopyOutline,
} from "react-icons/io5";
import Mockup from "./Mockup";

class Generator extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      userColours: [],
      primary: {},
      accent1: {},
      accent2: {},
      white: [],
      light: [],
      dark: [],
    };
    this.handleGenerateClick = this.handleGenerateClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  // Input handlers:

  handleGenerateClick() {
    this.setState(
      {
        isLoading: true,
        // ,
        // primary: {},
        // accent1: {},
        // accent2: {},
        // white: [],
        // light: [],
        // dark: [],
      },
      () => {
        let promise = generate(this.state.userColours);

        promise.then(
          (result) => {
            console.log("promise result: ", result);
            return result
              ? this.setState(
                  {
                    primary: result.primary,
                    accent1: result.accent1,
                    accent2: result.accent2,
                    white: result.white,
                    light: result.light,
                    dark: result.dark,
                  },
                  () =>
                    setTimeout(() => this.setState({ isLoading: false }), 3000)
                )
              : this.handleGenerateClick();
          },
          (error) => console.log("error in generate(): ", error)
        );
      }
    );
  }

  handleSubmit(event, input) {
    event.preventDefault();
    let val = input,
      cols = this.state.userColours;

    try {
      if (val.match(/^#[0-9A-F]{3}$/)) {
        val = val[0] + val[1] + val[1] + val[2] + val[2] + val[3] + val[3]; // Convert #rgb values to #rrggbb values
      }
      if (val.match(/^#[0-9A-F]{6}$/)) {
        val = hexToHsl(val);
        !cols.some((col) => col.every((num, i) => num === val[i])) &&
          cols.push(val); // If the colour hasn't been added yet, add it to userColours
        this.setState({ userColours: cols });
      }
    } catch (error) {
      console.log(error);
    }
  }

  handleRemove(ind) {
    let newCols = this.state.userColours;
    newCols.splice(ind, 1);
    return this.setState({ userColours: newCols });
  }

  render() {
    const colourSet = {
      primary: [],
      accent1: [],
      accent2: [],
      white: "",
      light: "",
      dark: "",
    };

    for (let key in colourSet) {
      if (Object.prototype.hasOwnProperty.call(colourSet, key)) {
        colourSet[key] =
          (key === "primary" || key === "accent1" || key === "accent2") &&
          this.state[key].colour
            ? [
                hslToHex(this.state[key].colour),
                hslToHex(this.state[key].foregrds[0]),
              ]
            : this.state[key].length > 0
            ? hslToHex(this.state[key])
            : [];
      }
    }

    console.log("colourSet: ", colourSet);

    const UserColours = this.state.userColours.map((col, i) => {
      return (
        <UserColour
          colour={col}
          key={i}
          ind={i}
          handleRemove={this.handleRemove}
        />
      );
    });

    return (
      <section id="generate" className="generator">
        <div className="controls">
          <button className="large-button" onClick={this.handleGenerateClick}>
            Generate
          </button>

          <div className="user-colours">
            {UserColours}

            {this.state.userColours.length <= 1 && (
              <ColourForm handleSubmit={this.handleSubmit} />
            )}
          </div>

          {this.state.primary.colour && <Palette colourSet={colourSet} />}

          <div className="buttons">
            <button onClick={this.mixup}>
              <IoShuffle />
            </button>
            <button onClick={this.back}>
              <IoReturnDownBack />
            </button>
            <button onClick={this.forward}>
              <IoReturnUpForward />
            </button>
            <button onClick={this.copy}>
              <IoCopyOutline />
            </button>
          </div>
        </div>

        <Mockup colourSet={colourSet} isLoading={this.state.isLoading} />
      </section>
    );
  }
}

export default Generator;
