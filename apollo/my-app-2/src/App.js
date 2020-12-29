import './App.css';
import React from "react";
import {ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql} from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache()
});

const EXCHANGE_RATES = gql`
  query GetRates($currency: String!) {
    rates(currency: $currency) {
      currency
      rate
    }
  }
`;

function ExchangeRates(props) {
    const currency = props.currency
    console.log(currency);
    const {loading, error, data} = useQuery(EXCHANGE_RATES, {
        variables: {
            currency: currency
        }
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;

    return data.rates.slice(0, 5).map(({currency, rate}) => (
        <div key={currency}>{currency}: {rate}</div>
    ));
}

function App() {
    return (
        <ApolloProvider client={client}>
            <div>Convert rate for USD (return first 5 converts)</div>
            <ExchangeRates currency="USD"/>
            <div>Convert rate for EUR (return first 5 converts)</div>
            <ExchangeRates currency="EUR"/>
        </ApolloProvider>
    );
}

export default App;
