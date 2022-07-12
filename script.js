

async function checkZip() {
    const zip = document.getElementById('zip');
    let timestamp = + new Date();
    if (zip.value.length == 5) {
        console.log('Die zu suchende zip ist: ', zip.value);
        try {
            const url = `https://cors-anywhere.herokuapp.com/https://www.postdirekt.de/plzserver/PlzAjaxServlet?finda=city&city=${zip.value}&lang=de_DE`;
            const response = await fetch(url);
            console.log(response);
        } catch (e) {
            alert('Fehler beim Laden: ', e);
        }
        setCityInput('Musterstadt');
    }
}


function setCityInput(text) {
    document.getElementById('city').value = text;
}



function getJson() {

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