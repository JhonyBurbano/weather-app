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
                const placeInfo = places.find(i => i.id === id)
                    // console.log(placeInfo);
                    // Clima

                // Mostrar resultados

                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad:', placeInfo.name);
                console.log('Lat:', placeInfo.lat);
                console.log('Lng:', placeInfo.lng);
                console.log('Temperatura:', );
                console.log('Mínima:', );
                console.log('Máxima:', );
                break;

            default:
                break;
        }

        if (opt !== 0) await pause()
    } while (opt !== 0);

}

main();