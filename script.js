


async function handOverCityName() {
    const zip = document.getElementById('zip').value;
    if (zip.length == 5) {
        const responseAsJson = await loadByZip(zip);
        setCityInput(responseAsJson, zip);
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


function setCityInput(responseAsJson, zip) {
    console.log(responseAsJson);
    if (responseAsJson['rows']) {
        const city = responseAsJson['rows'][0]['city'];
        document.getElementById('city').value = city;
        document.getElementById('not-found').classList.add('d-none');
    } else {
        document.getElementById('not-found').classList.remove('d-none');
        document.getElementById('not-found').innerHTML = `0 Suchtreffer für "${zip}"`;
    }
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