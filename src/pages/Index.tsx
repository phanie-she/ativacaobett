
import React, { useEffect } from "react";
import Layout from "@/components/Layout";
import QrScanner from "@/components/QrScanner";
import { useSurvey } from "@/context/SurveyContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { resetSurvey, setQrCode } = useSurvey();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Resetar a pesquisa ao montar o componente para garantir um estado limpo
    console.log("Resetando survey na página inicial");
    resetSurvey();
  }, []); // Array de dependências vazio para executar apenas uma vez

  const handleStartTest = () => {
    // Simular um QR code escaneado para fins de teste
    console.log("Teste de navegação manual");
    const testCode = "teste-qr-code-" + Date.now();
    setQrCode(testCode);
    console.log("Redirecionando para questão 1...");
    navigate("/question/1");
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
          
          {/* Botão para navegação manual para teste */}
          <Button 
            onClick={handleStartTest}
            className="bg-blue-violet hover:bg-blue-violet/80 text-white"
          >
            Iniciar Pesquisa (Teste)
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
