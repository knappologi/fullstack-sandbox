import React, { Fragment } from 'react';
import { FormControl, InputLabel, Input } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/CheckCircle';

// ({ value, onChange, label, className }) =>
export default class TextField2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isDone: false
    };
  }

  changeDoneState() {
    if (this.props.value.length > 0) {
      this.setState({ isDone: !this.state.isDone });
    }
  }

  render() {
    let backgroundStyle = this.state.isDone
      ? { backgroundColor: '#8d94b7c4' }
      : { backgroundColor: 'white' };

    return (
      <Fragment>
        <FormControl className={this.props.className}>
          <InputLabel>{this.props.label}</InputLabel>
          <Input
            value={this.props.value}
            onChange={this.props.onChange}
            style={backgroundStyle}
          />
        </FormControl>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            this.changeDoneState();
          }}
        >
          <CheckIcon />
        </Button>
      </Fragment>
    );
  }
}
