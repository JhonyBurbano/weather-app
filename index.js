require('dotenv').config()

const { readInput, inquirerMenu, pause, listPlaces } = require("./helpers/inquirer");
const Searches = require('./models/searches.js')

const main = async() => {
    const searches = new Searches();
    let opt;

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                /*
                ciudad escrita = written city
                */

                // mostrar mensaje
                const writtenCity = await readInput('Ciudad: ');

                // Buscar los lugares
                const places = await searches.cities(writtenCity)

                // Seleccionar el lugar
                const id = await listPlaces(places)
                if (id === '0') continue;
                const placeInfo = places.find(i => i.id === id)
                const { lat, lng } = placeInfo

                //guardar lugar
                searches.savePlace(placeInfo.name)

                // Clima
                const climate = await searches.climateOfThePlace(lat, lng)

                // Mostrar resultados
                console.clear();
                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad:', placeInfo.name.green);
                console.log('Lat:', placeInfo.lat);
                console.log('Lng:', placeInfo.lng);
                console.log('Temperatura:', climate.temp);
                console.log('Mínima:', climate.min);
                console.log('Máxima:', climate.max);
                console.log('Estado del clima:', climate.desc.green);
                break;
            case 2:
                // Mostrar el Historial
                searches.addRecord();
                break;
            default:
                break;
        }

        if (opt !== 0) await pause()
    } while (opt !== 0);

}

main();