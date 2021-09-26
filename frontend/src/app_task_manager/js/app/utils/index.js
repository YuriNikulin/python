import { ENUMS } from '../constants'

export const renderPriority = (value) => {
    if (ENUMS.PRIORITIES[value]) {
        return ENUMS.PRIORITIES[value].name
    }

    return ''
}

export const transformDetailsForBackend = (data) => {
    return Object.entries(data).reduce((acc, [key, value]) => {
        let _value = value.id || value

        if (Array.isArray(_value)) {
            _value = _value.map(v => v.id)
        }
        return {
            ...acc,
            [key]: _value
        }
    }, {})
}