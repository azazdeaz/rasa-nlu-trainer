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
  EXPAND,
  COLLAPSE,
} from './actions'

const INITIAL_STATE = {
  filename: 'testData.json',
  examples: IS_DEMO ? testData : null,
  isUnsaved: false,
  selection: null,
  expandeds: [],
}

export default function reducer (
  state: Object = INITIAL_STATE,
  action: Object
): Object {
  console.log(action)
  const { type, payload } = action

  switch (type) {
    case EDIT: {
      const { index, value } = payload
      state = immutable.set(
        state,
        `examples.rasa_nlu_data.entity_examples.${index}`,
        value,
      )
      return {...state, isUnsaved: true}
    }
    case DELETE_EXAMPLE: {
      const { index } = payload
      const expIndex = state.expandeds.indexOf(index)
      if (expIndex !== -1) {
        state = immutable.del(state, `expandeds.${expIndex}`)
        state.expandeds = state.expandeds.map(i => i > index ? --i : i)
      }
      state = immutable.del(
        state,
        `examples.rasa_nlu_data.entity_examples.${index}`,
      )
      return {...state, isUnsaved: true}
    }
    case SET_SELECTION: {
      const { index, start, end } = payload
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
      const { response: { data, path } } = payload
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
    case EXPAND: {
      if (state.expandeds.indexOf(payload) !== -1) {
        return state
      }
      return immutable.push(state, 'expandeds', payload)
    }
    case COLLAPSE: {
      const expIndex = state.expandeds.indexOf(payload)
      if (expIndex === -1) {
        return state
      }
      return immutable.del(state, `expandeds.${expIndex}`)
    }
    default:
      return state
  }
}
