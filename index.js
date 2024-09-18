const axios = require('axios');
const dotenv = require('dotenv');
const readline = require('readline');
dotenv.config();
const { PROTOCOL, BASE_URL, APP_ID, IDIOM, UNITS, Q} = process.env;

const getCityCoordinates = (cidade) => {
    const url = `${PROTOCOL}://${BASE_URL}?q=${cidade}&appid=${APP_ID}&lang=${IDIOM}&units=${UNITS}`;

    return axios.get(url)
        .then(response => {
            const { coord } = response.data;
            console.log(`Coordenadas de ${cidade}: Latitude: ${coord.lat}, Longitude: ${coord.lon}`);
            return coord;
        })
        .catch(error => {
            console.error(`Erro ao obter coordenadas de ${cidade}:`, error.message);
        });
};

const askCity = () => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Digite o nome da cidade que deseja buscar: ', (nomeCidade) => {
        getCityCoordinates(nomeCidade).finally(() => rl.close());
    });
};

askCity();
