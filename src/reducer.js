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
  switch (action.type) {
    case EDIT: {
      const { index, value } = action.payload
      return immutable.set(state, `examples.${index}`, value)
    }
    default:
      return state
  }
}
