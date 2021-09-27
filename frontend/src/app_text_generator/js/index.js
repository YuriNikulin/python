import tab from 'bootstrap/js/src/tab';
import makeRequest, { METHODS } from 'common/request';
import { mainPreloaderToggle } from '../../common/js/utils';

const wrapper = document.getElementById('text-generator');
const fileInput = wrapper.querySelector('#tg-input-file');
const textInput = wrapper.querySelector('#tg-input-text');
const exampleInput = wrapper.querySelector('#tg-select-example select');
const submitButton = wrapper.querySelector('#tg-submit');
const resultEl = wrapper.querySelector('#tg-result');
const sequencesCountInput = wrapper.querySelector('#tg-sequences-count');
let file;
let text;
let example = exampleInput.value;
let type;
let sequencesCount = sequencesCountInput.value;
const tabs = wrapper.querySelectorAll('.nav-link');

const updateType = (_type) => {
    type = _type;
    if (type === 'file') {
        submitButton.disabled = !file;
    } else if (type === 'text') {
        submitButton.disabled = !text;
    } else {
        submitButton.disabled = !example;
    }
};

const handleSubmit = async () => {
    let body = {};
    const endpoint = '/api/text_generator/generate';
    if (type === 'file') {
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);
        body = formData;
    } else if (type === 'text') {
        body.text = text;
    }

    try {
        mainPreloaderToggle(true)
        const res = await makeRequest(endpoint, {
            body,
            useStringifyBody: type !== 'file',
            method: METHODS.POST,
            queryParams: {
                type,
                sequencesCount,
                exampleId: type !== 'example' ? undefined : example,
            },
            showErrorNotification: true,
            shouldSetContentType: false,
            expiresAfter: 7000,
            expirationMessage: {
                title: 'Ошибка',
                text: 'Произошла ошибка при генерации текста. Скорее всего, ваш текст слишком маленький'
            }
        });
        resultEl.textContent = res.result;
    } catch (e) {
        console.error(e);
    } finally {
        mainPreloaderToggle(false)
    }
};

tabs.forEach((tab) => {
    tab.addEventListener('click', (e) => updateType(e.target.getAttribute('data-tg-type')));
});

fileInput.addEventListener('change', (e) => {
    file = e.target.files[0];
    updateType('file');
});

textInput.addEventListener('keyup', (e) => {
    text = e.target.value;
    updateType('text');
});

exampleInput.addEventListener('change', (e) => {
    example = e.target.value;
    updateType('example');
});

sequencesCountInput.addEventListener('change', (e) => {
    let value = +e.target.value;
    if (value <= 0) {
        value = 5;
    } else if (value > 100) {
        value = 100;
    }

    e.target.value = value;
    sequencesCount = value;
});

submitButton.addEventListener('click', handleSubmit);

updateType('file');
