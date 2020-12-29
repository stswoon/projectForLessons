const {ApolloServer} = require('apollo-server');
const fetch = require("node-fetch");

const typeDefs = `
    type Query {
        rates(currency: String!): [ExchangeRate]
    }
    type ExchangeRate {
        currency: String
        rate: String
        name: String
    }
`;

const resolvers = {
    Query: {
        rates: async (_root, {currency}) => {
            try {
                const results = await fetch(
                    `https://api.coinbase.com/v2/exchange-rates?currency=${currency}`
                );
                const exchangeRates = await results.json();

                return Object.keys(exchangeRates.data.rates).map((rateCurrency) => {
                    return {currency: rateCurrency, rate: exchangeRates.data.rates[rateCurrency]};
                });
            } catch (e) {
                console.error(e);
            }
        }
    },
    ExchangeRate: {
        name: async ({currency}) => {
            try {
                const results = await fetch("https://api.coinbase.com/v2/currencies");
                const currencyData = await results.json();

                const currencyInfo = currencyData.data.find(
                    c => c.id.toUpperCase() === currency
                );
                return currencyInfo ? currencyInfo.name : null;
            } catch (e) {
                console.error(e);
            }
        }
    }
};

const server = new ApolloServer({typeDefs, resolvers});
server.listen().then(({url}) => {
    console.log(`Server ready at ${url}`);
});
