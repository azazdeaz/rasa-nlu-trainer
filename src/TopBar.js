// @flow

import React, { Component } from 'react';
import { Button, Icon } from 'antd'
import { connect } from 'react-redux'
import * as actions from './actions'
import isOnline from './isOnline'
import FileReaderInput from 'react-file-reader-input'
import { saveAs } from 'file-saver'

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
  fetchData: (path, data) => {
    dispatch(actions.fetchData(path, data))
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
  handleFileInputChange(_, results) {
    const [e, file] = results[0]
    let data
    try {
      data = JSON.parse(e.target.result)
    }
    catch (e) {
      return alert('Can\'t JSON parse the selected file :(')
    }
    if (!data.rasa_nlu_data || !data.rasa_nlu_data.common_examples) {
      return alert(`Invalid JSON structure. It has to be like: {rasa_nlu_data: {common_examples: []}}`)
    }
    this.props.fetchData(file.name, data)
  }
  render() {
    const { filename, isUnsaved, examples, save, openAddModal } = this.props

    const fileButtons = isOnline
      ? (
        <div style={{display: 'flex'}}>
          <FileReaderInput
            as='text'
            onChange={(e, results) => this.handleFileInputChange(e, results)}
            >
            <Button type='ghost' style={styles.button}>
              <Icon type='upload' /> Click to Upload
            </Button>
          </FileReaderInput>
          <Button
            type={isUnsaved ? 'primary' : 'ghost'}
            style={styles.button}
            onClick={() => {
              var blob = new Blob(
                [ JSON.stringify(examples, null, 2) ],
                { type: "application/json;charset=utf-8" },
              )
              saveAs(blob, filename)
            }}
          >
            <Icon type='download' /> Download
          </Button>
        </div>
      )
      : (
        <Button
          style={styles.button}
          type={isUnsaved ? 'primary' : 'default'}
          onClick={() => save(examples)}
        >
          Save
        </Button>
      )

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
        {fileButtons}
      </div>
    )
  }
}

export default connect(mapState, mapActions)(TopBar)
