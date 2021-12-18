import { perhaps } from "@fridgespy/utils";
import { yup } from "@fridgespy/validation";
import { Form, Formik } from "formik";
import { useObservableState } from "observable-hooks";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { FormInput } from "../../components/FormInput/FormInput";
import { UserContext } from "../../context/UserContext";
import { signInUser } from "../../services/user/signInUser";

interface SignInProps {
  email: string;
  password: string;
}

export const Login = () => {
  const { authorized$, user$ } = useContext(UserContext);
  const navigate = useNavigate();
  const [_signInError, setSignInError] = useState<Error | null>(null);

  const doLogin = async (values: SignInProps) => {
    console.log("Logging in with", values);
    const [signInError, user] = await perhaps(signInUser(values));

    if (signInError) {
      setSignInError(signInError);
      return;
    }

    if (user) {
      console.log("Logged in as", user);
      user$.next(user);
      authorized$.next(true);
      navigate("/");
    }
  };

  return (
    <main className="absolute inset-0 bg-teal-700 overflow-hidden flex items-center justify-center">
      <section className="bg-white h-3/5 w-2/5 flex flex-col border-r-8 overflow-hidden shadow-md rounded-2xl">
        {/* <LoginBoxTopDecorator /> */}
        <div className="p-4 h-full mb-8">
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={doLogin}
            validationSchema={loginSchema}
          >
            {({ handleSubmit }) => (
              <Form className="grid grid-rows-[3fr_repeat(3,_1fr)] w-full">
                <h1 className="flex items-center justify-center text-2xl font-bold">
                  Sign in
                </h1>
                <FormInput name="email" label="E-mail" />
                <FormInput type="password" name="password" label="Password" />

                <div className="flex items-center justify-center gap-4 pt-4">
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
