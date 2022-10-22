
interface Currency {
    quotes: {
        EURUSD: number
    };
    source: string;
    success: boolean;
    timestamp: number;
}

export const CurrencyApiFromEuro = async (currencyName: any): Promise<number> => {

    const myHeaders = new Headers();
    myHeaders.append("apikey", "YVjfOXSOnjUVKyAMvPR9wR8wNpdtuUz6");
    const requestOptions: RequestInit = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };
    const api = "https://api.apilayer.com/currency_data/live?source=EUR&currencies=" + currencyName

    const response = await fetch(api, requestOptions)
    const { data } = await response.json()
    const currency: Currency = data;
    const res = Number(JSON.stringify(currency.quotes).split(":")[1].split("}")[0])
    // .then(async response => {
    //     const res = await response.json();
    //     const currency: Currency = res;
    //     return Number(JSON.stringify(currency.quotes).split(":")[1].split("}")[0]);


    // })
    return res;
}
