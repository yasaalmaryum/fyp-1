import React, { Component } from 'react';

class CheckBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summer: false,
      spring: false,
      winter: false,
      trigger: false,
    };
    this.triggetNext = this.triggetNext.bind(this);
  }

  onChange = (checkedState) => (event) => {
    this.setState((initialState) => ({
      [checkedState]: !this.state[checkedState],
    }));
  };

  onSubmit = async (e) => {
    e.preventDefault();
    let checkArray = [];
    for (var key in this.state) {
      if (this.state[key] === true) {
        checkArray.push(key);
      }
    }
    let checkData = {
      checkbox: checkArray.toString(),
    };

    console.log(checkData);
    this.triggetNext();
  };

  triggetNext() {
    this.setState({ trigger: true }, () => {
      this.props.triggerNextStep();
    });
  }

  render() {
    return (
      <div style={{ backgroundColor: "#D7FFCC" }}>
        <form onSubmit={this.onSubmit}>
          <div className="form-check">
            <input
              type="checkbox"
              onChange={this.onChange('summer')}
              className="form-check-input"
            />
            Summer
          </div>

          <div className="form-check">
            <input
              type="checkbox"
              onChange={this.onChange('winter')}
              className="form-check-input"
            />
            Winter
          </div>

          <div className="form-check">
            <input
              type="checkbox"
              onChange={this.onChange('spring')}
              className="form-check-input"
            />
            Spring
          </div>

          <div className="form-group">
            <button className="btn btn-success">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default CheckBox;
