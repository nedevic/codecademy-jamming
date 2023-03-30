import React from "react";

import "./Button.css";

class Button extends React.Component {
  render() {
    return (
      <button className="appButton" {...this.props} />
    );
  }
}

export default Button;
