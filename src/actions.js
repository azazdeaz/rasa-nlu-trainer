// @flow

export const EDIT = 'EDIT'

export const edit = (index: number, value: Object): Object => ({
  type: EDIT,
  payload: {index, value}
})
