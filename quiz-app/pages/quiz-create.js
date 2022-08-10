import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import Header from "../components/header";
import QuestionCard from "../components/question-card";
import useSWR from "swr";
import { createQuiz, getAllQuestion, getAllUser } from "../lib/quiz-api";

const QuizCreate = () => {
  const { data } = useSWR("/questions", getAllQuestion)
  const { data: users } = useSWR("/user", getAllUser)

  const router = useRouter()

  const handleSelectClick = (setFieldValue, values, question) => {
    const index = values.findIndex((x) => x._id === question._id);
    debugger;
    if (index === -1) {
      const updatedQuestions = values.concat(question);
      setFieldValue("questions", updatedQuestions);
    } else {
      const filteredQuestion = values.filter((x) => x._id !== question._id);
      setFieldValue("questions", filteredQuestion);
    }
  };
  return (
    <div className="bg-slate-100">
      <Header />
      <Formik
        initialValues={{
          name: "",
          total_question: "",
          assigned_user: "",
          questions: [],
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required("name is Required"),
          total_question: Yup.string().required("Total question is Required"),
          assigned_user: Yup.array(),
          questions: Yup.array()
            .required("question is Required")
            .min(10, "Select 10 Question"),
        })}
        onSubmit={async (values) => {
          const result = await createQuiz(values)
          if (result.ok) {
            router.push("/dashboard");
          }
        }}
      >
        {({ handleSubmit, errors, touched, values, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            {console.log(values)}
            <div className="container max-w-md mx-auto gap-3  p-5 shadow-sm">
              <div className="flex flex-col max-w-md">
                <label className="text-sm font-semibold">Name</label>
                <Field
                  as={"input"}
                  name="name"
                  placeholder="Enter Quiz Name"
                  class={"border-2 w-full md:w-[392px] h-12 px-2 text-sm"}
                />
                {errors.name && touched.name && (
                  <p className="absolute  text-xs text-red-600">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold">Select User</label>
                <Field
                  as={"select"}
                  name="assigned_user"
                  class={"border-2 w-full md:w-[392px] h-12 px-2 text-sm"}
                >
                  <option disabled value="">(Select a user)</option>
                  {users && users.map((user, i) => {
                    return (
                      <option key={i} value={user._id}>{user.name}</option>
                    )
                  })
                  }
                </Field>
                {errors.answer && touched.answer && (
                  <p className="absolute  text-xs text-red-600">
                    {errors.answer}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <div className="flex flex-col relative">
                  <label className="text-sm font-semibold">
                    Total Question
                  </label>
                  <Field
                    as={"input"}
                    name="total_question"
                    placeholder="Enter Total Question"
                    class={"border-2 w-full sm:w-48 h-12 px-2 text-sm "}
                  />
                  {errors.total_question && touched.total_question && (
                    <p className="absolute top-16 text-xs text-red-600">
                      {errors.total_question}
                    </p>
                  )}
                </div>
              </div>
              <div>
                {data &&
                  data.map((question) => {
                    return (
                      <>
                        <QuestionCard
                          key={question.id}
                          title={question.title}
                          options={question.options}
                          answers={question.answers}
                          showOptions={false}
                          level={question.level}
                        />
                        <span
                          onClick={() =>
                            handleSelectClick(
                              setFieldValue,
                              values.questions,
                              question
                            )
                          }
                          className={`text-sm font-medium p-2 text-white ${values.questions.some((x) => x._id === question._id)
                            ? "bg-green-500"
                            : "bg-blue-400"
                            }`}
                        >
                          {values.questions.some((x) => x._id == question._id)
                            ? "Selected"
                            : "Select"}
                        </span>
                      </>
                    );
                  })}
              </div>
              <button
                type="submit"
                className="px-5 mt-5 py-2 text-sm bg-red-500 text-white hover:bg-red-600 rounded-full"
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

export default QuizCreate;
