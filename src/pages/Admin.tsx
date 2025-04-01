
import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Admin = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    try {
      const storedData = localStorage.getItem("survey-data");
      if (storedData) {
        setData(JSON.parse(storedData));
      }
    } catch (e) {
      console.error("Error loading data", e);
    }
  }, []);

  const downloadCSV = () => {
    if (data.length === 0) return;

    const headers = Object.keys(data[0]).join(",");
    const csvRows = data.map(row => {
      return Object.values(row).map(value => {
        return `"${value}"`;
      }).join(",");
    });

    const csvContent = [headers, ...csvRows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `survey-data-${new Date().getTime()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearData = () => {
    if (confirm("Tem certeza que deseja limpar todos os dados? Esta ação não pode ser desfeita.")) {
      localStorage.removeItem("survey-data");
      setData([]);
    }
  };

  return (
    <Layout title="Dados Coletados">
      <div className="flex justify-between items-center mb-6">
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
          Nenhum dado coletado ainda.
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
    </Layout>
  );
};

export default Admin;
