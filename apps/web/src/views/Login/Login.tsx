import { perhaps } from "@fridgespy/utils";
import { yup } from "@fridgespy/validation";
import { Form, Formik } from "formik";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { FormInput } from "../../components/FormInput/FormInput";
import { UserContext } from "../../context/UserContext";
import { signInUser } from "../../services/user/signInUser";
import "./Login.scss";

interface SignInProps {
  email: string;
  password: string;
}

export const Login = () => {
  const { authorized$, user$ } = useContext(UserContext);
  const navigate = useNavigate();
  const [_signInError, setSignInError] = useState<Error | null>(null);

  const doLogin = async (values: SignInProps) => {
    const [signInError, user] = await perhaps(signInUser(values));

    if (signInError) {
      setSignInError(signInError);
      return;
    }

    if (user) {
      user$.next(user);
      authorized$.next(true);
      navigate("/");
    }
  };

  return (
    <main className="Login">
      <section className="Login__box">
        <div className="Login__box-content">
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={doLogin}
            validationSchema={loginSchema}
          >
            {({ handleSubmit }) => (
              <Form className="Login__form">
                <h1 className="Login__form-title">Sign in</h1>
                <FormInput name="email" label="E-mail" />
                <FormInput type="password" name="password" label="Password" />

                <div className="Login__form-actions">
                  <Button
                    onClick={() => console.log("Sign up")}
                    label="Sign up"
                  />
                  <Button
                    onClick={handleSubmit}
                    label="Sign in"
                    type="submit"
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </section>
    </main>
  );
};

const loginSchema = yup.object({
  email: yup.string().email("Invalid email address").required("Required"),
  password: yup.string().required("Passwords are required to sign in"),
});
