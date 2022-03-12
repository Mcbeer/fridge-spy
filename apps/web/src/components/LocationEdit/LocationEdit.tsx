import React, { useContext } from "react";
import { Form, Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../Button/Button";
import { FormInput } from "../FormInput/FormInput";
import { PageTitle } from "../PageTitle/PageTitle";
import "./LocationEdit.scss";
import { addLocation } from "../../services/location";
import { perhaps } from "@fridgespy/utils";
import { LocationContext } from "../../context/LocationContext";

export const LocationEdit = () => {
  const { locations$ } = useContext(LocationContext);
  const navigate = useNavigate();
  const { id } = useParams();

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
      const [addError] = await perhaps(
        addLocation({ name, description, locations$ })
      );

      if (addError) {
        console.error(addError);
        return;
      }

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
          {({ handleSubmit, isValid }) => (
            <Form className="LocationEdit__form">
              <FormInput name="name" label="Name" />
              <FormInput name="description" label="Description" />

              <div className="LocationEdit__form-actions">
                <Button
                  label="Add"
                  type="submit"
                  onClick={handleSubmit}
                  disabled={!isValid}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
