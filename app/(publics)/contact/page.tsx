import { MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const ContactPage = () => {
    return (
        <div>
            <div className='h-[300px] bg-cover bg-center flex items-center justify-center'
                style={{ backgroundImage: 'url(/imgs/Rectangle.png)' }}>
                <h1 className='text-7xl font-bold text-white'>Contact</h1>
            </div>


            <div className=''>
                <div className='w-full max-w-7xl mx-auto p-4 md:p-8 mt-5'>
                    <div>

                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-3 items-center justify-between'>
                        <div className='col-span-2 w-full h-full'>
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2642.2535112074197!2d2.646875!3d48.528373200000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e5f07f56050bef%3A0xe91cca8b47e64634!2s156%20Chem.%20des%20Montenailles%2C%2077190%20Dammarie-les-Lys%2C%20France!5e0!3m2!1sfr!2sci!4v1771845057624!5m2!1sfr!2sci" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                        <div>
                            <div className="w-full   bg-white rounded-xl    ">
                                <div className="p-4 sm:p-6 md:p-8 h-full flex flex-col">
                                    <form action="" className="flex flex-col gap-3 sm:gap-4 md:gap-5 grow">
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="name" className="text-xs sm:text-sm font-medium text-gray-700">Nom</label>
                                            <input
                                                type="text"
                                                id="name"
                                                placeholder="Votre nom"
                                                className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#789f78] focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400 text-sm sm:text-base"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="email" className="text-xs sm:text-sm font-medium text-gray-700">Adresse email</label>
                                            <input
                                                type="email"
                                                id="email"
                                                placeholder="votre.email@example.com"
                                                className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#789f78] focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400 text-sm sm:text-base"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2 grow">
                                            <label htmlFor="message" className="text-xs sm:text-sm font-medium text-gray-700">Votre message</label>
                                            <textarea
                                                id="message"
                                                placeholder="Dites-nous à propos de votre projet..."
                                                rows={4}
                                                className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#789f78] focus:border-transparent transition-all duration-200 resize-none text-gray-900 placeholder-gray-400 text-sm sm:text-base"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full bg-[#789f78] hover:bg-[#6a8f6a] text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-sm sm:text-base"
                                        >
                                            Envoyer le message
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className='w-full max-w-7xl mx-auto p-4 md:p-8 mt-5'>
                <div className='grid grid-cols-1 md:grid-cols-3 items-center justify-between'>
                    <div className='flex items-center justify-center flex-col gap-2'>
                        <MapPinIcon className='w-5 h-5 text-[#789f78]' />
                        <p className='text-sm font-bold text-center text-[#789f78]'>156 Chemin des montenailles, <br />77190 Dammarie-les-lys, France</p>
                    </div>
                    <div className='flex items-center justify-center flex-col gap-2'>
                        <MailIcon className='w-5 h-5 text-[#789f78]' />
                        <Link href='mailto:contact@btalents.services'>

                            <p className=' text-sm font-bold text-center text-[#789f78]'>contact@btalents.services</p>
                        </Link>
                    </div>
                    <div className='flex items-center justify-center flex-col gap-2'>
                        <PhoneIcon className='w-5 h-5 text-[#789f78]' />
                        <Link href='tel:+33632296136'>

                            <p className=' text-sm font-bold text-center text-[#789f78]'>+33 6 32 29 61 36</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactPage