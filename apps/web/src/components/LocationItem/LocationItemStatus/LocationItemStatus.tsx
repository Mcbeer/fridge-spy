import { ILocationProduct } from "@fridgespy/types";
import { clamp } from "lodash";
import React, { useMemo } from "react";
import "./LocationItemStatus.scss";

export const LocationItemStatus = ({
  amount,
  maximumAmount,
  minimumAmount,
}: Pick<ILocationProduct, "amount" | "maximumAmount" | "minimumAmount">) => {
  const getStatusProgress = () => {
    return clamp((100 / maximumAmount) * amount, 0, 100);
  };

  const getStatusColor = () => {
    if (statusProgress > 75) {
      return "#00909a";
    }

    if (statusProgress > 25) {
      return "#3075d7";
    }

    return "#bd5b00";
  };

  const statusProgress = useMemo(
    () => getStatusProgress(),
    [amount, maximumAmount]
  );
  const statusColor = useMemo(
    () => getStatusColor(),
    [amount, maximumAmount, minimumAmount]
  );

  return (
    <div className="LocationItemStatus">
      <div
        className="LocationItemStatus__bar"
        style={{ width: `${statusProgress}%`, backgroundColor: statusColor }}
      />
    </div>
  );
};
