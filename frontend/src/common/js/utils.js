import Cookies from 'js-cookie';

export const sleep = (ms) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            return resolve()
        }, ms)
    })
}

export const getMyId = () => {
    return Cookies.get('ynp_user_readonly')
}