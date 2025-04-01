
import React, { useEffect } from "react";
import Layout from "@/components/Layout";
import QrScanner from "@/components/QrScanner";
import { useSurvey } from "@/context/SurveyContext";

const Index = () => {
  const { resetSurvey } = useSurvey();
  
  useEffect(() => {
    // Only reset once when component mounts
    resetSurvey();
  }, []); // Empty dependency array to run only once

  return (
    <Layout title="Escaneie o QR Code para começar">
      <div className="flex-grow flex flex-col items-center justify-center">
        <QrScanner />
        
        <div className="mt-8 max-w-md text-center">
          <p className="text-gray-600 mb-4">
            Escaneie o QR Code para iniciar a pesquisa interativa. 
            Suas respostas serão coletadas para análise posterior.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
