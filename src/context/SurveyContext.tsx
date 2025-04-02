
import React, { createContext, useState, useContext } from "react";
import Papa from "papaparse";
import { toast } from "@/components/ui/use-toast";

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
    const surveyEntry = {
      qrCode,
      question1: answers["1"] || "",
      question2: answers["2"] || "",
      question3: answers["3"] || "",
      question4: answers["4"] || "",
      timestamp: new Date().toISOString(),
    };

    console.log("Salvando dados da pesquisa:", surveyEntry);
    
    // Try to save the file using the local storage
    try {
      const previousData = localStorage.getItem("survey-data");
      let allData = [];
      
      if (previousData) {
        try {
          const parsedData = JSON.parse(previousData);
          allData = Array.isArray(parsedData) ? parsedData : [parsedData];
        } catch (e) {
          console.error("Error parsing previous data", e);
          allData = [];
        }
      }
      
      allData.push(surveyEntry);
      localStorage.setItem("survey-data", JSON.stringify(allData));
      console.log("Survey data saved to local storage:", allData);
      
      toast({
        title: "Dados salvos",
        description: "Suas respostas foram salvas com sucesso!",
      });
    } catch (e) {
      console.error("Failed to save to local storage:", e);
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar suas respostas.",
        variant: "destructive",
      });
    }
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
