import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { createQuestion } from "../../lib/quiz-api";

const CreateQuestion = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col">
      <Formik
        initialValues={{
          title: "",
          answer: "",
          option1: "",
          option2: "",
          option3: "",
          option4: "",
          level: "",
          type: "",
        }}
        validationSchema={Yup.object().shape({
          answer: Yup.string().required("Answer is Required"),
          option1: Yup.string().required("Option 1 is Required"),
          title: Yup.string().required("Title is Required"),
          option2: Yup.string().required("Option 2 is Required"),
          option3: Yup.string().required("Option 3 is Required"),
          option4: Yup.string().required("Option 4 is Required"),
          level: Yup.number().required("level is Required"),
          type: Yup.string().required("type is Required"),
        })}
        //   enableReinitialize={false}

        onSubmit={async (values) => {
          const result = await createQuestion(values);
          console.log(result)
          if (result.ok) {
            router.push("/questions");
          }
        }}
      >
        {({ handleSubmit, errors, touched }) => (
          <Form onSubmit={handleSubmit}>
            <div className="flex flex-col sm:items-center gap-3">
              <div>
                <p className="text-sm font-semibold">Title</p>
                <Field
                  as={"input"}
                  name="title"
                  placeholder="title"
                  class={"border-2 w-full sm:w-[392px] h-12 px-2 text-sm"}
                />
                {errors.title && touched.title && (
                  <p className="absolute  text-xs text-red-600">
                    {errors.title}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <div>
                  <p className="text-sm font-semibold">Option 1</p>
                  <Field
                    as={"input"}
                    name="option1"
                    placeholder="option1"
                    class={"border-2 w-full sm:w-48 h-12 px-2 text-sm"}
                  />
                  {errors.option1 && touched.option1 && (
                    <p className="absolute  text-xs text-red-600">
                      {errors.option1}
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold">Option 2</p>
                  <Field
                    as={"input"}
                    name="option2"
                    placeholder="option2"
                    class={"border-2 w-full sm:w-48 h-12 px-2 text-sm"}
                  />
                  {errors.option2 && touched.option2 && (
                    <p className="absolute  text-xs text-red-600">
                      {errors.option2}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <div>
                  <p className="text-sm font-semibold">Option 3</p>
                  <Field
                    as={"input"}
                    name="option3"
                    placeholder="option3"
                    class={"border-2 w-full sm:w-48 h-12 px-2 text-sm"}
                  />
                  {errors.option3 && touched.option3 && (
                    <p className="absolute  text-xs text-red-600">
                      {errors.option3}
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold">Option 4</p>
                  <Field
                    as={"input"}
                    name="option4"
                    placeholder="option4"
                    class={"border-2 w-full sm:w-48 h-12 px-2 text-sm"}
                  />
                  {errors.option4 && touched.option4 && (
                    <p className="absolute  text-xs text-red-600">
                      {errors.option4}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold">Answer</p>
                <Field
                  as={"input"}
                  name="answer"
                  placeholder="Enter Comma seperated Answer"
                  class={"border-2 w-full sm:w-[392px] h-12 px-2 text-sm"}
                />
                {errors.answer && touched.answer && (
                  <p className="absolute  text-xs text-red-600">
                    {errors.answer}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <div>
                  <p className="text-sm font-semibold">Level</p>
                  <Field
                    as={"input"}
                    name="level"
                    placeholder="Enter level"
                    class={"border-2 w-full sm:w-48 h-12 px-2 text-sm"}
                  />
                  {errors.level && touched.level && (
                    <p className="absolute  text-xs text-red-600">
                      {errors.level}
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold">type</p>
                  <Field
                    as={"input"}
                    name="type"
                    placeholder="Enter Type s | m"
                    class={"border-2 w-full sm:w-48 h-12 px-2 text-sm"}
                  />
                  {errors.type && touched.type && (
                    <p className="absolute  text-xs text-red-600">
                      {errors.type}
                    </p>
                  )}
                </div>
              </div>
              <button
                type="submit"
                className="px-5 py-2 text-sm bg-red-500 text-white hover:bg-red-600 rounded-full"
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateQuestion;
