// @flow

import React, { Component, PropTypes } from 'react';
import { Table } from 'antd'
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
  }
})

class ExampleEditor extends Component {
  handleTextChange(event: Object) {
    const {
      text: oldText,
      entities:
      oldEntities,
      edit,
      index: exampleIndex,
    } = this.props
    const text = event.target.value
    const entities = []

    oldEntities.forEach(oldEntity => {
      const oldSelection = oldText.substr(
        oldEntity.start,
        oldEntity.end - oldEntity.start,
      )

      let newStart = text.indexOf(oldSelection)

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
      intent: this.props.intent,
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
    const { text, entities = [] } = this.props

    return (
      <div style={{position: 'relative', fontSize: 13}}>
        {entities.map((entity, index) => {
          return this.renderEntityHighlight(text, entity, index)
        })}
        <input
          style={{...styles.zeroPos, ...styles.input}}
          onChange={event => this.handleTextChange(event)}
          value={text}
        />
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
