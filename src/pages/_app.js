import { ApolloProvider } from '@apollo/client'
import '../styles/globals.css'
import { client } from '../apollo/apollo'
import Header from '../components/layout/header/header'
import Footer from '../components/layout/Footer/footer'
import { GET_MENU_HEADER } from '../queries/get_queries'
export default function App({ Component, pageProps}) {
  return (
    <ApolloProvider client={client}>
      <Header {...pageProps}/>
      <Component {...pageProps} />
      <Footer />
    </ApolloProvider>
  )
}