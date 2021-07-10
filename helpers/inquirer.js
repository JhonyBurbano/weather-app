const inquirer = require('inquirer');
require('colors')

const questions = [{
    type: 'list',
    name: 'opcion',
    message: '¿Qué desea hacer?',
    choices: [{
            value: 1,
            name: `${'1.'.green} Buscar ciudad`
        },
        {
            value: 2,
            name: `${'2.'.green} Historial`
        },
        {
            value: 0,
            name: `${'3.'.green} Salir`
        },
    ]
}];

const options = [{
    type: 'input',
    name: 'inputEnter',
    message: `Presione ${'ENTER'.green} para continuar`,
}];

const inquirerMenu = async() => {

    // console.clear();
    console.log('============================'.green);
    console.log('  Seleccione una opción'.white);
    console.log('============================n\n'.green);

    const { opcion } = await inquirer.prompt(questions);

    return opcion;

}

const pause = async() => {
    return await inquirer.prompt(options);
}

const readInput = async(message) => {
    const question = [{
        type: 'input',
        name: 'desc',
        message,
        validate(value) {
            if (value.length === 0) {
                return 'Por favor ingrese un valor'
            }
            return true;
        }
    }];

    const { desc } = await inquirer.prompt(question)
    return desc
}

const listTalkDelete = async(talks = []) => {

    const choices = talks.map((item, i) => {
        const idx = `${i+1}.`.green;
        return {
            value: item.id,
            name: `${idx} ${item.desc}`
        }
    })

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    })

    const question = [{
        type: 'list',
        name: 'id',
        message: 'Delete',
        choices
    }];

    const { id } = await inquirer.prompt(question)

    return id
}

const confirm = async(message) => {
    const question = [{
        type: 'confirm',
        name: 'ok',
        message
    }];
    const { ok } = await inquirer.prompt(question)

    return ok
}

const selectTalkCheckList = async(talks = []) => {

    const choices = talks.map((item, i) => {
        const idx = `${i+1}.`.green;
        return {
            value: item.id,
            name: `${idx} ${item.desc}`,
            checked: (item.completadoEn) ? true : false
        }
    })

    const question = [{
        type: 'checkbox',
        name: 'ids',
        message: 'Select',
        choices
    }];

    const { ids } = await inquirer.prompt(question)

    return ids
}


module.exports = {
    inquirerMenu,
    pause,
    readInput,
    listTalkDelete,
    confirm,
    selectTalkCheckList
}