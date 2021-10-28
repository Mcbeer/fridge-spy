import { yup } from "@fridgespy/validation";
import { Form, Formik } from "formik";
import React from "react";
import { Button } from "../../components/Button/Button";
import { FormInput } from "../../components/FormInput/FormInput";
import "./Login.scss";
import {
  LoginBox,
  LoginBoxContent,
  LoginBoxTitle,
  LoginBoxTopDecorator,
  LoginButtonGroup,
  LoginMain,
} from "./Login.styles";

export const Login = () => {
  return (
    <LoginMain>
      <LoginBox>
        <LoginBoxTopDecorator />
        <LoginBoxContent>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={(values) => console.log(values)}
            validationSchema={loginSchema}
          >
            <Form className="Login__form">
              <LoginBoxTitle>Sign in</LoginBoxTitle>
              <FormInput name="email" label="E-mail" />
              <FormInput type="password" name="password" label="Password" />

              <LoginButtonGroup>
                <Button
                  onClick={(stuff) => console.log(stuff)}
                  label="Sign up"
                />
                <Button
                  onClick={(stuff) => console.log(stuff)}
                  label="Sign in"
                  type="submit"
                />
              </LoginButtonGroup>
            </Form>
          </Formik>
        </LoginBoxContent>
      </LoginBox>
    </LoginMain>
  );
};

const loginSchema = yup.object({
  email: yup.string().email("Invalid email address").required("Required"),
  password: yup.string().required("Passwords are required to sign in"),
});
