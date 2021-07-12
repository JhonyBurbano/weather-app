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
    ciudad = city
    lugar = place
    */
    async city(place = '') {
        try {
            // Peticion http
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                params: this.paramsMapbox
            })
            const resp = await instance.get();
            console.log(resp.data);

            return []; // retorna las ciudades encontrdas   
        } catch (error) {
            return [];
        }
    }
}

module.exports = Searches;