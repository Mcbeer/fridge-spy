import { IProduct, IProductType } from "@fridgespy/types";
import React, { createContext, useEffect } from "react";
import { BehaviorSubject } from "rxjs";

const products$ = new BehaviorSubject<IProduct[]>([]);
const productTypes$ = new BehaviorSubject<IProductType[]>([]);

export const ProductContext = createContext({ products$, productTypes$ });

export const ProductProvider: React.FunctionComponent = ({ children }) => {
  useEffect(() => {
    products$.next([
      {
        id: "1",
        name: "Product 1",
        barcode: "",
        imageUrl: "",
        addedBy: {
          id: "1",
          name: "User 1",
          email: "something",
        },
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "2",
        name: "Product 2",
        barcode: "",
        imageUrl: "",
        addedBy: {
          id: "1",
          name: "User 1",
          email: "something",
        },
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
