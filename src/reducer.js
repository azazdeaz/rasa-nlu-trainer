// @flow
import immutable from 'object-path-immutable'
import testData from './testData.json'

const IS_DEMO = location.origin.indexOf('github.io') !== -1

import {
  EDIT,
  DELETE_EXAMPLE,
  SET_SELECTION,
  FETCH_DATA,
} from './actions'

const INITIAL_STATE = {
  filename: 'testData.json',
  examples: IS_DEMO ? testData : null,
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
    case DELETE_EXAMPLE: {
      const { index } = action.payload
      return immutable.del(
        state,
        `examples.rasa_nlu_data.entity_examples.${index}`,
      )
    }
    case SET_SELECTION: {
      const { index, start, end } = action.payload
      if (start === end) {
        return state
      }
      return immutable.set(state, `selection`, { index, start, end })
    }
    case FETCH_DATA: {
      if (IS_DEMO) {
        return state
      }
      const { response: { data, path } } = action.payload
      return {
        ...state,
        examples: data,
        filename: path,
      }
    }
    default:
      return state
  }
}
