import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/landing/HeroSection";
import CompaniesSection from "@/components/landing/CompaniesSection";
import IPOTableSection from "@/components/landing/IPOTableSection";
import ServicesSection from "@/components/landing/ServicesSection";
import WhyChooseSection from "@/components/landing/WhyChooseSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import FAQSection from "@/components/landing/FAQSection";
import ChatbotWidget from "@/components/landing/ChatbotWidget";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <CompaniesSection />
      <IPOTableSection />
      <ServicesSection />
      <WhyChooseSection />
      <HowItWorksSection />
      <FAQSection />
      <Footer />
      <ChatbotWidget />
    </div>
  );
};

export default Index;
