import { useRouter } from "next/router";
import React from "react";

const QuizCard = ({ name, totalQuestion, id }) => {
  const router = useRouter()
  return (
    <div className="flex justify-center">
      <div className="h-32 w-96 bg-slate-100 rounded-lg m-5 p-2">
        <h1 className="text-sm font-semibold p-2">{name}</h1>
        <div className="flex justify-between">
          <h1 className="text-sm font-semibold p-2">Number of Qustions : {totalQuestion}</h1>
          <button onClick={() => router.push(`/quiz/?id=${id}`)} className="bg-green-500 text-white font-medium text-xs p-1 m-2 rounded-sm">
            Take Quiz
          </button>
        </div>
        <span className="bg-pink-400 p-2 text-xs text-white rounded-full ">
          difficulty level : Low
        </span>
      </div>
    </div>
  );
};

export default QuizCard;
