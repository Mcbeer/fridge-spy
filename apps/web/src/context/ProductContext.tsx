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
        name: "Romkugler",
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
        name: "Græsk Yoghurt",
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

    productTypes$.next([
      {
        id: "1",
        name: "Yoghurt",
        description: "Alle varianter af yoghurt",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "2",
        name: "Brie",
        description: "Alle varianter af brie",
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
