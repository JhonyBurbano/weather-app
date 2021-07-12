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
            params: {
                'lat': lat,
                'lon': lon,
                'appid': process.env.OPENWEATHER_KEY,
                'units': 'metric',
                'lang': 'es'
            }
        });

        const res = await instance.get();
        const desc = res.data.weather[0].description
        const { temp, temp_min, temp_max } = res.data.main
        return {
            desc,
            temp,
            min: temp_min,
            max: temp_max
        }
        // return res.data.map(info => ({
        //     desc: info.weather[0].description,
        //     temp: info.main.temp,
        //     min: info.main.temp_min,
        //     max: info.main.temp_max
        // }))

    }
}

module.exports = Searches;