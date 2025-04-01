
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import MultipleChoice from "@/components/MultipleChoice";
import { useSurvey } from "@/context/SurveyContext";

const choices = [
  { id: "a", text: "Conheço o conceito e seus benefícios" },
  { id: "b", text: "Já ouvi falar, mas não sei explicar" },
  { id: "c", text: "Tenho uma noção básica do que é" },
  { id: "d", text: "Nunca ouvi falar" },
];

const Question1 = () => {
  const navigate = useNavigate();
  const { qrCode } = useSurvey();
  
  // If no QR code is set, redirect back to scanner
  useEffect(() => {
    if (!qrCode) {
      navigate("/");
    }
  }, [qrCode, navigate]);

  return (
    <Layout title="Você conhece aprendizagem criativa?" showQrCode={true}>
      <MultipleChoice
        questionId="1"
        choices={choices}
        nextRoute="/question/2"
      />
    </Layout>
  );
};

export default Question1;
