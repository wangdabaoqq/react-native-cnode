// action types
const INIT_COMMENTS = 'INIT_COMMENTS'
const LOAD_DATA = 'LOAD_DATA'
const DELETE_COMMENT = 'DELETE_COMMENT'
const GET_LOGINNAME = 'GET_LOGINNAME'
const REMOVE_LOGIN = 'REMOVE_LOGIN'
const REMOVE_PREV = 'REMOVE_PREV'


// reducer
export default function (state, action) {
  // console.log(action.dataList, state.da);
  
  if (!state) {
    state = { 
      dataList: [],
      login: ''
     }
  }
  
  switch (action.type) {
    case LOAD_DATA:
      // 初始化评论
      return { 
        ...state,
        dataList: [...state.dataList, ...action.dataList]
       }
    case GET_LOGINNAME:
      return {
        ...state,
        login: action.name
      }
    case REMOVE_LOGIN:
      return {
        ...state,
        login: action.name
      }
    case REMOVE_PREV:
      return {
        // dataList: [],
        ...state
      }
    case DELETE_COMMENT:
      // 删除评论
      return {
        comments: [
          ...state.comments.slice(0, action.commentIndex),
          ...state.comments.slice(action.commentIndex + 1)
        ]
      }
    default:
      return state
  }
}

// action creators
export const initComments = (comments) => {
  return { type: INIT_COMMENTS, comments }
}

export const loadData = (dataList) => {
  console.log(dataList);
  
  return { type: LOAD_DATA, dataList }
}

export const deleteComment = (commentIndex) => {
  return { type: DELETE_COMMENT, commentIndex }
}
export const getLoginName = (name) => {
  
  return { type: GET_LOGINNAME, name }
}
export const removeLogin = (name) => {
  
  return { type: REMOVE_LOGIN, name }
}
export const removePrev = (name) => {
  
  return { type: REMOVE_PREV, name }
}
