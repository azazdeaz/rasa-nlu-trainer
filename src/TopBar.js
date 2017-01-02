// @flow

import React, { Component } from 'react';
import { Button } from 'antd'
import { connect } from 'react-redux'
import * as actions from './actions'

const mapState = (state) => ({
  filename: state.filename || 'loading...',
  isUnsaved: state.isUnsaved,
  examples: state.examples,
})

const mapActions = dispatch => ({
  save: (examples) => {
    dispatch(actions.save(examples))
  },
})

class TopBar extends Component {
  render() {
    const { filename, isUnsaved, examples, save } = this.props

    return (
      <div style={{ height: 32, display: 'flex' }}>
        <h3 style={{ marginLeft: 8, marginTop: 5 }}>
          {filename}
        </h3>
        <div style={{flex: 1}} />
        <Button
          style={{ height: 28, marginTop: 2, marginRight: 8 }}
          type={isUnsaved ? 'primary' : 'default'}
          onClick={() => save(examples)}
        >
          Save
        </Button>
      </div>
    )
  }
}

export default connect(mapState, mapActions)(TopBar)
