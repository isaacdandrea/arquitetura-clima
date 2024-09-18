const axios = require('axios');
const dotenv = require('dotenv');
const readline = require('readline');
dotenv.config();
const { PROTOCOL, BASE_URL, APP_ID, LIMIT, WEATHER_BASE_URL} = process.env;

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
            return null;
        });
};

const climaPorCoordenada = (lat, lon) => {
    const url = `${PROTOCOL}://${WEATHER_BASE_URL}?lat=${lat}&lon=${lon}&appid=${APP_ID}&units=metric&lang=pt_br`;

    return axios.get(url)
        .then(response => {
            const { feels_like } = response.data.main;
            const { description } = response.data.weather[0];
            console.log(`Sensação térmica: ${feels_like}°C`);
            console.log(`Descrição do clima: ${description}`);
            return { feels_like, description };
        })
        .catch(error => {
            console.log(`Erro ao buscar o clima: ${error.message}`);
        });
};

// Função para perguntar a cidade ao usuário e obter as informações de clima
const askCity = () => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Digite o nome da cidade para buscar: ', (nomeCidade) => {
        console.log('Buscando coordenadas...');
        getCityCoordinates(nomeCidade)
            .then(coordinates => {
                if (coordinates) {
                    console.log('Buscando informações de clima...');
                    climaPorCoordenada(coordinates.lat, coordinates.lon);
                }
            })
            .finally(() => rl.close());
    });
};

askCity();