import { useRouter } from "next/router";
import { login } from "../lib/quiz-api";
import styles from "../styles/Home.module.css";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

export default function Home() {
  const router = useRouter();

  const handleSignInClick = async () => { };
  return (
    <div className={styles.container}>
      <Formik
        initialValues={{
          password: "",
          email: "",
        }}
        validationSchema={Yup.object().shape({
          password: Yup.string().required("password is Required"),
          email: Yup.string().required("email is Required"),
        })}
        onSubmit={async (values) => {
          const result = login(values.email, values.password);

          if (result) {
            router.push("/dashboard");
          }
        }}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ">
              <div className="max-w-md w-full space-y-8 shadow-lg rounded-md p-10">
                <div>
                  <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Sign in to your account
                  </h2>
                </div>

                <Field type="hidden" name="remember" value="true" />
                <div className="rounded-md shadow-sm -space-y-px ">
                  <div>
                    <label className="sr-only">Email address</label>
                    <Field
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Email address"
                    />
                  </div>
                  <div>
                    <label className="sr-only">Password</label>
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Password"
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    onClick={() => handleSignInClick()}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Sign in
                  </button>
                </div>

                <h1>
                  new User ?{" "}
                  <a
                    className="text-blue-500 cursor-pointer"
                    onClick={() => router.push("/signup")}
                  >
                    Sign Up
                  </a>
                </h1>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
