import { clamp } from "lodash";
import React, { ChangeEvent, useCallback, useContext } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { LocationContext } from "../../../context/LocationContext";
import {
  LocationItemAmountButton,
  LocationItemAmountElement,
  LocationItemAmountInput,
} from "./LocationItemAmount.styles";

type LocationItemAmountProps = {
  id: string;
  amount: number;
};

export const LocationItemAmount = ({
  id,
  amount = 0,
}: LocationItemAmountProps) => {
  const { updateLocationItemAmount } = useContext(LocationContext);

  const handleSetAmount = (newAmount: number) => {
    // Added the + to force it to int
    updateLocationItemAmount(id, +newAmount);
  };

  const handleOnModifyAmount = (event: ChangeEvent<HTMLInputElement>) => {
    const value = +event.target.value;
    const clampedValue = clamp(value, 0, 1000);

    handleSetAmount(clampedValue);
  };

  return (
    <LocationItemAmountElement>
      <LocationItemAmountButton onClick={() => handleSetAmount(+amount + 1)}>
        <AiOutlinePlus />
      </LocationItemAmountButton>
      <LocationItemAmountInput
        type="text"
        value={amount}
        onChange={handleOnModifyAmount}
      />
      <LocationItemAmountButton onClick={() => handleSetAmount(+amount - 1)}>
        <AiOutlineMinus />
      </LocationItemAmountButton>
    </LocationItemAmountElement>
  );
};
