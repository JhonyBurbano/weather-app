const axios = require('axios');
class Searches {
    // atributos o propiedades
    records = ['Ottawa', 'Madrid', 'San jose']

    constructor() {
        // TODO: Leer base de datos si existe
    }

    /*
    ciudad = city
    lugar = place
    */
    async city(place = '') {
        try {
            // Peticion http
            // console.log('Ciudad - ', place);
            const resp = await axios.get('https://reqres.in/api/users?page=2');
            console.log(resp.data);

            return []; // retorna las ciudades encontrdas   
        } catch (error) {
            return [];
        }
    }
}

module.exports = Searches;