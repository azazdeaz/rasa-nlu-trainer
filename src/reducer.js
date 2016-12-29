// @flow
 import immutable from 'object-path-immutable'
import testData from './testData.json'

import { EDIT, SET_SELECTION } from './actions'

const INITIAL_STATE = {
  filename: 'testData.json',
  examples: testData,
  isUnsaved: false,
  selection: null
}

export default function (
  state: Object = INITIAL_STATE,
  action: Object
): Object {
  console.log(action)
  switch (action.type) {
    case EDIT: {
      const { index, value } = action.payload
      return immutable.set(
        state,
        `examples.rasa_nlu_data.entity_examples.${index}`,
        value,
      )
    }
    case SET_SELECTION: {
      const { index, start, end } = action.payload
      if (start === end) {
        return state
      }
      return immutable.set(state, `selection`, { index, start, end })
    }
    default:
      return state
  }
}
