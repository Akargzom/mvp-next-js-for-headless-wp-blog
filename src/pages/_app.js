import { ApolloProvider } from '@apollo/client'
import '../styles/globals.css'
import { client } from '../apollo/apollo'
import Header from '../components/layout/header/header'
import Footer from '../components/layout/Footer/footer'
import Seo from '../components/seo/seo'
export default function App({ Component, pageProps}) {
  return (
    <ApolloProvider client={client}>
      <Header/>
      <Component {...pageProps} />
      <Footer />
    </ApolloProvider>
  )
}