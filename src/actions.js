// @flow
import config from '../config'

export const EDIT = 'EDIT'
export const edit = (index: number, value: Object): Object => ({
  type: EDIT,
  payload: {index, value}
})

export const DELETE_EXAMPLE = 'DELETE_EXAMPLE'
export const deleteExample = (index: number): Object => ({
  type: DELETE_EXAMPLE,
  payload: {index}
})

export const SET_SELECTION = 'SET_SELECTION'
export const setSelection = (
  index: number,
  start: number,
  end: number,
): Object => ({
  type: SET_SELECTION,
  payload: {index, start, end}
})

export const FETCH_DATA = 'FETCH_DATA'
export const loadData = () => async (dispatch: Function): void => {
  const response: Object = await fetch(`http://localhost:${config.port}/data`, {
    method: 'POST',
  })
  const json = await response.json()
  dispatch({
    type: FETCH_DATA,
    payload: {
      response: json,
    }
  })
}
