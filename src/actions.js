// @flow

export const EDIT = 'EDIT'

export const edit = (index, value) => ({
  type: EDIT,
  payload: {index, edit}
})
