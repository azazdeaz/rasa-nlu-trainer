// @flow
 import immutable from 'object-path-immutable'
import testData from './testData.json'

import { EDIT } from './actions'

const INITIAL_STATE = {
  filename: 'testData.json',
  examples: testData,
  isUnsaved: false,
}

export default function (
  state: Object = INITIAL_STATE,
  action: Object
): Object {
  console.log(action)
  switch (action.type) {
    case EDIT: {
      const { index, value } = action.payload
      return immutable.set(state, `examples.rasa_nlu_data.entity_examples.${index}`, value)
    }
    default:
      return state
  }
}
