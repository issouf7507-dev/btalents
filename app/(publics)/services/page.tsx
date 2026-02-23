
import { FeaturesSection } from '@/components/blocks/feature-section'
import { ArrowRightIcon } from 'lucide-react'
import Image from 'next/image'



const ServicesPage = () => {
  return (
    <div className=''>


      <div className='h-[300px] bg-cover bg-center flex items-center justify-center'
        style={{ backgroundImage: 'url(/imgs/Rectangle.png)' }}>
        <h1 className='text-7xl font-bold text-white'>Services</h1>
      </div>





      <div className='max-w-7xl mx-auto py-20 px-4'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl md:text-5xl font-bold text-[#789f78] dark:text-neutral-100 mb-4'>
            Nos Solutions RH
          </h2>
          <p className='text-lg text-muted-foreground max-w-3xl mx-auto'>
            Des services sur-mesure pour transformer votre gestion des ressources humaines et accompagner votre croissance
          </p>
        </div>
        <FeaturesSection />
      </div>

    </div>
  )
}

export default ServicesPage