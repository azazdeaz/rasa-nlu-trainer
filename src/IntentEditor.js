// @flow

import React, { Component } from 'react';
import { AutoComplete } from 'antd'
import { connect } from 'react-redux'
import * as actions from './actions'

const mapActions = dispatch => ({
  edit: (index, example) => {
    dispatch(actions.edit(index, example))
  },
})

class IntentEditor extends Component {
  handleIntentChange(intent: string) {
    const { example, edit, index } = this.props

    edit(index, {
      text: example.text,
      intent,
      entities: example.entities,
    })
  }

  render() {
    const { example, intents, style } = this.props

    return (
      <AutoComplete
        dataSource={intents}
        style={{ width: 230, ...style }}
        value={example.intent}
        onSelect={value => this.handleIntentChange(value)}
        onChange={value => this.handleIntentChange(value)}
        placeholder='intent'
      />
    )
  }
}

export default connect(null, mapActions)(IntentEditor)
