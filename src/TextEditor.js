// @flow

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import getColor from './getColor'
import * as actions from './actions'

const styles = {
  text: {},
  highlightText: {color: 'transparent'},
  zeroPos: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  input: {
    background: 'none',
    border: 'none',
    width: '100%',
  }
}

const mapActions = dispatch => ({
  edit: (index, example) => {
    dispatch(actions.edit(index, example))
  },
  setSelection: (index, start, end) => {
    dispatch(actions.setSelection(index, start, end))
  },
})

class ExampleEditor extends Component {
  selectionAnchorNode: Node;
  inputNode: HTMLInputElement;

  componentDidMount() {
    document.addEventListener('selectionchange', () => {
      const { setSelection, index } = this.props
      const selection = window.getSelection()

      if (selection.anchorNode === this.selectionAnchorNode) {
        setSelection(
          index,
          this.inputNode.selectionStart,
          this.inputNode.selectionEnd,
        )
      }
    }, false)
  }

  handleTextChange(event: Object) {
    const {
      example: oldExample,
      index: exampleIndex,
      edit,
    } = this.props
    const {
      text: oldText,
      entities: oldEntities,
    } = oldExample
    const text = event.target.value
    const entities = []

    oldEntities.forEach(oldEntity => {
      const oldSelection = oldText.substr(
        oldEntity.start,
        oldEntity.end - oldEntity.start,
      )

      function findClosestStart(lastMatch: ?number) {
        if (!lastMatch) {
          const index = text.indexOf(oldSelection)
          if (index === -1) {
            return index
          }
          else {
            return findClosestStart(index)
          }
        }
        else {
          const from = lastMatch + oldSelection.length
          const index = text.indexOf(oldSelection, from)
          if (index === -1) {
            return lastMatch
          }
          const prevDiff = Math.abs(oldEntity.start - lastMatch)
          const nextDiff = Math.abs(oldEntity.start - index)
          if (prevDiff < nextDiff) {
            return lastMatch
          }
          else {
            return findClosestStart(index)
          }
        }
      }
      const start = findClosestStart()
      if (start === -1) {
        return
      }

      entities.push({
        ...oldEntity,
        start: start,
        end: start + oldSelection.length,
      })
    })

    edit(exampleIndex, {
      text,
      intent: oldExample.intent,
      entities,
    })
  }

  renderEntityHighlight(text: string, entity: Object, key: number) {
    const start = text.substr(0, entity.start)
    const value = text.substr(entity.start, entity.end - entity.start)
    const end = text.substr(entity.end)

    return (
      <div key={key} style={styles.zeroPos}>
        <span style={styles.highlightText}>{start}</span>
        <span style={{...styles.highlightText, ...getColor(entity.entity)}}>
          {value}
        </span>
        <span style={styles.highlightText}>{end}</span>
      </div>
    )
  }

  render() {
    const { example } = this.props
    const { text, entities = [] } = example

    return (
      <div>
        <div
          style={{position: 'relative'}}
          ref={node => this.selectionAnchorNode = node}
        >
          {entities.map((entity, index) => {
            return this.renderEntityHighlight(text, entity, index)
          })}
          <input
            ref={node => this.inputNode = node}
            style={{...styles.zeroPos, ...styles.input}}
            onChange={event => this.handleTextChange(event)}
            value={text}
          />
        </div>
      </div>
    )
  }
}

ExampleEditor.propTypes = {
  example: PropTypes.shape({
    text: PropTypes.string.isRequired,
    entities: PropTypes.arrayOf(PropTypes.shape({
      start: PropTypes.number.isRequired,
      end: PropTypes.number.isRequired,
      value: PropTypes.string.isRequired,
      entity: PropTypes.string.isRequired,
    })),
  })
}

export default connect(null, mapActions)(ExampleEditor)
