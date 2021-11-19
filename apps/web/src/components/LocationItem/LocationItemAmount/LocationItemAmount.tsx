import { clamp } from "lodash";
import React, { ChangeEvent, useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import {
  LocationItemAmountButton,
  LocationItemAmountElement,
  LocationItemAmountInput,
} from "./LocationItemAmount.styles";

type LocationItemAmountProps = {
  amount: number;
  setAmount: (amount: number) => void;
};

export const LocationItemAmount = ({
  amount = 0,
  setAmount,
}: LocationItemAmountProps) => {
  const handleSetAmount = (newAmount: number) => {
    setAmount(newAmount);
  };

  const handleOnModifyAmount = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    const clampedValue = clamp(value, 0, 1000);

    handleSetAmount(clampedValue);
  };

  return (
    <LocationItemAmountElement>
      <LocationItemAmountButton onClick={() => handleSetAmount(amount + 1)}>
        <AiOutlinePlus />
      </LocationItemAmountButton>
      <LocationItemAmountInput
        type="text"
        value={amount}
        onChange={handleOnModifyAmount}
      />
      <LocationItemAmountButton onClick={() => handleSetAmount(amount - 1)}>
        <AiOutlineMinus />
      </LocationItemAmountButton>
    </LocationItemAmountElement>
  );
};
