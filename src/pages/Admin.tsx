
import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Admin = () => {
  const [data, setData] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedData = localStorage.getItem("survey-data");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        console.log("Dados carregados do localStorage:", parsedData);
        setData(Array.isArray(parsedData) ? parsedData : [parsedData]);
      }
    } catch (e) {
      console.error("Error loading data", e);
      toast({
        title: "Erro ao carregar dados",
        description: "Não foi possível carregar os dados salvos.",
        variant: "destructive",
      });
    }
  }, []);

  const downloadCSV = () => {
    if (data.length === 0) {
      toast({
        title: "Sem dados",
        description: "Não há dados para exportar.",
        variant: "destructive",
      });
      return;
    }

    // Garantir que todos os objetos tenham as mesmas chaves
    const allKeys = new Set<string>();
    data.forEach(item => {
      Object.keys(item).forEach(key => allKeys.add(key));
    });
    
    const headers = Array.from(allKeys).join(",");
    const csvRows = data.map(row => {
      return Array.from(allKeys).map(key => {
        const value = row[key] !== undefined ? row[key] : "";
        return `"${value}"`;
      }).join(",");
    });

    const csvContent = [headers, ...csvRows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    const currentDate = new Date().toLocaleDateString('pt-BR').replace(/\//g, '-');
    link.setAttribute("download", `dados-pesquisa-${currentDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Exportação concluída",
      description: `${data.length} registros exportados com sucesso!`,
    });
  };

  const clearData = () => {
    if (confirm("Tem certeza que deseja limpar todos os dados? Esta ação não pode ser desfeita.")) {
      localStorage.removeItem("survey-data");
      setData([]);
      toast({
        title: "Dados limpos",
        description: "Todos os dados foram removidos.",
      });
    }
  };

  return (
    <Layout title="Dados Coletados">
      <div className="flex flex-col space-y-6">
        <Button 
          variant="ghost" 
          className="w-fit flex items-center gap-2" 
          onClick={() => navigate("/")}
        >
          <ArrowLeft size={16} /> Voltar
        </Button>
        
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-700">
            Total de respostas: {data.length}
          </h3>
          <div className="space-x-2">
            <Button 
              onClick={downloadCSV}
              className="bg-blue-violet hover:bg-blue-violet/80"
              disabled={data.length === 0}
            >
              Exportar CSV
            </Button>
            <Button 
              onClick={clearData}
              variant="destructive"
              disabled={data.length === 0}
            >
              Limpar Dados
            </Button>
          </div>
        </div>

        {data.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            Nenhum dado coletado ainda. Volte aqui no fim do dia para exportar todos os dados coletados.
          </div>
        ) : (
          <div className="border rounded-md overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>QR Code</TableHead>
                  <TableHead>Pergunta 1</TableHead>
                  <TableHead>Pergunta 2</TableHead>
                  <TableHead>Pergunta 3</TableHead>
                  <TableHead>Pergunta 4</TableHead>
                  <TableHead>Data/Hora</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.qrCode}</TableCell>
                    <TableCell>{item.question1}</TableCell>
                    <TableCell>{item.question2}</TableCell>
                    <TableCell>{item.question3}</TableCell>
                    <TableCell>{item.question4}</TableCell>
                    <TableCell>{new Date(item.timestamp).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Admin;
