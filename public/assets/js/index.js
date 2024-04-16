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

document.getElementById("loading-spinner")

async function displayProductors(map, userLat, userLng) {
    const response = await fetch(`https://opendata.agencebio.org/api/gouv/operateurs/?activite=Production&lat=${userLat}&lng=${userLng}&trierPar=coords&ordreTri=asc`);
    const data = await response.json();

    document.getElementById("loading-spinner").classList.add("hidden");

    console.log(data);
    data.items.forEach(entreprise => {
        entreprise.adressesOperateurs.forEach(adresse => {
            if (adresse.lat && adresse.long) {

                let siteWebLinks = "";
                for (const site of entreprise.siteWebs) {
                    siteWebLinks += `<a href="${site.url}" target="_blank">${site.url}</a> `;
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
}

navigator.geolocation.getCurrentPosition(function (position) {
    var userLat = position.coords.latitude;
    var userLng = position.coords.longitude;

    var map = L.map('map').setView([userLat, userLng], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    L.marker([userLat, userLng]).addTo(map)
        .bindPopup('Vous êtes ici.')
        .openPopup();

    displayProductors(map, userLat, userLng);
});