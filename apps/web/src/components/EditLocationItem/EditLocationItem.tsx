import { ILocationProduct } from "@fridgespy/types";
import { Form, Formik } from "formik";
import { useObservableState } from "observable-hooks";
import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LocationContext } from "../../context/LocationContext";
import { ProductContext } from "../../context/ProductContext";
import { locationProductActions } from "../../services/locationProducts";
import { Button } from "../Button/Button";
import { FormInput } from "../FormInput/FormInput";
import { PageTitle } from "../PageTitle/PageTitle";
import { Search } from "../Search/Search";
import "./EditLocationItem.scss";

interface IEditLocationItemFormArgs {
  productName: string;
  productTypeName: string;
  amount: number;
  maximumAmount: number;
  minimumAmount: number;
}

export const EditLocationItem = () => {
  const { products$, productTypes$ } = useContext(ProductContext);
  const { locationsItems$ } = useContext(LocationContext);
  const { id, productId } = useParams<string>();
  const navigate = useNavigate();
  const products = useObservableState(products$, []);
  const productTypes = useObservableState(productTypes$, []);

  const addLocationItemHandler = (values: IEditLocationItemFormArgs) => {
    const locationItem: Partial<ILocationProduct> = {
      locationId: id,
      product: {
        id: products.find((prod) => prod.name === values.productName)?.id || "",
        name: values.productName,
      },
      productType: {
        id:
          productTypes.find((prod) => prod.name === values.productTypeName)
            ?.id || "",
        name: values.productTypeName,
      },
      amount:
        typeof values.amount === "string"
          ? parseInt(values.amount, 10)
          : values.amount,
      maximumAmount:
        typeof values.maximumAmount === "string"
          ? parseInt(values.maximumAmount, 10)
          : values.maximumAmount,
      minimumAmount:
        typeof values.minimumAmount === "string"
          ? parseInt(values.minimumAmount, 10)
          : values.minimumAmount,
    };

    console.log("Adding product", locationItem);

    locationProductActions
      .addLocationProduct(locationItem)
      .then((createdLocationItem) => {
        console.log("Added item:", createdLocationItem);
        locationsItems$.next([...locationsItems$.value, createdLocationItem]);
        navigate(-1);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const initalItem = {
    productName: "",
    productTypeName: "",
    amount: 1,
    maximumAmount: 10,
    minimumAmount: 1,
  };

  console.log(id, productId);

  return (
    <div>
      <PageTitle>{!productId ? "New house" : "Edit House"}</PageTitle>

      <div>
        <Formik initialValues={initalItem} onSubmit={addLocationItemHandler}>
          {({ handleSubmit }) => (
            <Form className="EditLocationItem__form">
              <Search
                name="productName"
                label="Product"
                searchable={products$}
                filterKey="name"
              />
              <Search
                name="productTypeName"
                label="Product type"
                searchable={productTypes$}
                filterKey="name"
              />
              <FormInput name="amount" label="Amount" />
              <FormInput name="maximumAmount" label="Max" />
              <FormInput name="minimumAmount" label="Min" />

              <div className="EditLocationItem__form-actions">
                <Button label="Add" type="submit" onClick={handleSubmit} />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
