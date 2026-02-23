"use client";


import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react"
import { HeroSection } from '@/components/ui/hero-section-2';

const testimonials = [
  {
    id: 1,
    name: "Sophie Martin",
    role: "DRH, Entreprise Innovante",
    content: "BTalent a transformé notre gestion RH. Leur accompagnement nous a permis de structurer nos équipes et d'aligner nos talents sur nos objectifs stratégiques. Résultats exceptionnels !",
    rating: 5,
  },
  {
    id: 2,
    name: "Pierre Dubois",
    role: "Directeur Général, PME Tech",
    content: "Les services RH externalisés de BTalent sont parfaitement adaptés à nos besoins. Nous avons gagné en agilité et en sérénité dans la gestion de nos équipes.",
    rating: 5,
  },
  {
    id: 3,
    name: "Marie Leclerc",
    role: "Responsable RH, Groupe International",
    content: "BTalent nous accompagne depuis 2 ans. Leur expertise en développement du capital humain et leur approche centrée sur l'humain font toute la différence.",
    rating: 5,
  },
  {
    id: 4,
    name: "Thomas Bernard",
    role: "CEO, Startup Croissance",
    content: "Le Starter Pack RH de BTalent nous a donné les fondations solides dont nous avions besoin. Une équipe professionnelle et à l'écoute de nos besoins.",
    rating: 5,
  },
];

function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full h-full">
      <div className="relative overflow-hidden rounded-xl bg-[#789f78]/20 backdrop-blur-lg  p-8 ">
        {/* Testimonial Content */}
        <div className="relative h-[350px] md:h-[200px]">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`absolute inset-0 transition-opacity duration-500 ${index === currentIndex ? "opacity-100" : "opacity-0"
                }`}
            >
              <div className="flex flex-col h-full">


                {/* Testimonial Text */}
                <p className="text-gray-800 text-lg mb-4 grow">
                  "{testimonial.content}"
                </p>


                {/* Rating Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-[#789f78]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                {/* Author Info */}
                <div>
                  <h4 className="text-gray-900 font-bold text-xl">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={prevTestimonial}
            className="p-2 rounded-full bg-[#789f78]/20 hover:bg-[#789f78]/30 transition-colors "
            aria-label="Previous testimonial"
          >
            <ChevronLeftIcon className="w-5 h-5 text-gray-800" />
          </button>

          {/* Dots Indicator */}
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${index === currentIndex
                  ? "bg-[#789f78] w-8"
                  : "bg-gray-300 hover:bg-gray-400"
                  }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextTestimonial}
            className="p-2 rounded-full bg-[#789f78]/20 hover:bg-[#789f78]/30 transition-colors "
            aria-label="Next testimonial"
          >
            <ChevronRightIcon className="w-5 h-5 text-gray-800" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Composant pour les animations au scroll
