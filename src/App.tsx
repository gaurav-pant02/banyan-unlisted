import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Screener from "./pages/Screener";
import Companies from "./pages/Companies";
import CompanyDetail from "./pages/CompanyDetail";
import Investors from "./pages/Investors";
import Sellers from "./pages/Sellers";
import SearchPage from "./pages/SearchPage";
import Refer from "./pages/Refer";
import Blogs from "./pages/Blogs";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/screener" element={<Screener />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/companies/:name" element={<CompanyDetail />} />
          <Route path="/investors" element={<Investors />} />
          <Route path="/sellers" element={<Sellers />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/refer" element={<Refer />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
