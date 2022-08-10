import React from "react";
import Header from "../components/header";
import QuizCard from "../components/quiz-card";
import useSWR from "swr";
import { getAllQuiz } from "../lib/quiz-api";

const Dashboard = () => {
  const { data } = useSWR("/quiz", getAllQuiz)
  return (
    <div>
      <Header />
      {data && data.map((quiz) => {
        return (
          <QuizCard key={quiz._id} name={quiz.name} totalQuestion={quiz.total_question} id={quiz._id} />
        )
      })}

    </div>
  );
};

export default Dashboard;
