import React, { Fragment } from 'react';
import { FormControl, InputLabel, Input } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';

// ({ value, onChange, label, className }) =>
export default class TextField2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isDone: false,
      checkboxValue: false
    };
  }

  changeDoneState() {
    if (this.props.value.length > 0) {
      this.setState({
        isDone: !this.state.isDone,
        checkboxValue: !this.state.checkboxValue
      });
    } else {
      this.setState({ checkboxValue: false, isDone: false });
    }
  }

  validInputForDone() {
    if (this.props.value.length > 0) {
      this.setState({ checkboxDisable: false });
    }
  }

  render() {
    let backgroundStyle = this.state.isDone
      ? { backgroundColor: '#8d94b7c4' }
      : { backgroundColor: 'white' };

    return (
      <Fragment>
        <Checkbox
          color="primary"
          checked={this.state.checkboxValue}
          onChange={() => {
            this.changeDoneState();
          }}
        />
        <FormControl className={this.props.className}>
          <InputLabel>{this.props.label}</InputLabel>
          <Input
            value={this.props.value}
            onChange={this.props.onChange}
            style={backgroundStyle}
          />
        </FormControl>
      </Fragment>
    );
  }
}
