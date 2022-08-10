import React from "react";

const QuestionCard = ({ title, options, answers, showOptions = true, level }) => {
  return (
    <div className="bg-[#ADEFD1FF] w-full my-5 p-2 rounded-lg">
      <span className="text-lg font-semibold text-[#00203FFF]"> {title}</span>
      {showOptions &&
        options.map((option, i) => {
          return (
            <span className="flex gap-5 flex-wrap text-[#00203FFF]" key={i}>
              {i + 1} .{option}
            </span>
          );
        })}
      <p className="text-sm font-semibold text-[#00203FFF]">Answer:</p>
      {answers.map((answer) => {
        return <span className="text-[#00203FFF]" key={answer}>{options[parseInt(answer)]},</span>;
      })}
      <p className="text-[#00203FFF] text-xs">Level:{level}</p>
    </div>
  );
};

export default QuestionCard;
