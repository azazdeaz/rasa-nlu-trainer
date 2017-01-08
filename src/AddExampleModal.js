// @flow

import React, { Component } from 'react';
import { Modal } from 'antd'
import { connect } from 'react-redux'
import EntityTable from './EntityTable'
import TextEditor from './TextEditor'
import IntentEditor from './IntentEditor'
import * as actions from './actions'

const mapState = (state) => ({
  index: state.idxExampleInModal,
  example: state.examples
    && state.examples.rasa_nlu_data
    && state.examples.rasa_nlu_data.common_examples
    && state.examples.rasa_nlu_data.common_examples[state.idxExampleInModal]
})

const mapActions = dispatch => ({
  close: () => {
    dispatch(actions.closeAddModal())
  },
  saveAndClose: () => {
    dispatch(actions.saveAndCloseAddModal())
  },
})

class ExampleTable extends Component {
  render() {
    const {
      example,
      index,
      intents,
      close,
      saveAndClose,
      entityNames,
    } = this.props

    return (
      <Modal
        title='Add example'
        visible={Boolean(example)}
        onOk={() => saveAndClose()}
        onClose={() => close()}
        okText='add'
      >
        {example
          ? (
            <div>
              <TextEditor
                example={example}
                index={index}
                entityNames={entityNames}
                style={{marginBottom: 5}}
              />
              <IntentEditor
                example={example}
                index={index}
                intents={intents}
                style={{marginBottom: 5}}
              />
              <EntityTable
                index={index}
                entityNames={entityNames}
              />
            </div>
          )
          : null
        }
      </Modal>
    )
  }
}

export default connect(mapState, mapActions)(ExampleTable)
