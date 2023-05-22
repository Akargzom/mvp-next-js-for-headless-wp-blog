import { ApolloProvider } from '@apollo/client'
import '../styles/globals.css'
import { client } from '../apollo/apollo'
import { Analytics } from '@vercel/analytics/react';
export default function App({ Component, pageProps}) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
      <Analytics />
    </ApolloProvider>
  )
}