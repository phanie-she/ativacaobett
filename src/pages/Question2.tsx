
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import MultipleChoice from "@/components/MultipleChoice";
import { useSurvey } from "@/context/SurveyContext";

const choices = [
  { id: "a", text: "Sim, e acredito que faz toda a diferença" },
  { id: "b", text: "Já ouvi falar, mas não conheço muito sobre o conceito" },
  { id: "c", text: "Não, mas faz sentido" },
  { id: "d", text: "Não, nunca ouvi falar" },
];

const Question2 = () => {
  const navigate = useNavigate();
  const { qrCode, answers } = useSurvey();
  
  // If no QR code is set or previous question wasn't answered, redirect
  useEffect(() => {
    if (!qrCode) {
      navigate("/");
    } else if (!answers["1"]) {
      navigate("/question/1");
    }
  }, [qrCode, answers, navigate]);

  return (
    <Layout
      title="Você já ouviu falar no conceito do ambiente como o 'terceiro educador'?"
      showQrCode={true}
    >
      <MultipleChoice
        questionId="2"
        choices={choices}
        nextRoute="/question/3"
      />
    </Layout>
  );
};

export default Question2;
