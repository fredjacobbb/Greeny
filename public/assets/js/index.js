class NavbarEffect {

    burger = document.getElementsByClassName("burger-icon")[0];
    cross = document.getElementsByClassName("cross-icon")[0];
    menu = document.getElementsByClassName("menu")[0];
    search = document.getElementsByClassName("search-bar")[0];

    run = () => {
        if (this.burger.classList.contains("hide")) {
            this.burger.classList.remove("hide");
            this.cross.classList.add("hide");
            this.menu.classList.add("hide-menu")
        } else {
            this.burger.classList.add("hide");
            this.cross.classList.remove("hide");
            this.menu.classList.remove("hide-menu")
        }
    }

    runSearch = () => {
        if (this.search.classList.contains("hide")) {
            this.search.classList.remove("hide");
        } else {
            this.search.classList.add("hide")
        }
    }
}

let navbarEffect = new NavbarEffect();

// map ---------------------------- 

let map;

document.getElementById("loading-spinner")

navigator.geolocation.getCurrentPosition(function (position) {
    var userLat = position.coords.latitude;
    var userLng = position.coords.longitude;

    map = L.map('map', {
        center: [userLat, userLng],
        zoom: 10
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    L.marker([userLat, userLng]).addTo(map)
        .bindPopup('Vous êtes ici.')
        .openPopup();

    displayProductors(map, userLat, userLng);
});

async function displayProductors(map, userLat, userLng) {
    document.getElementById("loading-spinner").classList.remove("hidden");

    const response = await fetch(`https://opendata.agencebio.org/api/gouv/operateurs/?activite=Production&lat=${userLat}&lng=${userLng}&trierPar=coords&ordreTri=asc`);
    const data = await response.json();

    console.log(data);
    data.items.forEach(entreprise => {
        entreprise.adressesOperateurs.forEach(adresse => {
            if (adresse.lat && adresse.long) {

                let siteWebLinks = "";
                for (const site of entreprise.siteWebs) {
                    siteWebLinks = `<a href="${site.url}" target="_blank">${site.url}</a> `;
                }

                const popupContent = `${entreprise.denominationcourante ? entreprise.denominationcourante : ''}<br>${adresse.lieu}<br>${adresse.codePostal} ${adresse.ville}<br>${siteWebLinks}`;

                var entrepriseIcon = L.icon({
                    iconUrl: 'https://cdn-icons-png.flaticon.com/512/2507/2507553.png',
                    iconSize: [32, 32],
                    iconAnchor: [16, 32]
                });

                L.marker([adresse.lat, adresse.long], { icon: entrepriseIcon }).addTo(map)
                    .bindPopup(popupContent);
            }
        });
    });
    document.getElementById("loading-spinner").classList.add("hidden");
}

// Localisation manuelle---------------------------

document.getElementById("cityInput")
async function searchCity(cityName, codePostal) {
    const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${cityName}&postcode=${codePostal}`);
    const data = await response.json();

    console.log(data);

    if (data.features.length > 0 && data.features[0].geometry.coordinates) {
        const center = data.features[0].geometry.coordinates.reverse();
        console.log(center)

        return center;
    } else {
        return null;
    }
};

async function searchCityAndDisplay() {
    const cityName = document.getElementById("cityInput").value;
    const codePostal = document.getElementById("codePostal").value;
    const center = await searchCity(cityName, codePostal);

    console.log(center)
    if (center) {
        map.setView(center, 10);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

        displayProductors(map, center[0], center[1]);

    } else {
        alert("Ville non trouvée. Veuillez réessayer.");
    }
    document.getElementById("loading-spinner").classList.add("hidden");
};