function ScrollAnimation({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Ajouter la classe 'visible' à tous les enfants avec des classes d'animation
          if (ref.current) {
            const animatedElements = ref.current.querySelectorAll('.fade-in-on-scroll, .slide-in-left-on-scroll, .slide-in-right-on-scroll, .scale-in-on-scroll');
            animatedElements.forEach((el) => {
              el.classList.add('visible');
            });
          }
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div ref={ref}>
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <div>


      <HeroSection
        logo={{
          url: "https://vucvdpamtrjkzmubwlts.supabase.co/storage/v1/object/public/users/user_2zMtrqo9RMaaIn4f8F2z3oeY497/avatar.png",
          alt: "Company Logo",
          text: "Your Logo"
        }}
        slogan="ELEVATE YOUR PERSPECTIVE"
        title={
          <>
            Libérez tout le potentiel  <br />
            <span className="text-[#789f78]">de vos talents</span>
          </>
        }
        subtitle="Nous aidons les organisations à devenir engagées, performantes et durables. BTalent accompagne les entreprises dans la définition de leurs besoins, la création de
          fiches de poste et l'identification des compétences clés pour chaque rôle."
        callToAction={{
          text: "Découvrir nos services",
          href: "#explore",
        }}
        backgroundImage="/imgs/hero-btalents.webp"
        contactInfo={{
          website: "yourwebsite.com",
          phone: "+1 (555) 123-4567",
          address: "20 Fieldstone Dr, Roswell, GA",
        }}
      />

      {/* Partenaires */}
      <ScrollAnimation>
        <div className="max-w-7xl mx-auto py-20">
          <h1 className="text-4xl font-bold  text-center tracking-wider fade-in-on-scroll text-[#789f78]">
            Partenaires stratégiquess
          </h1>
          <div className="flex items-center justify-center gap-20 mt-10 flex-wrap">
            <Image src="/imgs/Group 1171275092.png" alt="client1" width={150} height={150} className="hover:scale-110 transition-transform duration-300" />
            <Image src="/imgs/Group 1171275093.png" alt="client2" width={150} height={150} className="hover:scale-110 transition-transform duration-300" />
            <Image src="/imgs/Group 1171275094.png" alt="client3" width={150} height={150} className="hover:scale-110 transition-transform duration-300" />
            <Image src="/imgs/Group 1171275095.png" alt="client4" width={150} height={150} className="hover:scale-110 transition-transform duration-300" />
            <Image src="/imgs/Group 1171275096.png" alt="client5" width={150} height={150} className="hover:scale-110 transition-transform duration-300" />

          </div>
        </div>
      </ScrollAnimation>

      {/* L'avenir appartient aux organisations */}
      <ScrollAnimation>
        <div className="max-w-7xl mx-auto rounded-2xl p-6 sm:p-8 md:p-10 lg:h-[500px] mt-10 sm:mt-16 md:mt-20 bg-cover bg-center scale-in-on-scroll"
          style={{
            backgroundImage: `url(/imgs/Rectangle.png)`,
          }}
        >
          <div className="text-white flex items-center px-4 sm:px-6 md:px-10 flex-col lg:flex-row gap-6 lg:gap-0">
            <div className="w-full lg:w-1/2 slide-in-left-on-scroll">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center lg:text-left">
                L'avenir appartient aux organisations
              </h1>
            </div>

            <div className="w-full lg:w-1/2 slide-in-right-on-scroll">
              <p className="text-sm sm:text-base md:text-lg mt-6 md:mt-10 mb-6 md:mb-10 text-center lg:text-left">
                BTalent propose une offre complète de services RH externalisés, allant du diagnostic initial à la gestion opérationnelle de la fonction RH, avec des solutions flexibles, économiques et adaptées à chaque entreprise.
              </p>

              <div className="flex justify-center lg:justify-start">
                <span className="inline-block text-sm sm:text-base md:text-lg border border-white text-white px-6 sm:px-8 md:px-10 py-2 rounded-full cursor-pointer hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  En savoir plus
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center mt-10 sm:mt-12 md:mt-16 lg:mt-20">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-20 w-full px-4 sm:px-8 md:px-16 lg:px-24">
              <div className="fade-in-on-scroll hover:scale-110 transition-transform duration-300">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center">15</h1>
                <p className="text-white text-xs sm:text-sm md:text-base lg:text-lg text-center mt-2">Entreprises accompagnées</p>
              </div>
              <div className="fade-in-on-scroll hover:scale-110 transition-transform duration-300" style={{ animationDelay: "0.1s" }}>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center">8</h1>
                <p className="text-white text-xs sm:text-sm md:text-base lg:text-lg text-center mt-2">Programmes RH déployés</p>
              </div>
              <div className="fade-in-on-scroll hover:scale-110 transition-transform duration-300" style={{ animationDelay: "0.2s" }}>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center">12</h1>
                <p className="text-white text-xs sm:text-sm md:text-base lg:text-lg text-center mt-2">Formations et coachings</p>
              </div>
              <div className="fade-in-on-scroll hover:scale-110 transition-transform duration-300" style={{ animationDelay: "0.3s" }}>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center">5</h1>
                <p className="text-white text-xs sm:text-sm md:text-base lg:text-lg text-center mt-2">Partenaires stratégiques</p>
              </div>
            </div>
          </div>
        </div>
      </ScrollAnimation>

      {/* Citation Minia BAMBA */}
      <ScrollAnimation>
        <div className="bg-[#789f78]/10 py-6 sm:py-8 md:py-10  mt-10 sm:mt-14 md:mt-20">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8  ">
            <div className="w-full flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6 lg:gap-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold slide-in-left-on-scroll text-center lg:text-left text-[#789f78]">
                Votre mission compte.<br />
                <span className="bg-gradient-to-r from-[#cfdccf] to-[#789f78] bg-clip-text text-transparent">
                  Vos talents aussi.
                </span>
              </h1>

              <p className="text-black text-sm sm:text-base md:text-lg slide-in-right-on-scroll text-center lg:text-right whitespace-nowrap">
                Minia BAMBA, Présidente
              </p>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="mt-10 sm:mt-14 md:mt-20">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5">

                {/* Première colonne */}
                <div className="grid grid-rows-3 gap-2 h-[500px] sm:h-[600px] md:h-[700px]">
                  <div className="row-span-1 rounded-xl relative overflow-hidden group">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundImage: `url(/imgs/btalents-sourcing.jpg)` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-xl" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6">
                      <h3 className="text-white text-base sm:text-lg md:text-xl font-semibold">Recrutement & Sourcing</h3>
                    </div>
                  </div>

                  <div className="row-span-2 rounded-xl relative overflow-hidden group">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundImage: `url(/imgs/gestion-talents-btalents.webp)` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-xl" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6">
                      <h3 className="text-white text-base sm:text-lg md:text-xl font-semibold">Gestion des Talents</h3>
                    </div>
                  </div>
                </div>

                {/* Deuxième colonne */}
                <div className="grid grid-rows-2 gap-2 h-[500px] sm:h-[600px] md:h-[700px]">
                  <div className="row-span-1 h-full rounded-xl relative overflow-hidden group">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundImage: `url(/imgs/formation-developpement-professionnel-btalents.jpg)` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-xl" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6">
                      <h3 className="text-white text-base sm:text-lg md:text-xl font-semibold">Formation & Développement</h3>
                    </div>
                  </div>

                  <div className="row-span-1 h-full rounded-xl relative overflow-hidden group">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundImage: `url(/imgs/strategie-rh-durable-btalents.jpg)` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-xl" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6">
                      <h3 className="text-white text-base sm:text-lg md:text-xl font-semibold">Conseil RH Stratégique</h3>
                    </div>
                  </div>
                </div>

                {/* Troisième colonne */}
                <div className="grid grid-rows-3 gap-2 h-[500px] sm:h-[600px] md:h-[700px]">
                  <div className="row-span-2 relative h-full rounded-xl overflow-hidden group">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundImage: `url(/imgs/bilan-social-individuel-btalents.jpg)` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-xl" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6">
                      <h3 className="text-white text-base sm:text-lg md:text-xl font-semibold">Évaluation & Performance</h3>
                    </div>
                  </div>

                  <div className="row-span-1 relative h-full rounded-xl overflow-hidden group">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundImage: `url(/imgs/Optimisation-rh-btalents.png)` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-xl" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6">
                      <h3 className="text-white text-base sm:text-lg md:text-xl font-semibold">Optimisation RH</h3>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </ScrollAnimation>


      {/* Avantages pour les entreprises */}
      <ScrollAnimation>
        <div className="max-w-7xl mx-auto py-6 sm:py-8 md:py-10 mt-10 sm:mt-14 md:mt-20 px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10">

            {/* Image avec carte overlay */}
            <div className="w-full h-full relative slide-in-left-on-scroll">
              <Image
                src="/imgs/Rectangle@2x.png"
                alt="client1"
                width={500}
                height={500}
                className="hover:scale-105 transition-transform duration-500 w-full h-auto"
              />

              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 md:bottom-5 md:left-5 w-[140px] h-[170px] sm:w-[160px] sm:h-[190px] md:w-[180px] md:h-[210px] bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-lg flex justify-center items-center flex-col hover:scale-105 transition-transform duration-300 p-3 sm:p-4">
                <h3 className="text-center text-white text-base sm:text-lg md:text-xl font-bold">Notre équipe</h3>
                <p className="text-white text-xs sm:text-sm text-center mt-2">
                  Découvrez notre équipe d'experts RH dédiés à votre succès.
                </p>

                <span className="text-center text-lg border w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-[#789f78] border-[#789f78] text-[#ffffff] rounded-full mt-2 flex items-center justify-center cursor-pointer hover:bg-[#6a8f6a] transition-all duration-300 hover:scale-110">
                  <ArrowRightIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                </span>
              </div>
            </div>

            {/* Contenu texte */}
            <div className="slide-in-right-on-scroll">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-500">
                <span className="bg-gradient-to-r from-[#cfdccf] to-[#789f78] bg-clip-text text-transparent">Solutions RH</span> adaptées à votre entreprise
              </h1>

              <p className="text-black mt-6 sm:mt-8 md:mt-10 text-sm sm:text-base text-muted-foreground">
                BTalent aide les entreprises à renforcer leur performance grâce à une gestion des talents plus agile, plus structurée et centrée sur l'humain. Nos experts accompagnent vos équipes dans la définition des besoins, l'optimisation des processus RH et le développement des compétences clés.
              </p>

              <div className="mt-6 sm:mt-8 md:mt-10">
                <ul className="list-disc list-inside grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm sm:text-base md:text-lg">
                  <li className="hover:text-[#789f78] transition-colors duration-300 text-muted-foreground">Solutions sur mesure</li>
                  <li className="hover:text-[#789f78] transition-colors duration-300 text-muted-foreground">Engagement et fidélisation</li>
                  <li className="hover:text-[#789f78] transition-colors duration-300 text-muted-foreground">Conformité réglementaire</li>
                  <li className="hover:text-[#789f78] transition-colors duration-300 text-muted-foreground">Performance durable</li>
                </ul>
              </div>

              <span className="text-center text-sm sm:text-base border bg-[#789f78] border-[#789f78] text-[#ffffff] px-6 sm:px-8 md:px-10 py-2 rounded-full mt-6 sm:mt-8 md:mt-10 inline-block cursor-pointer hover:bg-[#6a8f6a] transition-all duration-300 hover:scale-105 hover:shadow-lg">
                Découvrir nos solutions
              </span>
            </div>
          </div>
        </div>
      </ScrollAnimation>

      {/* Nos services essentiels */}
      <ScrollAnimation>
        <div className="py-6 sm:py-8 md:py-10 mt-10 sm:mt-14 md:mt-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10">

              {/* Contenu texte */}
              <div className="slide-in-left-on-scroll">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#789f78]">
                  Nos services essentiels
                </h1>

                <p className="text-muted-foreground mt-4 sm:mt-6 md:mt-8 text-sm sm:text-base">
                  Nous proposons des services RH externalisés intégrés et agiles, soutenus par des solutions technologiques performantes. BTalent offre une gamme complète de services RH couvrant l'ensemble du cycle de vie du collaborateur : gestion de la paie, administration du personnel, conformité réglementaire, gestion des performances et pilotage stratégique des ressources humaines.
                </p>

                <p className="text-muted-foreground mt-3 sm:mt-4 text-sm sm:text-base">
                  En choisissant BTalent comme partenaire RH, vous gagnez en temps, en agilité et en sérénité. Nous prenons en charge vos processus RH quotidiens afin que vous puissiez vous concentrer pleinement sur le développement de vos produits, de vos services et de vos talents.
                </p>

                <div className="mt-6 sm:mt-8 md:mt-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="flex flex-col items-start justify-center bg-[#789f78]/20 rounded-xl py-4 px-4 sm:py-5 sm:px-5 md:py-6 md:px-6 hover:bg-[#789f78]/30 hover:scale-105 transition-all duration-300 cursor-pointer">
                      <h1 className="text-sm sm:text-base md:text-lg font-bold">
                        Développement du Capital Humain
                      </h1>
                    </div>
                    <div className="flex flex-col items-start justify-center bg-[#789f78]/20 rounded-xl py-4 px-4 sm:py-5 sm:px-5 md:py-6 md:px-6 hover:bg-[#789f78]/30 hover:scale-105 transition-all duration-300 cursor-pointer">
                      <h1 className="text-sm sm:text-base md:text-lg font-bold">
                        Digital RH & Analytics
                      </h1>
                    </div>
                    <div className="flex flex-col items-start justify-center bg-[#789f78]/20 rounded-xl py-4 px-4 sm:py-5 sm:px-5 md:py-6 md:px-6 hover:bg-[#789f78]/30 hover:scale-105 transition-all duration-300 cursor-pointer">
                      <h1 className="text-sm sm:text-base md:text-lg font-bold">
                        Gouvernance & Conformité
                      </h1>
                    </div>
                    <div className="flex flex-col items-start justify-center bg-[#789f78]/20 rounded-xl py-4 px-4 sm:py-5 sm:px-5 md:py-6 md:px-6 hover:bg-[#789f78]/30 hover:scale-105 transition-all duration-300 cursor-pointer">
                      <h1 className="text-sm sm:text-base md:text-lg font-bold">
                        HR-as-a-Service
                      </h1>
                    </div>
                    <div className="flex flex-col items-start justify-center bg-[#789f78]/20 rounded-xl py-4 px-4 sm:py-5 sm:px-5 md:py-6 md:px-6 hover:bg-[#789f78]/30 hover:scale-105 transition-all duration-300 cursor-pointer">
                      <h1 className="text-sm sm:text-base md:text-lg font-bold">
                        Recrutement & Acquisition de Talents
                      </h1>
                    </div>
                    <div className="flex flex-col items-start justify-center bg-[#789f78]/20 rounded-xl py-4 px-4 sm:py-5 sm:px-5 md:py-6 md:px-6 hover:bg-[#789f78]/30 hover:scale-105 transition-all duration-300 cursor-pointer">
                      <h1 className="text-sm sm:text-base md:text-lg font-bold">
                        Starter Pack RH – Les Fondations Solides
                      </h1>
                    </div>
                  </div>
                </div>

                <Link href="/services" className="text-center text-sm sm:text-base border bg-[#789f78] border-[#789f78] text-[#ffffff] px-6 sm:px-8 md:px-10 py-2 rounded-full mt-6 sm:mt-8 md:mt-10 inline-block cursor-pointer hover:bg-[#6a8f6a] transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  Découvrir tous nos services
                </Link>
              </div>

              {/* Espace pour l'image */}
              <div className="w-full h-full relative hidden lg:block"></div>
            </div>
          </div>

          {/* Image absolue - cachée sur mobile et tablette */}
          <Image
            src="/imgs/Img Ordi Btalents.png"
            className="hidden lg:block absolute bottom-0 right-0 w-[600px] h-[600px] xl:w-[700px] xl:h-[700px] 2xl:w-[800px] 2xl:h-[800px]"
            alt="client1"
            width={1000}
            height={1000}
          />
        </div>
      </ScrollAnimation>

      {/* // */}
      <ScrollAnimation>
        <div className="mt-10 sm:mt-14 md:mt-20 w-full px-4 sm:px-6 md:px-8">
          <h1 className="text-sm sm:text-base md:text-lg font-bold text-center fade-in-on-scroll max-w-4xl mx-auto text-[#789f78]">
            Chez BTalent, nous croyons qu'une gestion RH efficace repose sur l'équilibre entre stratégie et humanité.
          </h1>
        </div>
      </ScrollAnimation>

      <div className="w-full h-auto min-h-[150px] sm:min-h-[180px] md:min-h-[230px] bg-cover flex items-center flex-col justify-center py-8 sm:py-10 md:py-12 px-4"
        style={{
          backgroundImage: `url(/imgs/Frame29.png)`,
          backgroundPosition: `bottom`,
          backgroundRepeat: `no-repeat`,
        }}
      >
        <div className="flex items-center justify-center gap-6 sm:gap-10 md:gap-12 lg:gap-20 flex-wrap">
          <Image
            src="/imgs/Group 1171275092.png"
            alt="client1"
            width={150}
            height={150}
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 xl:w-[150px] xl:h-[150px] object-contain"
          />
          <Image
            src="/imgs/Group 1171275093.png"
            alt="client2"
            width={150}
            height={150}
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 xl:w-[150px] xl:h-[150px] object-contain"
          />
          <Image
            src="/imgs/Group 1171275094.png"
            alt="client3"
            width={150}
            height={150}
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 xl:w-[150px] xl:h-[150px] object-contain"
          />
          <Image
            src="/imgs/Group 1171275095.png"
            alt="client4"
            width={150}
            height={150}
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 xl:w-[150px] xl:h-[150px] object-contain"
          />
          <Image
            src="/imgs/Group 1171275096.png"
            alt="client5"
            width={150}
            height={150}
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 xl:w-[150px] xl:h-[150px] object-contain"
          />
        </div>
      </div>

      <ScrollAnimation>
        <div className="max-w-7xl mx-auto py-6 sm:py-8 md:py-10 mt-10 sm:mt-14 md:mt-20 px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10">

            <div className="slide-in-left-on-scroll">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                Pourquoi nos clients<br />
                <span className="bg-gradient-to-r from-[#cfdccf] to-[#789f78] bg-clip-text text-transparent">
                  nous font confiance
                </span>
              </h1>
              <p className="text-muted-foreground mt-4 sm:mt-6 md:mt-8 text-sm sm:text-base">
                Nous transformons vos pratiques RH en leviers concrets de performance durable.
              </p>
            </div>

            <div className="w-full h-full relative slide-in-right-on-scroll">
              <TestimonialsCarousel />
            </div>

          </div>
        </div>
      </ScrollAnimation>




    </div>
  );
}
