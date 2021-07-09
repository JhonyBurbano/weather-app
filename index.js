const { readTalk } = require("./helpers/inquirer");

const main = async() => {
    const text = readTalk('Hola: ');
    console.log(text);
}

main();