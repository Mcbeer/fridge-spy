import { motion } from "framer-motion";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

export const EditLocationItem = () => {
  const { id, productId } = useParams<string>();
  const navigate = useNavigate();
  console.log({ id, productId });

  return (
    <>
      <div className="" onClick={() => navigate(-1)} />
      <motion.div
        transition={{ duration: 0.3 }}
        initial={{ opacity: 0, x: 600 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 600 }}
        className="EditLocationItem"
      >
        {/* <EditLocationItemTitle>
          {product.product?.name || product.productType?.name || "New product"}
        </EditLocationItemTitle>
        <Formik
          onSubmit={(values) => console.log("Submitting:", values)}
          initialValues={{
            product: {
              id: product.product?.id,
              name: product.product?.name,
            },
            productType: {
              id: product.productType?.id,
              name: product.productType?.name,
            },
            minimumAmount: product.minimumAmount,
            maximumAmount: product.maximumAmount,
            amount: product.amount,
          }}
        >
          <Form>
            <FormInput name="product.name" label="Product name" />
            <FormInput name="productType.name" label="Product type name" />

            <FormInput name="minimumAmount" label="Minimum amount" />
            <FormInput name="maximumAmount" label="Minimum amount" />

            <FormInput name="amount" label="Amount" />
          </Form>
        </Formik> */}
      </motion.div>
    </>
  );
};
