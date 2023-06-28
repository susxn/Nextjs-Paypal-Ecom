import { createContext, useState } from "react";
import useLocalStorageState from 'use-local-storage-state';

export const ProductsContext = createContext({}); // Valor por defecto del contexto

export function ProductsContextProvider({ children }) {
  const [selectedProducts, setSelectedProducts] = useLocalStorageState('cart', {defaultValue:[]}); // Valor inicial del estado

  return (
    <ProductsContext.Provider value={{ selectedProducts, setSelectedProducts }}>
      {children}
    </ProductsContext.Provider>
  );
}


