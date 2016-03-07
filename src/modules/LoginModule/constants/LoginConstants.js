import keymirror from 'keymirror'

var ActionTypes = keymirror({
  LOGIN_REQUEST: null,
  LOGIN_LOGOUT: null
})

var Constants = {
  ActionTypes: ActionTypes
}

export { Constants as default, ActionTypes as ActionTypes }