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
  openAddModal: () => {
    dispatch(actions.openAddModal())
  },
})

const styles = {
  button: {
    height: 28,
    marginTop: 2,
    marginRight: 8,
  }
}

class TopBar extends Component {
  render() {
    const { filename, isUnsaved, examples, save, openAddModal } = this.props

    return (
      <div style={{ height: 32, display: 'flex' }}>
        <h3 style={{ marginLeft: 8, marginTop: 5 }}>
          {filename}
        </h3>
        <div style={{flex: 1}} />
        <Button
          style={styles.button}
          type='primary'
          onClick={() => openAddModal()}
        >
          Add new example
        </Button>
        <Button
          style={styles.button}
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
