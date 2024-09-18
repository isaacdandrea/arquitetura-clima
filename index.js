const axios = require('axios');
const dotenv = require('dotenv');
const readline = require('readline');
dotenv.config();
const { PROTOCOL, BASE_URL, APP_ID, Q, LIMIT} = process.env;

const getCityCoordinates = (cityName) => {
    const url = `${PROTOCOL}://${BASE_URL}?q=${cityName}&limit=${LIMIT}&appid=${APP_ID}`;

    return axios.get(url)
        .then(response => {
            if (response.data.length === 0) {
                console.log(`Cidade "${cityName}" não encontrada.`);
                return null;
            }
            const { lat, lon } = response.data[0];
            console.log(`Coordenadas de ${cityName}: Latitude: ${lat}, Longitude: ${lon}`);
            return { lat, lon };
        })
        .catch(error => {
            console.log(`Erro ao buscar a cidade: ${error.message}`);
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
