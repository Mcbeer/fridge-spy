import { ILocationProduct } from "@fridgespy/types";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { Button } from "../Button/Button";
import { Card } from "../Card/Card";
import { LocationItem } from "../LocationItem/LocationItem";

export const LocationItems = () => {
  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center justify-evenly">
          <Button
            onClick={() => {}}
            label="Add new"
            icon={<AiOutlinePlus size={14} />}
            iconPosition="left"
          />
        </div>
      </div>
      {/* <Card> */}
      <ul className="flex flex-col justify-center gap-2">
        {products.map((product) => {
          return (
            <LocationItem
              key={product.id}
              {...product}
              locationId="7051bd78-bb58-43a0-ad15-dc0e995971fb"
            />
          );
        })}
      </ul>
      {/* </Card> */}
    </section>
  );
};

const products: ILocationProduct[] = [
  {
    id: "7051bd78-bb58-43a0-ad15-dc0e995971fb",
    product: {
      id: "7051bd78-bb58-43a0-ad15-dc0e995971fb",
      name: "Test Product",
    },
    productType: {
      id: "7051bd78-bb58-43a0-ad15-dc0e995971fb",
      name: "Test Product Type",
    },
    amount: 1,
    locationId: "7051bd78-bb58-43a0-ad15-dc0e995971fb",
    createdAt: "",
    updatedAt: "",
    maximumAmount: 10,
    minimumAmount: 1,
  },
  {
    id: "7051bd78-bb58-43a0-ad15-dc0e995971fa",
    product: {
      id: "7051bd78-bb58-43a0-ad15-dc0e995971fb",
      name: "Nutella",
    },
    amount: 4,
    locationId: "7051bd78-bb58-43a0-ad15-dc0e995971fb",
    createdAt: "",
    updatedAt: "",
    maximumAmount: 5,
    minimumAmount: 1,
  },
];
