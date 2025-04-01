
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import MultipleChoice from "@/components/MultipleChoice";
import { useSurvey } from "@/context/SurveyContext";

const choices = [
  { id: "a", text: "Tour pelo estande" },
  { id: "b", text: "Quem monta a Valovi mais rápido" },
  { id: "c", text: "Monte o seu espaço" },
  { id: "d", text: "Experiência BAYA" },
];

const Question4 = () => {
  const navigate = useNavigate();
  const { qrCode, answers } = useSurvey();
  
  // If no QR code is set or previous questions weren't answered, redirect
  useEffect(() => {
    if (!qrCode) {
      navigate("/");
    } else if (!answers["1"]) {
      navigate("/question/1");
    } else if (!answers["2"]) {
      navigate("/question/2");
    } else if (!answers["3"]) {
      navigate("/question/3");
    }
  }, [qrCode, answers, navigate]);

  return (
    <Layout title="Qual atividade gostaria de fazer?" showQrCode={true}>
      <MultipleChoice
        questionId="4"
        choices={choices}
        nextRoute="/confirmation"
      />
    </Layout>
  );
};

export default Question4;
