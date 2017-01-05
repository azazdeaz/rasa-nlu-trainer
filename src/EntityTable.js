// @flow

import React, { Component } from 'react';
import { Table, Input, Button, Icon, AutoComplete } from 'antd'
import { connect } from 'react-redux'
import * as actions from './actions'
import immutable from 'object-path-immutable'

const mapState = (state, props) => {
  const { index } = props
  const example = state.examples.rasa_nlu_data.entity_examples[index]
  const selection = state.selection && state.selection.index === index
    ? state.selection
    : null
  return {
    example,
    selection,
  }
}

const mapActions = dispatch => ({
  edit: (index, example) => {
    dispatch(actions.edit(index, example))
  }
})

class EntityTable extends Component {
  handleChange(entityIndex, key, value) {
    const { example, index, edit } = this.props
    edit(index, immutable.set(example, `entities.${entityIndex}.${key}`, value))
  }
  renderAddButton() {
    const { index, edit, example, selection } = this.props
    const selectionText = selection
      ? example.text.substr(selection.start, selection.end - selection.start)
      : null

    return selectionText
      ? (
        <Button
          type='primary'
          onClick={() => {
            edit(
              index,
              immutable.push(example, `entities`, {
                start: selection.start,
                end: selection.end,
                value: selectionText,
                entity: '',
              }))
          }}
        >
          {`add an entity for "${selectionText}"`}
        </Button>
      )
      : (
        <Button disabled={true}>
          'select some part of the text to create a new entity'
        </Button>
      )
  }
  render() {
    const { example, edit, index, entityNames } = this.props
    const entities = example.entities || []

    const columns = [
      {
        title: 'Entity',
        dataIndex: 'entity',
        key: 'entity',
        render: (_, entity) => (
          <AutoComplete
            style={{width:200}}
            dataSource={entityNames}
            value={entity.entity}
            onChange={value => this.handleChange(
              entity.index,
              'entity',
              value,
            )}
            placeholder='entity'
          />
        ),
      }, {
        title: 'Value',
        dataIndex: 'value',
        key: 'value',
        render: (_, entity) => (
          <Input
            value={entity.value}
            onChange={event => this.handleChange(
              entity.index,
              'value',
              event.target.value,
            )}
            placeholder='value'
          />
        ),
      }, {
        title: 'Selection',
        key: 'selection',
        render: (_, entity) => (
          <span>
            {example.text.substr(entity.start, entity.end - entity.start)}
          </span>
        ),
      }, {
        title: '',
        key: 'actions',
        render: (_, entity) => (
          <span>
            <Icon type='delete' onClick={() => {
              edit(index, immutable.del(example, `entities.${entity.index}`))
            }}/>
          </span>
        ),
      },
    ]

    return (
      <div style={{marginBottom: 5}}>
        <Table
          style={{marginBottom: 8}}
          size='small'
          pagination={false}
          columns={columns}
          dataSource={entities.map((entity, index) => ({
            ...entity,
            index,
          }))}
          rowKey='index'
        />
        {this.renderAddButton()}
      </div>
    );
  }
}

export default connect(mapState, mapActions)(EntityTable)
