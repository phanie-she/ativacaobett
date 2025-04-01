
import React, { useEffect, useRef } from "react";
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

  useEffect(() => {
    if (!containerRef.current) return;

    scannerRef.current = new Html5Qrcode("qr-reader");

    const successCallback = (decodedText: string) => {
      if (scannerRef.current) {
        scannerRef.current
          .stop()
          .then(() => {
            setQrCode(decodedText);
            toast({
              title: "QR Code Escaneado",
              description: "Redirecionando para a pesquisa...",
              duration: 2000,
            });
            setTimeout(() => navigate("/question/1"), 500);
          })
          .catch((err) => console.error("Error stopping scanner:", err));
      }
    };

    scannerRef.current
      .start(
        { facingMode: "environment" },
        qrConfig,
        successCallback,
        (errorMessage) => {
          console.log(errorMessage);
        }
      )
      .catch((err) => {
        console.error("Error starting scanner:", err);
        toast({
          title: "Erro",
          description: "Não foi possível iniciar o scanner. Verifique as permissões da câmera.",
          variant: "destructive",
        });
      });

    return () => {
      if (scannerRef.current) {
        scannerRef.current
          .stop()
          .catch((err) => console.error("Error stopping scanner:", err));
      }
    };
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
