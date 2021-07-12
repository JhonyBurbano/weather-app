require('dotenv').config()

const { readInput, inquirerMenu, pause } = require("./helpers/inquirer");
const Searches = require('./models/searches.js')

const main = async() => {
    const searches = new Searches();
    let opt;

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                // mostrar mensaje
                /*
                ciudad escrita = written city
                */
                const writtenCity = await readInput('Ciudad: ');
                await searches.city(writtenCity)
                    // Buscar los lugares

                // Seleccionar el lugar

                // Clima

                // Mostrar resultados

                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad:', );
                console.log('Lat:', );
                console.log('Lng:', );
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