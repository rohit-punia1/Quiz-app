import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { signup } from "../lib/quiz-api";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

export default function Home() {
  const router = useRouter();
  const handleCreateAccountClick = async () => {};

  return (
    <div className={styles.container}>
      <Formik
        initialValues={{
          password: "",
          email: "",
          name: "",
        }}
        validationSchema={Yup.object().shape({
          password: Yup.string().required("password is Required"),
          email: Yup.string().required("email is Required"),
        })}
        onSubmit={async (values) => {
          const result = await signup(
            values.email,
            values.password,
            values.name
          );
          if (result.ok) {
            router.push("/");
          }
        }}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <div className="bg-grey-lighter min-h-screen flex flex-col">
              <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                  <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                  <Field
                    type="text"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    name="name"
                    placeholder="Full Name"
                  />
                  <Field
                    type="text"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    name="email"
                    placeholder="Email"
                  />

                  <Field
                    type="password"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    name="password"
                    placeholder="Password"
                  />
                  <button
                    type="submit"
                    className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-dark focus:outline-none my-1"
                    onClick={handleCreateAccountClick}
                  >
                    Create Account
                  </button>

                  <div className="text-center text-sm text-grey-dark mt-4">
                    By signing up, you agree to the
                    <a
                      className="no-underline border-b border-grey-dark text-grey-dark"
                      href="#"
                    >
                      Terms of Service
                    </a>{" "}
                    and
                    <a
                      className="no-underline border-b border-grey-dark text-grey-dark"
                      href="#"
                    >
                      Privacy Policy
                    </a>
                  </div>
                </div>

                <div className="text-grey-dark mt-6">
                  Already have an account?
                  <a
                    className="no-underline border-b border-blue text-blue-500"
                    onClick={() => router.push("/")}
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
