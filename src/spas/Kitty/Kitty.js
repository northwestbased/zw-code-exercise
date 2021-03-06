import React, { Component } from "react";
import ReactDOM from "react-dom";
import GithubKitty from "./github.svg";

/*
Todo: this component currently throw an error after game completion:

Warning: Can only update a mounted or mounting component. This usually means you called setState, replaceState, or forceUpdate on an unmounted component.

This probably has to do with how I'm animating things, but after doing some Google searching, I'm still not sure how to fix.
*/

class Kitty extends Component {
  constructor() {
    super();

    this.updatePosition = this.updatePosition.bind(this);

    let maxHeight = window.innerHeight - 100;
    let maxWidth = window.innerWidth - 100;

    let angle = Math.random() * 2 * Math.PI;
    let posX = Math.floor(Math.random() * maxWidth);
    let posY = Math.floor(Math.random() * maxHeight);

    this.state = { angle, posX, posY };

    requestAnimationFrame(() => this.updatePosition(new Date().getTime()));
  }

  updatePosition(lastTime) {
    let posX = this.state.posX;
    let posY = this.state.posY;
    let angle = this.state.angle;
    //calculating maxWidth and maxHeight
    //every loop makes the game respond to
    //changing the window size mid-game
    let maxWidth = window.innerWidth - 100;
    let maxHeight = window.innerHeight - 100;

    // check if the kitty has hit an edge. if so, adjust the angle,
    // and reset the kitty's position to still be on screen,
    // just in case.

    // bottom edge
    if (this.state.posY >= maxHeight) {
      angle = 2 * Math.PI - angle;
      posY = maxHeight;
    }
    // right edge
    if (this.state.posX >= maxWidth) {
      angle = 2 * Math.PI - (angle + Math.PI);
      posX = maxWidth;
    }
    // left edge
    if (this.state.posX <= 0) {
      angle = 2 * Math.PI - (angle + Math.PI);
      posX = 0;
    }
    // top edge
    if (this.state.posY <= 0) {
      angle = 2 * Math.PI - angle;
      posY = 0;
    }

    //get the time delta, so that we can move the Kitty
    //the appropriate amount
    let currentTime = Math.round(new Date().getTime());
    let deltaT = lastTime - currentTime;

    //do some trig, and multiply by deltaT to get
    //the new coordinates
    //2 is a magic number to make things slower
    posX += (Math.cos(angle) * deltaT) / 2;
    posY += (Math.sin(angle) * deltaT) / 2;

    this.setState({
      posX,
      posY,
      angle
    });
    requestAnimationFrame(() => this.updatePosition(currentTime));
  }

  render() {
    return (
      <div
        className="kitty"
        onClick={this.props.clickHandler}
        style={{ top: this.state.posY, left: this.state.posX }}
      >
        <GithubKitty />
      </div>
    );
  }
}

export default Kitty;
