import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BestSellers from "@/components/BestSellers";
import Reviews from "@/components/Reviews";
import Categories from "@/components/Categories";
import TrustBadges from "@/components/TrustBadges";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div dir="rtl" className="min-h-screen">
      <AnnouncementBar />
      <Header />
      <main>
        <Hero />
        <BestSellers />
        <Reviews />
        <Categories />
        <TrustBadges />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
