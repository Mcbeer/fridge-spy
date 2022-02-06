import React from "react";
import { Form, Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../Button/Button";
import { FormInput } from "../FormInput/FormInput";
import { PageTitle } from "../PageTitle/PageTitle";
import { addLocation } from "../../context/LocationContext";
import "./LocationEdit.scss";

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
            <Form className="LocationEdit__form">
              <FormInput name="name" label="Name" />
              <FormInput name="description" label="Description" />

              <div className="LocationEdit__form-actions">
                <Button label="Add" type="submit" onClick={handleSubmit} />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
