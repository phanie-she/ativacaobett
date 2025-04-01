
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { SurveyProvider } from "./context/SurveyContext";
import Index from "./pages/Index";
import Question1 from "./pages/Question1";
import Question2 from "./pages/Question2";
import Question3 from "./pages/Question3";
import Question4 from "./pages/Question4";
import Confirmation from "./pages/Confirmation";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SurveyProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/question/1" element={<Question1 />} />
          <Route path="/question/2" element={<Question2 />} />
          <Route path="/question/3" element={<Question3 />} />
          <Route path="/question/4" element={<Question4 />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </SurveyProvider>
  </QueryClientProvider>
);

export default App;
