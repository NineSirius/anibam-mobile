const initialState = {
    isBottomBar: true,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'DISABLE_BOTTOM_BAR':
            return {
                ...state,
                isBottomBar: false,
            }
        case 'ENABLE_BOTTOM_BAR':
            return {
                ...state,
                isBottomBar: true,
            }
        default:
            return state
    }
}
