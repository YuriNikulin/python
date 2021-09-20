import { ENUMS } from '../constants'

export const renderPriority = (value) => {
    if (ENUMS.PRIORITIES[value]) {
        return ENUMS.PRIORITIES[value].name
    }

    return ''
}