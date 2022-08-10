import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import Header from "../components/header";
import QuestionCard from "../components/question-card";
import { getAllQuestion } from "../lib/quiz-api";

const Questions = () => {
  const { data } = useSWR("/questions", getAllQuestion);
  const router = useRouter();
  return (
    <div>
      <Header />
      <div className="flex items-center flex-col">
        <button
          onClick={() => router.push("/question-create")}
          className="bg-red-500 text-white  rounded-full px-3 py-2"
        >
          Add Question +
        </button>
        {data &&
          data.map((question) => {
            return (
              <QuestionCard
                key={question.id}
                title={question.title}
                options={question.options}
                answers={question.answers}
                level={question.level}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Questions;
