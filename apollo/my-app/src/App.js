import './App.css';
import React from "react";
import {ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql} from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache()
});

//simple request
client
    .query({
        query: gql`
      query GetBooks {
        books {
            title
        }
      }
    `
    })
    .then(result => console.info("Books", result));


const EXCHANGE_RATES = gql`
  query GetBooks {
    books {
        title,
        author
    }
  }
`;

function ExchangeRates() {
    const {loading, error, data} = useQuery(EXCHANGE_RATES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return data.books.map(({title, author}) => (
        <div key={title}>
            <p>{title}: {author}</p>
        </div>
    ));
}

function App() {
    return (
        <ApolloProvider client={client}>
            <div>Hello Apollo</div>
            <ExchangeRates/>
        </ApolloProvider>
    );
}

export default App;
