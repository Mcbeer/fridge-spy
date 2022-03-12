import { ILocationProduct } from "@fridgespy/types";
import { perhaps, toInt } from "@fridgespy/utils";
import { Form, Formik } from "formik";
import { get } from "lodash";
import { useObservableState } from "observable-hooks";
import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LocationContext } from "../../context/LocationContext";
import { ProductContext } from "../../context/ProductContext";
import { addLocationProduct } from "../../services/location";
import { fetchProducts } from "../../services/product";
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

  useEffect(() => {
    fetchProducts([], products$).then();
  }, []);

  const addLocationItemHandler = async (values: IEditLocationItemFormArgs) => {
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
      amount: toInt(values.amount),
      maximumAmount: toInt(values.maximumAmount),
      minimumAmount: toInt(values.minimumAmount),
    };

    const [addError] = await perhaps(
      addLocationProduct(locationItem, locationsItems$)
    );

    if (addError) {
      console.error(addError);
      return;
    }

    navigate(-1);
  };

  const initalItem = {
    productName: "",
    productTypeName: "",
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
