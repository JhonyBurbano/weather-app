const fs = require('fs')

const axios = require('axios');
class Searches {
    // atributos o propiedades
    records = []
    dbUrl = './db/database.json';

    constructor() {
        this.readDB()
    }

    get capitalize() {
        return this.records.map(place => {
            // palabras = words
            let words = place.split(' ');
            words = words.map(p => p[0].toUpperCase() + p.substring(1));
            return words.join(' ');
        })
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

    addRecord() {
        console.log('');
        this.capitalize.forEach((place, i) => {
            const idx = `${i+1}.`.green;
            console.log(`${idx} ${place}`);
        })
        console.log('');
    }

    savePlace(place = '') {
        if (this.records.includes(place.toLocaleLowerCase())) {
            return;
        }
        // tener array de 6 posiciones
        this.records = this.records.splice(0, 5);
        this.records.unshift(place.toLocaleLowerCase());

        this.saveDB()
    }

    saveDB() {
        const payload = {
            history: this.records
        }
        fs.writeFileSync(this.dbUrl, JSON.stringify(payload))
    }

    readDB() {
        // Existe bd
        if (!fs.existsSync(this.dbUrl)) {
            return;
        }

        const info = fs.readFileSync(this.dbUrl, { encoding: 'utf-8' })
        const data = JSON.parse(info)

        this.records = data.history;
    }
}

module.exports = Searches;