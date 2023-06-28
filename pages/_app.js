import '@/styles/globals.css';
import {ProductsContextProvider} from "@/components/productContext";

function MyApp({ Component, pageProps }) {
  return (
    <ProductsContextProvider>
      <Component {...pageProps} />
    </ProductsContextProvider>
  );
}

export default MyApp