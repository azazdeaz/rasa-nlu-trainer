// @flow

import React, { Component } from 'react';
import { Table, Spin } from 'antd'
import { connect } from 'react-redux'
import ExampleEditor from './ExampleEditor'
import TextEditor from './TextEditor'
import * as actions from './actions'

const mapState = (state) => ({
  expandeds: state.expandeds,
  examples: state.examples
    && state.examples.rasa_nlu_data
    && state.examples.rasa_nlu_data.entity_examples
})

const mapActions = dispatch => ({
  expand: (index) => {
    dispatch(actions.expand(index))
  },
  collapse: (index) => {
    dispatch(actions.collapse(index))
  },
})

class ExampleTable extends Component {
  render() {
    const { examples, expandeds, expand, collapse } = this.props

    if (!examples) {
      return <Spin style={{ width: '100%', height: '100%' }}>
        <div />
      </Spin>
    }

    const intents = []
    examples.forEach(({intent}) => {
      if (intent && intents.indexOf(intent) === -1) {
        intents.push(intent)
      }
    })
    console.log(intents)

    const columns = [
      {
        title: 'Intent',
        dataIndex: 'intent',
        key: 'intent',
        filters: intents.map(intent => ({
          text: intent,
          value: intent,
        })),
        onFilter: (value, example) => example.intent === value,
        sorter: (a, b) => {
          return a.intent.localeCompare(b.intent)
        },
      }, {
        title: 'Text',
        dataIndex: 'text',
        key: 'text',
        render: (_, example) => (
          <TextEditor example={example} index={example.index}/>
        ),
        sorter: (a, b) => {
          return a.intent.localeCompare(b.intent)
        },
      },
    ]

    return (
      <Table
        columns={columns}
        dataSource={examples.map((example, index) => ({...example, index}))}
        rowKey='index'
        expandedRowKeys={expandeds}
        onExpand={(expanded, example) => {
          if (expanded) {
            expand(example.index)
          }
          else {
            collapse(example.index)
          }
        }}
        pagination={{
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '40', '80', '160', '320'],
        }}
        expandedRowRender={(example) => <ExampleEditor {...example} />}
      />
    )
  }
}

export default connect(mapState, mapActions)(ExampleTable)
