// @flow
const ROOT_PATH = process.env.NODE_ENV === 'production'
  ? '/'
  : 'http://localhost:4321/'

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
export const loadData = () => async (dispatch: Function): Promise<void> => {
  const response: Object = await fetch(`${ROOT_PATH}data`, {
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

export const SAVING_DONE = 'SAVING_DONE'
export const save = (data: Object): Function =>  async (
  dispatch: Function
): Promise<void> => {
  const response = await fetch(`${ROOT_PATH}save`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  //TODO add progressing feedback
  const json = await response.json()
  if (json.ok) {
    dispatch({
      type: SAVING_DONE,
    })
  }
}

export const EXPAND = 'EXPAND'
export const expand = (index: number): Object => ({
  type: EXPAND,
  payload: index
})

export const COLLAPSE = 'COLLAPSE'
export const collapse = (index: number): Object => ({
  type: COLLAPSE,
  payload: index
})

export const OPEN_ADD_MODAL = 'OPEN_ADD_MODAL'
export const openAddModal = (): Object => ({
  type: OPEN_ADD_MODAL,
})
export const CLOSE_ADD_MODAL = 'CLOSE_ADD_MODAL'
export const closeAddModal = (): Object => ({
  type: CLOSE_ADD_MODAL,
})
export const SAVE_AND_CLOSE_ADD_MODAL = 'SAVE_AND_CLOSE_ADD_MODAL'
export const saveAndCloseAddModal = (): Object => ({
  type: SAVE_AND_CLOSE_ADD_MODAL,
})
