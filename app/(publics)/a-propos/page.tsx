"use client";
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ArrowRightIcon, Eye, Zap, Cpu, Fingerprint, Pencil, Settings2, Sparkles } from 'lucide-react'

import { FeatureAPropos } from '@/components/blocks/feature-section';


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



const AProposPage = () => {

    const features = [
        {
            title: "Notre Mission",
            description:
                "Accompagner les entreprises dans leur développement en plaçant les talents au centre de leur stratégie. Nous croyons que chaque organisation mérite des solutions RH qui reflètent ses valeurs et ses ambitions.",
            icon: <Zap className="w-8 h-8 " />,
        },
        {
            title: "Notre Vision",
            description:
                "Devenir le partenaire RH de référence en Afrique, reconnu pour son expertise, son innovation et son impact positif sur la performance et le bien-être des organisations et de leurs collaborateurs.",
            icon: <Eye className="w-8 h-8 " />,
        },

    ];
    return (
        <div className=''>


            <div className='h-[300px] bg-cover bg-center flex items-center justify-center'
                style={{ backgroundImage: 'url(/imgs/Rectangle.png)' }}>
                <h1 className='text-7xl font-bold text-white'>A Propos</h1>
            </div>
            {/* Notre Histoire */}
            <ScrollAnimation>
                <div className="max-w-7xl mx-auto py-6 sm:py-8 md:py-10 mt-10 sm:mt-14 md:mt-20 px-4 sm:px-6 md:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10">

                        {/* Image avec carte overlay */}
                        <div className="w-full h-full relative slide-in-left-on-scroll">
                            <Image
                                src="/imgs/Rectangle@2x.png"
                                alt="L'équipe BTalent"
                                width={500}
                                height={500}
                                className="hover:scale-105 transition-transform duration-500 w-full h-auto rounded-lg"
                            />

                            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 md:bottom-5 md:left-5 w-[140px] h-[170px] sm:w-[160px] sm:h-[190px] md:w-[180px] md:h-[210px] bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-lg flex justify-center items-center flex-col hover:scale-105 transition-transform duration-300 p-3 sm:p-4">
                                <h3 className="text-center text-white text-base sm:text-lg md:text-xl font-bold">Notre équipe</h3>
                                <p className="text-white text-xs sm:text-sm text-center mt-2">
                                    Des experts passionnés à votre service
                                </p>

                                <span className="text-center text-lg border w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-[#789f78] border-[#789f78] text-[#ffffff] rounded-full mt-2 flex items-center justify-center cursor-pointer hover:bg-[#6a8f6a] transition-all duration-300 hover:scale-110">
                                    <ArrowRightIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                                </span>
                            </div>
                        </div>

                        {/* Contenu texte */}
                        <div className="slide-in-right-on-scroll">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#789f78]">
                                Qui sommes-nous ?
                            </h2>
                            <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold mt-4 text-[#789f78]">
                                <span className="bg-gradient-to-r from-[#cfdccf] to-[#789f78] bg-clip-text text-transparent">BTalent</span>, votre partenaire RH de confiance
                            </h1>

                            <p className=" mt-6 sm:mt-8 md:mt-10 text-sm sm:text-base text-muted-foreground">
                                Depuis notre création, <strong>BTalent</strong> s'engage à accompagner les entreprises dans leur transformation RH. Notre mission est de mettre l'humain au cœur de la performance en proposant des solutions innovantes, personnalisées et adaptées aux enjeux actuels du monde du travail.
                            </p>

                            <p className=" mt-4 text-sm sm:text-base text-muted-foreground">
                                Forte d'une équipe d'experts pluridisciplinaires, BTalent combine expertise technique, vision stratégique et approche humaine pour vous aider à relever vos défis RH et à développer durablement votre capital humain.
                            </p>

                            <div className="mt-6 sm:mt-8 md:mt-10">
                                <h3 className="font-semibold text-lg mb-4 text-gray-700">Nos engagements :</h3>
                                <ul className="list-disc list-inside grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm sm:text-base md:text-lg">
                                    <li className="hover:text-[#789f78] transition-colors duration-300 text-muted-foreground">Excellence & qualité</li>
                                    <li className="hover:text-[#789f78] transition-colors duration-300 text-muted-foreground">Écoute & proximité</li>
                                    <li className="hover:text-[#789f78] transition-colors duration-300 text-muted-foreground">Innovation & agilité</li>
                                    <li className="hover:text-[#789f78] transition-colors duration-300 text-muted-foreground">Éthique & transparence</li>
                                </ul>
                            </div>

                            <span className="text-center text-sm sm:text-base border bg-[#789f78] border-[#789f78] text-[#ffffff] px-6 sm:px-8 md:px-10 py-2 rounded-full mt-6 sm:mt-8 md:mt-10 inline-block cursor-pointer hover:bg-[#6a8f6a] transition-all duration-300 hover:scale-105 hover:shadow-lg">
                                Contactez-nous
                            </span>
                        </div>
                    </div>
                </div>
            </ScrollAnimation>


            <div className="grid grid-cols-1 md:grid-cols-2  relative z-10 py-10 max-w-7xl mx-auto">
                {features.map((feature, index) => (
                    <FeatureAPropos key={feature.title} {...feature} index={index} />
                ))}
            </div>





            <section className="py-12 md:py-20">
                <div className="mx-auto max-w-7xl space-y-8 px-6 md:space-y-16">
                    <div className='text-center mb-12 sm:mb-16'>
                        <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold text-[#789f78] dark:text-neutral-100 mb-4'>
                            Pourquoi choisir BTalent ?
                        </h2>
                        <p className='text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto'>
                            Des valeurs fortes et une expertise reconnue pour vous accompagner dans tous vos projets RH
                        </p>
                    </div>

                    <div className="relative mx-auto grid max-w-5xl lg:max-w-7xl divide-x divide-y border *:p-12 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                {/* <Zap className="size-4" /> */}
                                <svg className="w-7 h-7 text-[#789f78]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                </svg>
                                <h3 className="text-xl font-medium text-[#789f78]">Expertise Reconnue</h3>
                            </div>
                            <p className="text-sm text-muted-foreground">Une équipe de consultants certifiés avec plus de 15 ans d'expérience dans le conseil RH en Afrique et à l'international.</p>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <svg className="w-7 h-7 text-[#789f78]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <h3 className="text-xl font-medium text-[#789f78]">Approche Sur-Mesure</h3>
                            </div>
                            <p className="text-sm text-muted-foreground">Chaque entreprise est unique. Nous adaptons nos solutions à votre contexte, votre culture et vos objectifs spécifiques.</p>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <svg className="w-7 h-7 text-[#789f78]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>

                                <h3 className="text-xl font-medium text-[#789f78]">Innovation & Technologie
                                </h3>
                            </div>
                            <p className="text-sm text-muted-foreground">Nous intégrons les dernières technologies RH et les meilleures pratiques pour optimiser vos processus.</p>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <svg className="w-7 h-7 text-[#789f78]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>

                                <h3 className="text-xl font-medium text-[#789f78]">Proximité & Écoute
                                </h3>
                            </div>
                            <p className="text-sm text-muted-foreground">Un accompagnement de proximité avec une disponibilité et une réactivité qui font la différence au quotidien.</p>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <svg className="w-7 h-7 text-[#789f78]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>

                                <h3 className="text-xl font-medium text-[#789f78]">Orientation Résultats
                                </h3>
                            </div>
                            <p className="text-sm text-muted-foreground">Des indicateurs clairs et un suivi régulier pour mesurer l'impact concret de nos interventions sur votre performance.</p>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <svg className="w-7 h-7 text-[#789f78]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <h3 className="text-xl font-medium text-[#789f78]">Réseau International
                                </h3>
                            </div>
                            <p className="text-sm text-muted-foreground">Un réseau de partenaires et d'experts à travers le monde pour répondre à tous vos besoins RH, même les plus complexes.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Chiffres clés */}
            <ScrollAnimation>
                <div className="bg-[#789f78] py-12 sm:py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-10 sm:mb-12">BTalent en chiffres</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
                            <div className="text-center fade-in-on-scroll">
                                <div className="text-4xl sm:text-5xl font-bold text-white mb-2">15+</div>
                                <div className="text-white/90 text-sm sm:text-base">Années d'expérience</div>
                            </div>
                            <div className="text-center fade-in-on-scroll">
                                <div className="text-4xl sm:text-5xl font-bold text-white mb-2">200+</div>
                                <div className="text-white/90 text-sm sm:text-base">Clients accompagnés</div>
                            </div>
                            <div className="text-center fade-in-on-scroll">
                                <div className="text-4xl sm:text-5xl font-bold text-white mb-2">95%</div>
                                <div className="text-white/90 text-sm sm:text-base">Taux de satisfaction</div>
                            </div>
                            <div className="text-center fade-in-on-scroll">
                                <div className="text-4xl sm:text-5xl font-bold text-white mb-2">20+</div>
                                <div className="text-white/90 text-sm sm:text-base">Experts RH</div>
                            </div>
                        </div>
                    </div>
                </div>
            </ScrollAnimation>

        </div>
    )
}

export default AProposPage