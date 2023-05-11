import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
const defaultOptions = {
    watchQuery: {
        fetchPolicy: "no-cache",
        errorPolicy: "ignore",
    },
    query: {
        fetchPolicy: "no-cache",
        errorPolicy: "all",
    },
};
const cache = new InMemoryCache({
    resultCaching: false,
});
const link = createHttpLink({
    uri: "http://dev11.romanuke.com/graphql",
});
const client = new ApolloClient({
    cache,
    link,
    defaultOptions: defaultOptions,
});

export default client;