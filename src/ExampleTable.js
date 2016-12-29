import React, { Component } from 'react';
import { Table } from 'antd'
import { connect } from 'react-redux'

const mapState = (state) => ({
  examples: state.examples.rasa_nlu_data.entity_examples
})

class ExampleTable extends Component {
  render() {
    const { examples } = this.props
    const intents = []
    examples.forEach(({intent}) => {
      if (intents.indexOf(intent) === -1) {
        intents.push(intent)
      }
    })

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
        sorter: (a, b) => {
          return a.intent.localeCompare(b.intent)
        },
      }
      { title: 'Action', dataIndex: '', key: 'x', render: () => <a href="#">Delete</a> },
    ]

    return (
      <Table
        columns={columns}
        dataSource={examples}
        pagination={{showSizeChanger: true, pageSizeOptions: ['10', '20', '40', '80', '160', '320']}}
        expandedRowRender={example => <div />}
      />
    );
  }
}

export default connect(mapState)(ExampleTable)
