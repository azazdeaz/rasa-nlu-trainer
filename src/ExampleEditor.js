// @flow

import React, { Component, PropTypes } from 'react';
import { Button } from 'antd'
import { connect } from 'react-redux'
import * as actions from './actions'
import EntityTable from './EntityTable'

const mapActions = dispatch => ({
  deleteExample: (index) => {
    dispatch(actions.deleteExample(index))
  },
})

class ExampleEditor extends Component {
  render() {
    const { index, deleteExample, entityNames } = this.props

    return (
      <div>
        <EntityTable index={index} entityNames={entityNames} />
        <Button
          style={{ float: 'right' }}
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
