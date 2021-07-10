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
        // Peticion http
        console.log({ place });
        return []; // retorna las ciudades encontrdas
    }
}

module.exports = Searches;