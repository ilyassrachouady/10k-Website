import { Header } from "@/components/landing/header"
import { HeroSection } from "@/components/landing/hero-section"
import { FeaturesSection } from "@/components/landing/features-section"
import { TestimonialsSection } from "@/components/landing/testimonials-section"
import { PricingSection } from "@/components/landing/pricing-section"
import { FaqSection } from "@/components/landing/faq-section"
import { NewsletterSection } from "@/components/landing/newsletter-section"
import { Footer } from "@/components/landing/footer"

export default function Home() {
  return (
    <main className="w-full max-w-[1400px] mx-auto">
      <Header />
      <HeroSection />
      <div id="features" className="w-full">
        <FeaturesSection />
      </div>
      <div id="testimonials" className="w-full">
        <TestimonialsSection />
      </div>
      <div id="pricing" className="w-full">
        <PricingSection />
      </div>
      <div id="faq" className="w-full">
        <FaqSection />
      </div>
      <NewsletterSection />
      <Footer />
    </main>
  );
}