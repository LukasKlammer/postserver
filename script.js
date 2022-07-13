let citys = [];
let streets = [];

async function handOverCitys() {
    const zip = document.getElementById('zip').value;
    if (zip.length == 5) {
        const foundCityData = await loadCityData(zip);
        if (foundCityData['rows']) {
            findAllCitys(foundCityData);
            setSelectOptions(citys, 'city');
            await handOverStreets();
        } else {
            document.getElementById('not-found').classList.remove('d-none');
            document.getElementById('not-found').innerHTML = `0 Suchtreffer für "${zip}"`;
        }
    }
}


async function handOverStreets() {
    const city = document.getElementById('city').value;
    const zip = document.getElementById('zip').value;
    const foundStreetData = await loadStreetData(zip, city);
    findAllStreets(foundStreetData);
    setSelectOptions(streets, 'street');
}


/**
 * loads all informations about the entered valid zip
 * 
 * @param {number} zip 
 * @returns {json} all informations that we get from server
 */
async function loadCityData(zip) {
    try {
        const url = `https://cors-anywhere.herokuapp.com/https://www.postdirekt.de/plzserver/PlzAjaxServlet?finda=city&city=${zip}&lang=de_DE`;
        const response = await fetch(url);
        const responseAsJson = await response.json();
        return responseAsJson;
    } catch (e) {
        alert('Fehler beim Laden: ', e);
    }
}


function findAllCitys(foundCityData) {
    citys = [];
    const cityInfos = foundCityData['rows'];
    for (let i = 0; i < cityInfos.length; i++) {
        const city = cityInfos[i]['city'];
        if (!citys.includes(city)) {
            citys.push(city);
        }
    }
}


function findAllStreets(foundStreetData) {
    streets = [];
    const streetInfos = foundStreetData['rows'];
    for (let i = 0; i < streetInfos.length; i++) {
        const street = streetInfos[i]['street'];
        if (!streets.includes(street)) {
            streets.push(street);
        }
    }
}


function setSelectOptions(array, inputId) {
    if (array.length >= 0) {
        document.getElementById('not-found').classList.add('d-none');
        let selectInput = document.getElementById(inputId);
        selectInput.innerHTML = '';
        for (let i = 0; i < array.length; i++) {
            const elementName = array[i];
            opt = document.createElement("option");
            opt.value = elementName;
            opt.textContent = elementName;
            selectInput.appendChild(opt);
        }
    }
}


async function loadStreetData(zip, city) {
    let district = '';
    try {
        const url = `https://cors-anywhere.herokuapp.com/https://www.postdirekt.de/plzserver/PlzAjaxServlet?finda=streets&plz_plz=${zip}&plz_city=${city}&plz_district=${district}=&lang=de_DE`;
        const response = await fetch(url);
        const responseAsJson = await response.json();
        return responseAsJson;
    } catch (e) {
        alert('Fehler beim Laden: ', e);
    }
}


function send() {
    const zip = document.getElementById('zip').value;
    const city = document.getElementById('city').value;
    const street = document.getElementById('street').value;
    const houseNumber = document.getElementById('house-number').value;
    const country = document.getElementById('country').value;

    alert(` {
        zip: ${zip},
        city: ${city},
        street: ${street},
        house-number: ${houseNumber},
        country: ${country},
    }
    `);
}
