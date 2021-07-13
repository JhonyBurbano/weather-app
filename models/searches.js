const axios = require('axios');
class Searches {
    // atributos o propiedades
    records = ['Ottawa', 'Madrid', 'San jose']

    constructor() {
        // TODO: Leer base de datos si existe
    }

    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    get paramsOpenWeather() {
        return {
            'appid': process.env.OPENWEATHER_KEY,
            'units': 'metric',
            'lang': 'es'
        }
    }

    /*
    ciudades = cities
    lugar = place
    */
    async cities(place = '') {
        try {
            // Peticion http
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                params: this.paramsMapbox
            })
            const resp = await instance.get();
            // retorna las ciudades encontradas, en un objeto implicito
            return resp.data.features.map(item => ({
                id: item.id,
                name: item.place_name,
                lng: item.center[0],
                lat: item.center[1]
            }))

        } catch (error) {
            return [];
        }
    }

    // clima del lugar = climate of the place

    async climateOfThePlace(lat, lon) {

        const instance = axios.create({
            baseURL: 'https://api.openweathermap.org/data/2.5/weather',
            params: {...this.paramsOpenWeather, lat, lon }
        });

        const res = await instance.get();
        const { weather, main } = res.data
        return {
            desc: weather[0].description,
            temp: main.temp,
            min: main.temp_min,
            max: main.temp_max
        }
    }
}

module.exports = Searches;