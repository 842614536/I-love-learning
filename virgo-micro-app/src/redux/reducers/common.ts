interface InitState {
  isShowGlobalDialog: boolean
}

const initState: InitState = {
  isShowGlobalDialog: false
}

interface IAction {
  type: string,
  payload?: any
}

const reduce = (state = initState, action: IAction): InitState => {
  const {type, payload} = action
  switch (type) {
    case 'TOGGLESHOWGLOBALDIALOG':
      return {
        ...state,
        isShowGlobalDialog: payload
      }
    default:
      return state
  }
}

export default reduce