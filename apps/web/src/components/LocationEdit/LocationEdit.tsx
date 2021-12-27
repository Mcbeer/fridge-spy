import React from "react";
import { Form, Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../Button/Button";
import { FormInput } from "../FormInput/FormInput";
import { PageTitle } from "../PageTitle/PageTitle";
import { addLocation } from "../../context/LocationContext";

export const LocationEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  const addLocationHandler = async ({
    name,
    description,
  }: {
    name: string;
    description: string;
  }) => {
    if (!name) {
      return;
    }
    if (!id) {
      await addLocation({ name, description });
      navigate(-1);
    }
  };

  return (
    <div>
      <PageTitle>{!id ? "New location" : "Edit location"}</PageTitle>

      <div>
        <Formik
          initialValues={{
            name: "",
            description: "",
          }}
          onSubmit={addLocationHandler}
        >
          {({ handleSubmit }) => (
            <Form className="flex flex-col w-full">
              <FormInput name="name" label="Name" />
              <FormInput name="description" label="Description" />

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
