import {
  MAX_SUGGESTS,
  MAX_LOCAL_SUGGESTS,
  MAX_PREV_REQUESTS,
} from "./constants";

import { request } from "./api";
import {
  saveResultInLocalStorage,
  getResultFromLocalStorage,
} from "./localStotageApi";
import { Country } from "./types";

const input = document.querySelector(".search") as HTMLInputElement;
const suggest = document.querySelector(".suggest") as HTMLUListElement;
const result = document.querySelector(".result") as HTMLDivElement;
const history = document.querySelector(".history__list") as HTMLUListElement;

const findByName = (name: string, key: string) => {
  const countries = getResultFromLocalStorage(key);
  return countries.find((country) => country.name.common === name);
};

const generateSuggestList = (requestList: Country[]) => {
  suggest.classList.remove("active");
  suggest.innerHTML = "";

  let visitedCount = 0;
  requestList
    .map((el) => el.name.common)
    .slice(0, MAX_SUGGESTS)
    .forEach((name) => {
      const listElement = document.createElement("li");
      listElement.textContent = name;
      listElement.classList.add("suggest__item");

      if (findByName(name, "visited") && visitedCount < MAX_LOCAL_SUGGESTS) {
        visitedCount++;
        listElement.classList.add("suggest__item-visited");
        suggest.prepend(listElement);
      } else {
        suggest.append(listElement);
      }
    });

  suggest.classList.add("active");
};

const renderCountryResult = (country: Country) => {
  const name = result.querySelector(".result__name") as HTMLParagraphElement;
  const capital = result.querySelector(
    ".result__capital"
  ) as HTMLParagraphElement;
  const languages = result.querySelector(
    ".result__languages"
  ) as HTMLUListElement;
  const currencies = result.querySelector(
    ".result__currencies"
  ) as HTMLUListElement;
  const flag = result.querySelector(".result__flag") as HTMLImageElement;

  name.textContent = country.name.common;
  capital.textContent = country.capital[0];

  for (const language in country.languages) {
    const element = document.createElement("li");
    element.textContent = country.languages[language];
    languages.append(element);
  }

  for (const currency in country.currencies) {
    const element = document.createElement("li");
    element.textContent = currency;
    currencies.append(element);
  }

  flag.setAttribute("src", country.flags.png);
  flag.setAttribute("alt", country.flags.alt);

  result.classList.add("active");
};

const renderHistory = () => {
  const visitedCountries = getResultFromLocalStorage("visited");
  if (visitedCountries.length !== 0) {
    visitedCountries
      .map((el) => el.name.common)
      .slice(0, MAX_PREV_REQUESTS)
      .forEach((name) => {
        const listElement = document.createElement("li");
        listElement.textContent = name;
        history.append(listElement);
      });
  } else {
    history.innerHTML = "";
  }
};

const suggestHandler = (e: Event) => {
  if (e.target && e.target instanceof HTMLLIElement) {
    result.classList.remove("active");
    suggest.classList.remove("active");
    input.value = "";

    const name = e.target.textContent;
    const country = findByName(name as string, "currentRequests");
    const isVisitedCountry = findByName(name as string, "visited");
    const visitedCountries = getResultFromLocalStorage("visited");
    if (!isVisitedCountry && country) {
      visitedCountries.unshift(country);
    }
    saveResultInLocalStorage("visited", visitedCountries);
    if (country) {
      renderCountryResult(country);
    }
    renderHistory();
  }
};

const inputHandler = async (e: Event) => {
  e.preventDefault();
  if (e.target && e.target instanceof HTMLInputElement) {
    let countriesList: Country[] = [];
    try {
      countriesList = await request(e.target.value);
    } catch (e) {
      const listElement = document.createElement("li");
      if (!e.statusText) {
        listElement.textContent =
          "Проблемы с подключением. Попробуйте обновить страницу";
      } else {
        listElement.textContent = e.statusText;
      }
      listElement.classList.add("suggest__item");
      suggest.append(listElement);
      suggest.classList.add("active");
    }
    if (countriesList.length !== 0) {
      saveResultInLocalStorage("currentRequests", countriesList);
      generateSuggestList(countriesList);
    }
  }
};

input.addEventListener("change", inputHandler);
suggest.addEventListener("click", suggestHandler);

window.addEventListener("storage", () => {
  renderHistory();
});
renderHistory();
