// @flow

import React, { Component, PropTypes } from 'react';
import { Input, Button } from 'antd'
import { connect } from 'react-redux'
import * as actions from './actions'
import EntityTable from './EntityTable'

const mapActions = dispatch => ({
  edit: (index, example) => {
    dispatch(actions.edit(index, example))
  },
  deleteExample: (index) => {
    dispatch(actions.deleteExample(index))
  },
})

class ExampleEditor extends Component {
  handleIntentChange(event: Object) {
    const { edit, index, text, entities } = this.props
    const intent = event.target.value

    edit(index, {
      text,
      intent,
      entities,
    })
  }

  render() {
    const { intent, index, deleteExample } = this.props

    return (
      <div>
        <Input
          value={intent}
          onChange={event => this.handleIntentChange(event)}
          placeholder='intent'
          addonBefore='intent'
        />
        <EntityTable index={index} />
        <Button
          onClick={() => deleteExample(index)}
        >Delete example</Button>
      </div>
    )
  }
}

ExampleEditor.propTypes = {
  text: PropTypes.string.isRequired,
  intent: PropTypes.string.isRequired,
  entities: PropTypes.arrayOf(PropTypes.shape({
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    entity: PropTypes.string.isRequired,
  })),
}

export default connect(null, mapActions)(ExampleEditor)
