import { Formik, FieldArray } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useRouter } from "next/router";
import Header from "../components/header";
import useSWR from "swr";
import { getQuizById, createScore } from "../lib/quiz-api";

const Quiz = () => {
  const router = useRouter();
  const path = router.asPath
  const array = path.split("=")
  const id = array[1]

  const [level, setLevel] = useState(5);
  const [showAnswer, setShowAnswer] = useState(false);
  const [endTest, setEndTest] = useState(false);
  const [totalScore, setTotalScore] = useState(0)

  const [attemptScore, setAttemptScore] = useState([])

  const { data: questions } = useSWR(["/quiz", id], getQuizById)

  const handleHereClick = () => {
    const result = createScore(totalScore, attemptScore, id)
    if (result.ok) {
      router.push(`./score?id=${id}`)
    }
  }

  const Question = ({ questions, level, totalScore, attemptScore, setTotalScore, setAttemptScore }) => {

    const question = questions.find((x) => x.level === level);
    const handleClick = (e, push, remove, answer) => {
      if (e.target.checked === true) {
        push(e.target.value);
      } else {
        const index = answer.findIndex((x) => x === e.target.value);
        remove(index);
      }
    };

    const compareAnswers = (a, b) => {
      if (a === b) return true;
      if (a == null || b == null) return false;
      if (a.length !== b.length) return false;

      for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
      }
      return true;
    };

    return (
      <div >
        <div className="flex justify-between">
          <span className="text-xl font-bold">Question</span>
          <div className="flex gap-2">
            <span className="text-sm bg-indigo-200 text-blue-500 rounded-3xl py-2 px-3 flex justify-end ">
              {question.type[0] === "s"
                ? "Single Correct Choice"
                : "Multple Correct Choise"}
            </span>
            <span className="text-sm bg-indigo-200 text-blue-500 rounded-3xl py-2 px-3 flex justify-end ">
              Level :{question.level}
            </span>
          </div>
        </div>
        <p className="text-lg font-semibold">{question.title}</p>
        <Formik
          initialValues={{ answer: [] }}
          validationSchema={Yup.object().shape({
            answer: Yup.array().of(Yup.number()).min(1, "Required"),
          })}
          //   enableReinitialize={false}
          key={question.level}
          onSubmit={(values) => {
            setShowAnswer(true);
            setTimeout(() => {
              setShowAnswer(false);
              const question = questions.find((x) => x.level === level);
              if (question) {
                if (compareAnswers(question.answers, values.answer)) {

                  attemptScore.push(totalScore + 5)
                  setAttemptScore(attemptScore)
                  setTotalScore(prev => prev + 5)
                  setLevel((prev) => prev + 1);
                  if (level === 10) {
                    setEndTest(true);
                  }
                } else {

                  attemptScore.push(totalScore - 2)
                  setAttemptScore(attemptScore)
                  setTotalScore(prev => prev - 2)
                  setLevel((prev) => prev + -1);
                  if (level === 1) {
                    setEndTest(true);
                  }
                }
              } else {
              }
            }, 2000);
          }}
        >
          {({ handleSubmit, errors, touched, values, isSubmitting }) => (
            <form onSubmit={handleSubmit}>

              <FieldArray name="answer">
                {(fieldArrayProps) => {
                  const { push, remove, form } = fieldArrayProps;
                  const { values } = form;
                  return question.options.map((option, i) => {
                    return (
                      <div
                        key={i}
                        className={`${showAnswer
                          ? //   values.answer.some((x) => x === parseInt(i))
                          question.answers.some((x) => x == i)
                            ? "bg-green-500 "
                            : "bg-red-500"
                          : null
                          } border border-black rounded-md p-2 flex   gap-5 my-5`}
                      >
                        <input
                          type={"checkbox"}
                          value={i}
                          onClick={(e) =>
                            handleClick(e, push, remove, values.answer)
                          }
                          name="answer"
                        />
                        <p className=" text-base ">{option}</p>
                      </div>
                    );
                  });
                }}
              </FieldArray>
              <div className=" relative">
                {errors.answer && touched.answer && (
                  <p className="absolute -top-5 text-xs text-red-600">
                    Answer is Required
                  </p>
                )}
                <button
                  type="submit"
                  className="px-5 py-2 text-sm bg-red-500 text-white hover:bg-red-600 rounded-full"
                >
                  Submit
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    );
  };
  return (
    <>
      <Header />
      <div className=" h-auto flex justify-center ">
        <div className="w-[800px] bg-slate-200 p-5">
          {!endTest ? questions && (
            <Question setAttemptScore={setAttemptScore} questions={questions.questions} level={level} totalScore={totalScore} attemptScore={attemptScore} setTotalScore={setTotalScore} />
          ) : (
            <>
              Test Ended Check You Score{" "}
              <span
                className="text-blue-500 cursor-pointer"

                onClick={handleHereClick}
              >
                Here
              </span>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Quiz;
