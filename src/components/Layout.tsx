
import React from "react";
import { useSurvey } from "@/context/SurveyContext";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  showQrCode?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, title, showQrCode = false }) => {
  const { qrCode } = useSurvey();
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-blue-violet/10">
      <header className="bg-blue-violet text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Pesquisa Interativa</h1>
          {showQrCode && qrCode && (
            <div className="text-sm opacity-75">
              QR Code: {qrCode.slice(0, 10)}...
            </div>
          )}
        </div>
      </header>
      
      <main className="flex-grow container mx-auto p-4 md:p-6 flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-violet">{title}</h2>
        {children}
      </main>
      
      <footer className="bg-blue-violet/90 text-white p-4 text-center text-sm">
        © {new Date().getFullYear()} - Coleta de Dados
      </footer>
    </div>
  );
};

export default Layout;
