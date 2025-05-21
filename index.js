const selectCurrencies = document.querySelector("#currencies");
const box = document.querySelector(".box");

let data = [];

async function getData() {
  const url = "https://restcountries.com/v3.1/all";
  try {
    const response = await fetch(url);
    data = await response.json();
    console.log(data);
    dropdown(data);
    render(data);
  } catch (error) {
    console.error(error.message);
  }
}

function dropdown(countries) {
  const visited = {};
  const currencies = [];
  countries.forEach((country) => {
    if (country.currencies) {
      Object.keys(country.currencies).forEach((code) => {
        if (!visited[code]) {
          visited[code] = true;
          currencies.push(code);
        }
      });
    }
  });
  currencies.sort().forEach((currency) => {
    const option = document.createElement("option");
    option.value = currency;
    option.textContent = currency;
    selectCurrencies.appendChild(option);
  });
}

function render(countries) {
  box.innerHTML = "";
  countries.forEach((country) => {
    const flag = country.flags?.png;
    const population = country.population;
    const region = country.region;
    const continents = country.continents?.join(", ") || "";
    const capital = country.capital?.join(", ") || "";
    const currencies = country.currencies;

    const newBox = document.createElement("div");
    newBox.innerHTML = `
            <div>
                <img src="${flag}" alt="Flag">
                <h2>${country.name.common}</h2>
                <ul>
                    <li><label>Continent:</label> <strong>${continents}</strong></li>
                    <li><label>Population:</label> <strong>${population}</strong></li>
                    <li><label>Region:</label> <strong>${region}</strong></li>
                    <li><label>Capital:</label> <strong>${capital}</strong></li>
                </ul>
            </div>
        `;
    box.appendChild(newBox);
  });
}

selectCurrencies.addEventListener("change", () => {
  const selectedCurrency = selectCurrencies.value;
  const filtered = data.filter((country) => {
    if (!selectedCurrency) return true;
    if (!country.currencies) return false;
    return Object.keys(country.currencies).includes(selectedCurrency);
  });
  render(filtered);
});

getData();




function getRegions(countries) {
  const regionList = [];
  countries.map((country) => {
    if (!regionList.includes(country.region)) {
      const option = document.createElement("option");
      option.setAttribute("value", country.region);
      option.innerText = country.region;
      option.dataset.countryId = country.region;
      region.appendChild(option);
      regionList.push(country.region);
    }
  });
  document.querySelector("select").addEventListener("change", function (event) {
    filterByRegion(countries, event.target.value);
  });
}

function filterByRegion(countries, region) {
  console.log("filter got called");
  const regions = countries.filter((country) => country.region === region);
  container.innerHTML = "";
  regions.forEach((region) => createCard(region));
  getCurrencies(regions);
}
