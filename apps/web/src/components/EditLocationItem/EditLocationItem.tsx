import { ILocationProduct } from "@fridgespy/types";
import { Form, Formik } from "formik";
import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";
import { locationProductActions } from "../../services/locationProducts";
import { Button } from "../Button/Button";
import { FormInput } from "../FormInput/FormInput";
import { PageTitle } from "../PageTitle/PageTitle";
import { Search } from "../Search/Search";

export const EditLocationItem = () => {
  const { products$ } = useContext(ProductContext);
  const { id, productId } = useParams<string>();
  const navigate = useNavigate();

  const addLocationItemHandler = (values: Partial<ILocationProduct>) => {
    locationProductActions.addLocationProduct(values, navigate);
  };

  const initalItem = {
    productId: "",
    productType: {
      id: "",
      name: "",
    },
    amount: 1,
    maximumAmount: 10,
    minimumAmount: 1,
  };

  return (
    <div>
      <PageTitle>{!productId ? "New house" : "Edit House"}</PageTitle>

      <div>
        <Formik initialValues={initalItem} onSubmit={addLocationItemHandler}>
          {({ handleSubmit }) => (
            <Form className="flex flex-col w-full">
              <Search
                name="productId"
                label="Product"
                searchable={products$}
                filterKey="name"
              />
              <FormInput name="productType.id" label="Product type" />
              <FormInput name="amount" label="Amount" />
              <FormInput name="maximumAmount" label="Max" />
              <FormInput name="minimumAmount" label="Min" />

              <div className="flex items-center justify-end gap-4 pt-4">
                <Button label="Add" type="submit" onClick={handleSubmit} />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
