import {
    MAX_SUGGESTS,
    MAX_LOCAL_SUGGESTS,
    MAX_PREV_REQUESTS
} from './constants';

import {
    request
} from './api';
import {
    saveResultInLocalStorage,
    getResultFromLocalStorage
} from './localStotageApi';

const input = document.querySelector('.search');
const suggest = document.querySelector('.suggest');
const result = document.querySelector('.result');
const history = document.querySelector('.history__list');

const findByName = (name, key) => {
    const countries = getResultFromLocalStorage(key);
    return countries.find(country => country.name.common === name);
}

const generateSuggestList = (requestList) => {
    suggest.classList.remove('active');
    suggest.innerHTML = ''

    let visitedCount = 0;
    requestList.map(el => el.name.common).slice(0, MAX_SUGGESTS).forEach((name) => {
        const listElement = document.createElement('li');
        listElement.textContent = name;
        listElement.classList.add('suggest__item');

        if (findByName(name, 'visited') && visitedCount < MAX_LOCAL_SUGGESTS) {
            visitedCount++;
            listElement.classList.add('suggest__item-visited');
            suggest.prepend(listElement)
        } else {
            suggest.append(listElement);
        }
    })

    suggest.classList.add('active');
}

const renderCountryResult = (country) => {
    const name = result.querySelector('.result__name');
    const capital = result.querySelector('.result__capital');
    const languages = result.querySelector('.result__languages');
    const currencies = result.querySelector('.result__currencies');
    const flag = result.querySelector('.result__flag');

    name.textContent = country.name.common;
    capital.textContent = country.capital;

    for (const language in country.languages) {
        const element = document.createElement('li');
        element.textContent = country.languages[language];
        languages.append(element);
    }

    for (const currency in country.currencies) {
        const element = document.createElement('li');
        element.textContent = currency;
        currencies.append(element);
    }

    flag.setAttribute('src', country.flags.png);
    flag.setAttribute('alt', country.flags.alt);

    result.classList.add('active');
}

const renderHistory = () => {
    history.innerHTML = '';
    const visitedCountries = getResultFromLocalStorage('visited');
    visitedCountries.map(el => el.name.common).slice(0, MAX_PREV_REQUESTS).forEach((name) => {
        const listElement = document.createElement('li');
        listElement.textContent = name;
        history.append(listElement);
    })
}

const suggestHandler = (e) => {
    result.classList.remove('active');
    suggest.classList.remove('active');
    input.value = '';

    const name = e.target.textContent;
    const country = findByName(name, 'currentRequests');
    const isVisitedCountry = findByName(name, 'visited');
    const visitedCountries = getResultFromLocalStorage('visited');
    if (!isVisitedCountry) {
        visitedCountries.unshift(country);
    }
    saveResultInLocalStorage('visited', visitedCountries);
    renderCountryResult(country);
    renderHistory();
}

const inputHandler = async (e) => {
    e.preventDefault();

    let countriesList = [];
    try {
        const countriesRequest = await request(e.target.value);
        countriesList = countriesRequest;
        saveResultInLocalStorage('currentRequests', countriesList);
        generateSuggestList(countriesList);
    } catch {
        const listElement = document.createElement('li');
        listElement.textContent = 'Страны по данному запросу не существует(';
        listElement.classList.add('suggest__item');
        suggest.append(listElement);
        suggest.classList.add('active');
    }
}

input.addEventListener('change', inputHandler);
suggest.addEventListener('click', suggestHandler);

window.addEventListener('storage', () => {
    renderHistory();
});