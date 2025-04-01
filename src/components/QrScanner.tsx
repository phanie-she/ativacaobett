
import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useSurvey } from "@/context/SurveyContext";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

const qrConfig = {
  fps: 10,
  qrbox: { width: 250, height: 250 },
  aspectRatio: 1.0,
};

const QrScanner: React.FC = () => {
  const { setQrCode } = useSurvey();
  const navigate = useNavigate();
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Cleanup function to stop scanner on unmount
    const stopScanner = () => {
      if (scannerRef.current && isScanning) {
        console.log("Desligando scanner...");
        scannerRef.current
          .stop()
          .then(() => {
            console.log("Scanner desligado com sucesso");
            setIsScanning(false);
          })
          .catch((err) => {
            console.error("Error stopping scanner:", err);
            setIsScanning(false);
          });
      }
    };

    // Initialize scanner if not already initialized
    if (!scannerRef.current) {
      scannerRef.current = new Html5Qrcode("qr-reader");
    }
    
    const successCallback = (decodedText: string) => {
      console.log("QR code escaneado:", decodedText);
      stopScanner();
      
      setQrCode(decodedText);
      toast({
        title: "QR Code Escaneado",
        description: "Redirecionando para a pesquisa...",
        duration: 2000,
      });
      
      // Navegação com pequeno atraso para garantir que o toast seja exibido
      setTimeout(() => {
        console.log("Navegando para /question/1");
        navigate("/question/1");
      }, 1000);
    };

    // Iniciar o scanner se não estiver já escaneando
    if (!isScanning && scannerRef.current) {
      console.log("Iniciando o scanner...");
      setIsScanning(true);
      scannerRef.current
        .start(
          { facingMode: "environment" },
          qrConfig,
          successCallback,
          (errorMessage) => {
            console.log("Erro no scanner:", errorMessage);
          }
        )
        .catch((err) => {
          console.error("Error starting scanner:", err);
          setIsScanning(false);
          toast({
            title: "Erro",
            description: "Não foi possível iniciar o scanner. Verifique as permissões da câmera.",
            variant: "destructive",
          });
        });
    }

    // Return cleanup function
    return stopScanner;
  }, [navigate, setQrCode]); 

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
      <div
        ref={containerRef}
        id="qr-reader"
        className="w-full max-w-sm aspect-square border-4 border-blue-violet rounded-lg overflow-hidden shadow-xl"
      ></div>
      <p className="mt-4 text-center text-gray-600">
        Posicione o código QR dentro da área para escanear
      </p>
    </div>
  );
};

export default QrScanner;
