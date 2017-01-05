// @flow

import React, { Component } from 'react';
import { Table, Input, Button } from 'antd'
import { connect } from 'react-redux'
import ExampleEditor from './ExampleEditor'
import TextEditor from './TextEditor'
import IntentEditor from './IntentEditor'
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
  state: Object;
  constructor(props) {
    super(props)

    this.state = {
      filterDropdownVisible: false,
      searchText: '',
    }
  }
  render() {
    const {
      examples,
      expandeds,
      expand,
      collapse,
      intents,
      entityNames,
    } = this.props
    const { searchText, filterDropdownVisible } = this.state
console.log('render', searchText)
    const columns = [
      {
        title: 'Intent',
        dataIndex: 'intent',
        key: 'intent',
        filters: intents.map(intent => ({
          text: intent,
          value: intent,
        })),
        render: (_, example) => (
          <IntentEditor
            example={example}
            index={example.index}
            intents={intents}
          />
        ),
        onFilter: (value, example) => example.intent === value,
        sorter: (a, b) => {
          return a.intent.localeCompare(b.intent)
        },
        width: '30%',
      }, {
        title: 'Text',
        dataIndex: 'text',
        key: 'text',
        render: (_, example) => (
          <TextEditor
            example={example}
            index={example.index}
          />
        ),
        sorter: (a, b) => {
          return a.intent.localeCompare(b.intent)
        },
        filteredValue: searchText ? [searchText] : null,
        onFilter: (value, example) => (
          !value
          || example.text.indexOf(value) !== -1
        ),
        filterDropdown: (
          <div className='custom-filter-dropdown'>
            <Input
              placeholder='search in texts'
              value={searchText}
              onChange={event => this.setState({
                searchText: event.target.value
              })}
            />
          </div>
        ),
        filterDropdownVisible,
        onFilterDropdownVisibleChange: visible => this.setState({
          filterDropdownVisible: visible
        }),
        width: '70%',
      },
    ]

    return (
      <Table
        columns={columns}
        dataSource={examples.map((example, index) => ({...example, index}))}
        rowKey='index'
        size='middle'
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
          defaultPageSize: 40,
        }}
        expandedRowRender={(example) => (
          <ExampleEditor {...example} entityNames={entityNames}/>
        )}
      />
    )
  }
}

export default connect(mapState, mapActions)(ExampleTable)
