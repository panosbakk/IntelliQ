import React, { Component } from "react";
import { Link } from "react-router-dom";

class SurveyListComponent extends Component {
  render() {
    const key = this.props.num + 1;
    const json = this.props.json;

    return (
      <>
        <h2>
          <Link to={{ pathname: "/survey/" + key, state: { json } }}>
            Item {key}
          </Link>
        </h2>
      </>
    );
  }
}

export default SurveyListComponent;
