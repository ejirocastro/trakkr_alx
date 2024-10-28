import React from 'react'
import Hero from '../components/Hero/Hero'
import Features from '../components/Features/Features'
import WhyChooseUs from '../components/WhyChooseUs/WhyChooseUs'
import Pricing from '../components/Prcing/Pricing'
import FAQ from '../components/FAQ/Faq'
import CTA from '../components/CTA/Cta'
import Contact from '../components/Contact/Contact'

const Landing = () =>
{
    return (
        <>
            <Hero />
            <Features />
            <WhyChooseUs />
            <Pricing />
            <FAQ />
            <CTA />
            <Contact />
        </>
    )
}

export default Landing