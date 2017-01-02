// @flow
import immutable from 'object-path-immutable'
import testData from './testData.json'

const IS_DEMO = location.origin.indexOf('github.io') !== -1

import {
  EDIT,
  DELETE_EXAMPLE,
  SET_SELECTION,
  FETCH_DATA,
  SAVING_DONE,
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
      state = immutable.set(
        state,
        `examples.rasa_nlu_data.entity_examples.${index}`,
        value,
      )
      return {...state, isUnsaved: true}
    }
    case DELETE_EXAMPLE: {
      const { index } = action.payload
      state = immutable.del(
        state,
        `examples.rasa_nlu_data.entity_examples.${index}`,
      )
      return {...state, isUnsaved: true}
    }
    case SET_SELECTION: {
      const { index, start, end } = action.payload
      if (start === end) {
        return state
      }
      state = immutable.set(state, `selection`, { index, start, end })
      return {...state, isUnsaved: true}
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
    case SAVING_DONE: {
      return {
        ...state,
        isUnsaved: false,
      }
    }
    default:
      return state
  }
}
