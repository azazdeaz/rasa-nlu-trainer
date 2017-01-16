// @flow
import immutable from 'object-path-immutable'
import testData from './testData.json'
import isOnline from './isOnline'

import {
  EDIT,
  DELETE_EXAMPLE,
  SET_SELECTION,
  FETCH_DATA,
  SAVING_DONE,
  EXPAND,
  COLLAPSE,
  OPEN_ADD_MODAL,
  CLOSE_ADD_MODAL,
  SAVE_AND_CLOSE_ADD_MODAL,
} from './actions'

const INITIAL_STATE = {
  filename: 'testData.json',
  examples: isOnline ? testData : null,
  isUnsaved: false,
  selection: null,
  expandeds: [],
  idxExampleInModal: null,
}

export default function reducer (
  state: Object = INITIAL_STATE,
  action: Object
): Object {
  const { type, payload } = action

  switch (type) {
    case EDIT: {
      const { index, value } = payload
      state = immutable.set(
        state,
        `examples.rasa_nlu_data.common_examples.${index}`,
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
        `examples.rasa_nlu_data.common_examples.${index}`,
      )
      return {...state, isUnsaved: true}
    }
    case SET_SELECTION: {
      const { index, start, end } = payload
      if (start === end) {
        return state
      }
      return immutable.set(state, `selection`, { index, start, end })
    }
    case FETCH_DATA: {
      const { data, path } = payload
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

    case OPEN_ADD_MODAL: {
      state = immutable.push(
        state,
        `examples.rasa_nlu_data.common_examples`,
        {text: '', intent: '', entities: []},
      )
      const index = state.examples.rasa_nlu_data.common_examples.length - 1
      return immutable.set(state, `idxExampleInModal`, index)
    }
    case CLOSE_ADD_MODAL: {
      state = immutable.del(
        state,
        `examples.rasa_nlu_data.common_examples.${state.idxExampleInModal}`,
      )
      return immutable.set(state, `idxExampleInModal`, null)
    }
    case SAVE_AND_CLOSE_ADD_MODAL: {
      return immutable.set(state, `idxExampleInModal`, null)
    }
    default:
      return state
  }
}
