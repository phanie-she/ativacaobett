
import React, { useEffect } from "react";
import Layout from "@/components/Layout";
import QrScanner from "@/components/QrScanner";
import { useSurvey } from "@/context/SurveyContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { resetSurvey } = useSurvey();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Resetar a pesquisa ao montar o componente para garantir um estado limpo
    console.log("Resetando survey na página inicial");
    resetSurvey();
  }, []); // Array de dependências vazio para executar apenas uma vez

  const handleAdminAccess = () => {
    navigate("/admin");
  };

  return (
    <Layout title="Escaneie o QR Code para começar">
      <div className="flex-grow flex flex-col items-center justify-center">
        <QrScanner />
        
        <div className="mt-8 max-w-md text-center">
          <p className="text-gray-600 mb-4">
            Escaneie o QR Code para iniciar a pesquisa interativa. 
            Suas respostas serão coletadas para análise posterior.
          </p>
          
          <div className="space-y-4">
            {/* Botão para acesso à área administrativa */}
            <Button 
              onClick={handleAdminAccess}
              variant="outline"
              className="border-blue-violet text-blue-violet hover:bg-blue-violet/10 w-full"
            >
              Área Administrativa
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
