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

export const mainPreloaderToggle = async (show) => {
    const preloader = document.querySelector('.main-preloader')
    if (preloader) {
        if (show) {
            preloader.style.opacity = 1
            preloader.style.display = 'block'
        } else {
            preloader.style.opacity = 0
            await sleep(300)
            preloader.style.display = 'none'
        }
    }
}