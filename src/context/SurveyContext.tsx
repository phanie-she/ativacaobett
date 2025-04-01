
import React, { createContext, useState, useContext } from "react";
import Papa from "papaparse";

interface SurveyContextType {
  qrCode: string;
  setQrCode: (qrCode: string) => void;
  answers: Record<string, string>;
  setAnswer: (questionId: string, answer: string) => void;
  resetSurvey: () => void;
  exportToCSV: () => void;
}

const SurveyContext = createContext<SurveyContextType | undefined>(undefined);

export const SurveyProvider = ({ children }: { children: React.ReactNode }) => {
  const [qrCode, setQrCode] = useState<string>("");
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const setAnswer = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const resetSurvey = () => {
    setQrCode("");
    setAnswers({});
  };

  const exportToCSV = () => {
    const data = [
      {
        qrCode,
        question1: answers["1"] || "",
        question2: answers["2"] || "",
        question3: answers["3"] || "",
        question4: answers["4"] || "",
        timestamp: new Date().toISOString(),
      },
    ];

    const csv = Papa.unparse(data);
    const csvData = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    
    // Try to save the file using the local storage
    try {
      const previousData = localStorage.getItem("survey-data");
      let allData = data;
      
      if (previousData) {
        try {
          const parsedData = JSON.parse(previousData);
          allData = [...parsedData, ...data];
        } catch (e) {
          console.error("Error parsing previous data", e);
        }
      }
      
      localStorage.setItem("survey-data", JSON.stringify(allData));
      console.log("Survey data saved to local storage:", allData);
    } catch (e) {
      console.error("Failed to save to local storage:", e);
    }
    
    // Also allow direct download as backup method
    const url = URL.createObjectURL(csvData);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `survey-response-${new Date().getTime()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <SurveyContext.Provider
      value={{
        qrCode,
        setQrCode,
        answers,
        setAnswer,
        resetSurvey,
        exportToCSV,
      }}
    >
      {children}
    </SurveyContext.Provider>
  );
};

export const useSurvey = () => {
  const context = useContext(SurveyContext);
  if (context === undefined) {
    throw new Error("useSurvey must be used within a SurveyProvider");
  }
  return context;
};
