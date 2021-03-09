// Declarar variables
const ipHTML = document.getElementById("ip");
const locationHTML = document.getElementById("location");
const timezoneHTML = document.getElementById("timezone");
const ispHTML = document.getElementById("isp");

const ipManual = document.getElementById("ipManual");
const botonBuscar = document.getElementById("buscar");

const datos = (ipAddress, city, regionName, timeZone, isp, name)=>{
    ipHTML.textContent = ipAddress;
    locationHTML.textContent = `${city}, ${regionName}`;
    timezoneHTML.textContent = `UTC${timeZone}`;
    ispHTML.textContent = `${isp} (${name})`;
}

let map = L.map('mapid');
const getApi = async(ip)=>{
    try{
        //obtener info del cliente mediante la api
        let datosAPI = await axios(`https://geo.ipify.org/api/v1?apiKey=at_XwKERffF1nqIEeRXtAkEBnigHFiyH&domain=${ip}`);
        //guardar info
        let ipClient = datosAPI.data.ip;
        let cityClient = datosAPI.data.location.city;
        let regionClient = datosAPI.data.location.region;
        let timezoneClient = datosAPI.data.location.timezone;
        let ispClient = datosAPI.data.isp;
        let nameClient = datosAPI.data.as.name;

        let lat = datosAPI.data.location.lat;
        let lng = datosAPI.data.location.lng;

        datos(ipClient, cityClient, regionClient, timezoneClient, ispClient, nameClient);

        map.setView([lat, lng], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            
        }).addTo(map);
        let iconMarker = L.icon({
            iconUrl: 'images/icon-location.svg',
            iconSize: [20,30]
        });
        let marker = L.marker([lat, lng], {icon: iconMarker}).addTo(map);
    }catch(e){
        console.log(e);
    }
}
window.addEventListener("load", async()=>{
    let getIPAddress = await axios(`https://geo.ipify.org/api/v1?apiKey=at_qweVP6uO7S5XjsItf4u6GJ2PkqJkG`);
    let ip = getIPAddress.data.ip;
    getApi(ip);
});

botonBuscar.addEventListener("click", ()=>{
    if(ipManual.value.length <= 0){
        alert("El dominio o IP es incorrecto!");
    }else{
        let ip = ipManual.value;
        getApi(ip);
    }
});
