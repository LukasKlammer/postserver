let citys = [];
let streets = ['Teststraße', 'Müllergasse'];

async function handOverCityAndStreets() {
    const zip = document.getElementById('zip').value;
    if (zip.length == 5) {
        const foundCityData = await loadByZip(zip);
        findAllCitys(foundCityData);
        setCitySelectInput(zip);
        if (foundCityData['rows']) {
            const city = foundCityData['rows'][0]['city'];
            // const foundStreetData = await loadByZipAndCity(zip, city);
            // console.log(foundStreetData);
        }

    }
}


/**
 * loads all informations about the entered valid zip
 * 
 * @param {number} zip 
 * @returns {json} all informations that we get from server
 */
async function loadByZip(zip) {
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
    if (cityInfos) {
        for (let i = 0; i < cityInfos.length; i++) {
            const city = cityInfos[i]['city'];
            if (!citys.includes(city)) {
                citys.push(city);
            }
        }
    }
}


function setCitySelectInput(zip) { // Hinweis: Kann auch mehrere Ortsteile geben, z. B. 91126 hat 3 Ortsteile
    if (citys.length >= 0) {
        document.getElementById('not-found').classList.add('d-none');
        let selectInput = document.getElementById('citys');
        selectInput.innerHTML = '';
        for (let i = 0; i < citys.length; i++) {
            const city = citys[i];
            opt = document.createElement("option");
            opt.value = city;
            opt.textContent = city;
            selectInput.appendChild(opt);
        }
    } else {
        document.getElementById('not-found').classList.remove('d-none');
        document.getElementById('not-found').innerHTML = `0 Suchtreffer für "${zip}"`;
    }
}

async function loadByZipAndCity(zip, city) {
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


function setStreetsInput() {

}






// Wenn es mit formData gemacht werden muss

        // let formData = new FormData();
        // formData.append('finda', 'city');
        // formData.append('city', zip.value);
        // formData.append('lang', 'de_DE')

        // const url = `https://www.postdirekt.de/plzserver/PlzAjaxServlet?nocache=${timestamp}`;
        // const fetchOptions = {
        //     method: 'POST',
        //     body: formData,
        // };

        // if (!response.ok) {
        //     const errorMessage = await response.text();
        //     throw new Error(errorMessage);
        // }