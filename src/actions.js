// @flow

export const EDIT = 'EDIT'
export const edit = (index: number, value: Object): Object => ({
  type: EDIT,
  payload: {index, value}
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
