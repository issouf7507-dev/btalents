import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
    return <footer className="bg-black min-h-[100vh] md:min-h-[75vh] text-white pt-10 mt-32 sm:mt-48 md:mt-64 relative flex flex-col">

        <div className="hidden lg:block max-w-7xl mx-auto z-50 absolute -top-[120px] sm:-top-[150px] md:-top-[200px] left-0 right-0 px-4 sm:px-6 md:px-8">
            <div className="rounded-2xl min-h-[300px] sm:min-h-[350px] md:h-[400px] bg-cover bg-center w-full grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 relative p-6 sm:p-8 md:p-0"
                style={{
                    backgroundImage: `url(/imgs/Frame.png)`,
                }}
            >

                <div className="lg:col-span-2 place-self-center px-4 sm:px-8 md:px-12 lg:px-20 py-6 sm:py-8">
                    <h2 className="text-base sm:text-lg md:text-xl mb-3 sm:mb-4 text-white">
                        Prêt à transformer votre gestion RH ?
                    </h2>
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-3 sm:mb-4 text-white">
                        Découvrez nos services RH externalisés dès aujourd'hui !
                    </h1>

                    <p className="text-sm sm:text-base md:text-lg mb-4 text-white">
                        Contactez-nous pour découvrir comment nos experts RH peuvent vous accompagner dans la gestion de vos talents. De la stratégie à l'opérationnel, nous sommes votre partenaire de confiance en ressources humaines.
                    </p>
                </div>

                <div className="hidden lg:block"></div>

                {/* Formulaire de contact */}
                {/* <div className="w-full lg:w-[350px] xl:w-[400px] lg:h-[450px] xl:h-[500px] bg-white rounded-xl lg:absolute lg:bottom-[50%] lg:translate-y-[50%] lg:right-5 z-30 shadow-2xl mx-auto lg:mx-0">
                    <div className="p-4 sm:p-6 md:p-8 h-full flex flex-col">
                        <form action="" className="flex flex-col gap-3 sm:gap-4 md:gap-5 grow">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="name" className="text-xs sm:text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Your name"
                                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#789f78] focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400 text-sm sm:text-base"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="email" className="text-xs sm:text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="your.email@example.com"
                                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#789f78] focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400 text-sm sm:text-base"
                                />
                            </div>
                            <div className="flex flex-col gap-2 grow">
                                <label htmlFor="message" className="text-xs sm:text-sm font-medium text-gray-700">Message</label>
                                <textarea
                                    id="message"
                                    placeholder="Tell us about your project..."
                                    rows={4}
                                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#789f78] focus:border-transparent transition-all duration-200 resize-none text-gray-900 placeholder-gray-400 text-sm sm:text-base"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-[#789f78] hover:bg-[#6a8f6a] text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-sm sm:text-base"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div> */}
            </div>
        </div>

        {/* Contenu principal du footer */}
        <div className="flex-1 flex items-center flex-col max-w-7xl mx-auto justify-center px-4 sm:px-6 md:px-8 pt-32 sm:pt-24 md:pt-0">
            <div className="mb-6 sm:mb-8 md:mb-10">
                <Link href="/">
                    <Image
                        src="/imgs/Logo-BTalents-white.png"
                        alt="logo"
                        width={200}
                        height={200}
                        className="w-32 sm:w-40 md:w-48 lg:w-[200px] h-auto"
                    />
                </Link>
            </div>

            <p className="text-center text-gray-400 mb-6 sm:mb-8 md:mb-10 max-w-3xl text-xs sm:text-sm md:text-base px-4">
                BTalent accompagne les entreprises dans la définition de leurs besoins, la création de fiches de poste et l'identification des compétences clés pour chaque rôle. Nous aidons à structurer les équipes afin d'aligner les talents sur les objectifs stratégiques de l'organisation.
            </p>

            <ul className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-10">
                <li className="cursor-pointer hover:text-[#789f78] transition-colors">
                    <Facebook className="w-5 h-5 sm:w-6 sm:h-6" />
                </li>
                <li className="cursor-pointer hover:text-[#789f78] transition-colors">
                    <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
                </li>
                <li className="cursor-pointer hover:text-[#789f78] transition-colors">
                    <Twitter className="w-5 h-5 sm:w-6 sm:h-6" />
                </li>
                <li className="cursor-pointer hover:text-[#789f78] transition-colors">
                    <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
                </li>
            </ul>
        </div>

        {/* Informations de contact et liens */}
        <div className="px-4 sm:px-8 md:px-16 pb-4 mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between w-full max-w-7xl gap-6 lg:gap-4">
            <div className="flex flex-col gap-2">
                <p className="text-gray-400 text-xs sm:text-sm">156 Chemin des montenailles, 77190 Dammarie-les-lys, France</p>
                <p className="text-gray-400 text-xs sm:text-sm">contact@btalents.services</p>
                <p className="text-gray-400 text-xs sm:text-sm">+33 6 32 29 61 36</p>
            </div>

            <div className="flex flex-col gap-3 sm:gap-4">
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                    <p className="text-gray-400 text-xs sm:text-sm font-semibold">Liens</p>
                    <Link href="/services" className="text-gray-400 text-xs sm:text-sm hover:text-white transition-colors">Nos services</Link>
                    <Link href="/about" className="text-gray-400 text-xs sm:text-sm hover:text-white transition-colors">A Propos</Link>
                    <Link href="/blog" className="text-gray-400 text-xs sm:text-sm hover:text-white transition-colors">Blog</Link>
                    <Link href="/contact" className="text-gray-400 text-xs sm:text-sm hover:text-white transition-colors">Contacts</Link>
                </div>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                    <p className="text-gray-400 text-xs sm:text-sm font-semibold">Réseaux</p>
                    <Link href="#" className="text-gray-400 text-xs sm:text-sm hover:text-white transition-colors">LinkedIn</Link>
                    <Link href="#" className="text-gray-400 text-xs sm:text-sm hover:text-white transition-colors">X</Link>
                    <Link href="#" className="text-gray-400 text-xs sm:text-sm hover:text-white transition-colors">TikTok</Link>
                </div>
            </div>
        </div>

        {/* Copyright */}
        <div className="px-4 sm:px-8 md:px-16 pb-4 mx-auto flex items-center justify-center w-full">
            <p className="text-gray-400 text-xs sm:text-sm text-center">
                Marabu services © 2026. All rights reserved. Terms of Use and Privacy Policy
            </p>
        </div>
    </footer>;
}

export default Footer;