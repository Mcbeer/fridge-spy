import { IProduct, IProductType } from "@fridgespy/types";
import React, { createContext, useEffect } from "react";
import { BehaviorSubject } from "rxjs";

const products$ = new BehaviorSubject<IProduct[]>([]);
const productTypes$ = new BehaviorSubject<IProductType[]>([]);

export const ProductContext = createContext({ products$, productTypes$ });

export const ProductProvider: React.FunctionComponent = ({ children }) => {
  useEffect(() => {
    productTypes$.next([
      {
        id: "0ceaa59d-6f52-4eea-8f69-45755d5ea39c",
        name: "Pasta",
        description: "Alle varianter af pasta",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "7b3249b7-67e0-4643-93da-a67dc048ce88",
        name: "Sodavand",
        description: "Alle varianter af sodavand",
        createdAt: "",
        updatedAt: "",
      },
    ]);
  }, []);

  return (
    <ProductContext.Provider value={{ products$, productTypes$ }}>
      {children}
    </ProductContext.Provider>
  );
};
