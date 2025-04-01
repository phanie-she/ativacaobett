
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSurvey } from "@/context/SurveyContext";

interface Choice {
  id: string;
  text: string;
}

interface MultipleChoiceProps {
  questionId: string;
  choices: Choice[];
  nextRoute: string;
}

const MultipleChoice: React.FC<MultipleChoiceProps> = ({
  questionId,
  choices,
  nextRoute,
}) => {
  const { answers, setAnswer } = useSurvey();
  const [selected, setSelected] = useState<string | null>(answers[questionId] || null);
  const navigate = useNavigate();

  const handleSelect = (choiceId: string) => {
    setSelected(choiceId);
    setAnswer(questionId, choiceId);
    
    // Auto-navigate after a short delay
    setTimeout(() => {
      navigate(nextRoute);
    }, 500);
  };

  return (
    <div className="w-full max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      {choices.map((choice) => (
        <div
          key={choice.id}
          className={`answer-card ${selected === choice.id ? "selected" : ""}`}
          onClick={() => handleSelect(choice.id)}
        >
          <div className="flex items-start">
            <div className="h-6 w-6 rounded-full border-2 border-blue-violet flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
              {selected === choice.id && (
                <div className="h-3 w-3 rounded-full bg-blue-violet"></div>
              )}
            </div>
            <div>
              <span className="font-medium text-lg">{choice.id}.</span> {choice.text}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MultipleChoice;
