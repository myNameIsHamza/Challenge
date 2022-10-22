export const RapidApi = async () => {
const axios = require("axios");

const options = {
  method: 'GET',
  url: 'https://currency-conversion-and-exchange-rates.p.rapidapi.com/latest',
  params: {from: 'EUR'},
  headers: {
    'X-RapidAPI-Key': '5b121bba76mshd31eb3a4e987547p1d9173jsne2b1e743a34f',
    'X-RapidAPI-Host': 'currency-conversion-and-exchange-rates.p.rapidapi.com'
  }
};

axios.request(options).then(function (response:any) {
    localStorage.setItem('currency', JSON.stringify(response.data));
}).catch(function (error:any) {
	console.error(error);
});

}