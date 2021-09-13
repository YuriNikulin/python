const closeToast = (toast) => {
    if (!toast) {
        return;
    }

    toast.classList.remove('show');
    setTimeout(() => {
        if (toast && toast.parentElement) {
            toast.parentElement.removeChild(toast);
        }
    }, 500);
};

const showNotification = (options) => {
    const _options = {
        title: '',
        text: '',
        duration: 4000,
        closable: true,
        ...options,
    };
    const toast = document.createElement('div');
    const toastHeader = document.createElement('div');
    const toastBody = document.createElement('div');
    toast.classList = 'toast';
    toastHeader.classList = 'toast-header';
    toastBody.classList = 'toast-body';

    toastHeader.innerHTML = _options.title;
    toastBody.innerHTML = _options.text;
    toast.appendChild(toastHeader);
    toast.appendChild(toastBody);

    let container = document.querySelector('.notifications');
    if (!container) {
        container = document.createElement('div');
        container.classList = 'notifications';
        document.body.appendChild(container);
    }

    container.appendChild(toast);
    window.requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    if (_options.duration) {
        setTimeout(() => {
            closeToast(toast);
        }, _options.duration);
    }
    if (_options.closable) {
        toast.addEventListener('click', () => closeToast(toast));
    }
};

export default showNotification;
