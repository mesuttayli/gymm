import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Services from '@/components/Services'
import Trainers from '@/components/Trainers'
import Gallery from '@/components/Gallery'
import Schedule from '@/components/Schedule'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Trainers />
        <Gallery />
        <Schedule />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
