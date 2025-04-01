
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { useSurvey } from "@/context/SurveyContext";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const Confirmation = () => {
  const navigate = useNavigate();
  const { qrCode, answers } = useSurvey();
  
  // If no QR code is set or not all questions were answered, redirect
  useEffect(() => {
    if (!qrCode) {
      navigate("/");
      return;
    }
    
    for (let i = 1; i <= 4; i++) {
      if (!answers[i.toString()]) {
        navigate(`/question/${i}`);
        return;
      }
    }
    
    // Redirect to homepage after 10 seconds
    const timer = setTimeout(() => {
      navigate("/");
    }, 10000);
    
    return () => clearTimeout(timer);
  }, [qrCode, answers, navigate]);

  const handleFinish = () => {
    navigate("/");
  };

  let activityText = "Atividade não selecionada";
  
  if (answers["4"] === "a") activityText = "Tour pelo estande";
  if (answers["4"] === "b") activityText = "Quem monta a Valovi mais rápido";
  if (answers["4"] === "c") activityText = "Monte o seu espaço";
  if (answers["4"] === "d") activityText = "Experiência BAYA";

  return (
    <Layout title="LIBERADO!" showQrCode={true}>
      <div className="flex flex-col items-center justify-center flex-grow text-center">
        <div className="bg-gradient-to-r from-blue-violet to-scarlet-red p-1 rounded-lg mb-6">
          <div className="bg-white rounded-md p-8">
            <h3 className="text-3xl font-bold text-scarlet-red mb-4">
              Pode seguir para a atividade selecionada
            </h3>
            
            <div className="flex flex-col items-center mt-8 mb-6">
              <div className="w-24 h-24 rounded-full bg-bright-yellow flex items-center justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-blue-violet flex items-center justify-center">
                  <div className="text-white text-4xl font-bold">✓</div>
                </div>
              </div>
              
              <p className="text-xl font-semibold text-blue-violet mb-2">
                Sua escolha:
              </p>
              <p className="text-2xl font-bold text-scarlet-red">
                {activityText}
              </p>
            </div>
            
            <p className="text-gray-500 mt-6">
              Esta página será redirecionada automaticamente em alguns segundos...
            </p>
          </div>
        </div>
        
        <Button 
          onClick={handleFinish}
          className="mt-6 bg-blue-violet hover:bg-blue-violet/80 text-white px-8 py-2 text-lg"
        >
          Concluir Agora
        </Button>
      </div>
    </Layout>
  );
};

export default Confirmation;
