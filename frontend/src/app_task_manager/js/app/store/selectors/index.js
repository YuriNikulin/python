export const loadingSelector = (state) => {
    return state.common.loading
}

export const dataSelector = (state) => {
    return state.common.data
}

export const filtersSelector = (state) => {
    return state.common.filters
}

export const detailsSelector = (state) => {
    return state.common.details
}

export const profileSelector = (state) => {
    return state.common.profile
}

export const shouldSrollTopSelector = (state) => {
    return state.common.shouldScrollTop
}

export const sortSelector = (state) => {
    return state.common.sort
}