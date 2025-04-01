
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import MultipleChoice from "@/components/MultipleChoice";
import { useSurvey } from "@/context/SurveyContext";

const choices = [
  { id: "a", text: "Cadeiras e mesas mais ergonômicas" },
  { id: "b", text: "Layout mais flexível para diferentes atividades" },
  { id: "c", text: "Materiais mais resistentes e duráveis" },
  { id: "d", text: "Elementos que tragam mais identidade e acolhimento ao espaço" },
];

const Question3 = () => {
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
    }
  }, [qrCode, answers, navigate]);

  return (
    <Layout
      title="Se pudesse mudar algo no mobiliário escolar, o que seria?"
      showQrCode={true}
    >
      <MultipleChoice
        questionId="3"
        choices={choices}
        nextRoute="/question/4"
      />
    </Layout>
  );
};

export default Question3;
