"use client"

import Image from "next/image";
import contactBanner from '../../../public/excited-asian-female-doctor-points-left-wears-medical-mask-as-covid-preventive-measures-standing.jpg';
import { useEffect, useState } from "react";
import { ContactForm } from "./Form";
import { FaWhatsapp } from "react-icons/fa";
import Toaster from "./Toaster";
import { MotionDiv } from "@/lib/motion";


const ContactUs = ({ mobileCheck }: { mobileCheck: boolean }) => {
  const [loading, setLoading] = useState(false);
  const [open, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);
  const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '1234567890';

  useEffect(() => {
      if (open) {
          const timer = setTimeout(() => {
              setIsOpen(false);
          }, 3000);

          return () => clearTimeout(timer);
      }
      return;
  }, [open]);

  const onWhatsappClick = () => {
    const encodedMessage = encodeURIComponent("Hello, I want to ask about ...");

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
  }

  return (
    <MotionDiv className={`${mobileCheck ? "mt-24" : ""}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
    >
      <Toaster open={open} setIsOpen={setIsOpen} isSuccess={isSuccess} />
      <div className="w-full bg-gray-50 pb-20">
        {/* Hero Banner */}
        <div className="relative w-full h-75 md:h-100 lg:h-screen flex items-center justify-center text-center md:justify-start md:text-left">
          <Image
            src={contactBanner}
            alt="Contact Banner"
            fill
            className="object-cover object-top"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="container mx-auto px-4 md:px-50 relative z-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">Get in Touch</h1>
          </div>
        </div>

        <div className="w-full py-10 md:py-15">
          <div className="container mx-auto px-4 text-center md:text-left">
            <p className="text-lg sm:text-xl md:text-2xl font-light leading-relaxed max-w-4xl mx-auto md:mx-0">
              Have questions or need assistance? Fill out the form below, and our team will get back to you shortly.
            </p>
          </div>
        </div>

          <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Left Column: Form */}
            <div className="lg:col-span-2 px-8">
              <MotionDiv initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45 }}>
                <ContactForm loading={loading} setLoading={setLoading} setIsSuccess={setIsSuccess} setIsOpen={setIsOpen} />
              </MotionDiv>
            </div>

            {/* Right Column: WhatsApp */}
            <div className="lg:col-span-1 flex flex-col gap-8 lg:top-24 h-full items-center justify-center">
              <div className="p-8 flex flex-col items-center gap-3">
                <h2 className="text-xl font-bold text-gray-900 mb-2 self-start">Prefer WhatsApp?</h2>
                <p className="text-gray-600 mb-6">
                  You can also reach us directly via WhatsApp for quick queries.
                </p>
                <button
                  onClick={onWhatsappClick}
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-7 rounded-lg text-lg cursor-pointer flex items-center justify-center gap-2"
                >
                  <FaWhatsapp size={45} />
                  Chat on WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
              Here is our location
            </h2>
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="flex flex-col justify-center p-8 md:p-12 bg-gray-50 rounded-2xl border border-gray-100 h-full">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Visit Us</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Jl. Jend. Sudirman No.325, Sokanegara,<br className="hidden md:block" />
                  Kec. Purwokerto Timur, Kabupaten Banyumas,<br className="hidden md:block" />
                  Jawa Tengah 53115
                </p>
              </div>
              <div className="w-full h-75 md:h-100 rounded-2xl overflow-hidden shadow-lg border border-gray-200 relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d16896.986783126278!2d109.21985065246558!3d-7.424504281375932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e655e6385852c5b%3A0xe926d2be744602b3!2sJl.%20Jend.%20Sudirman%20No.325%2C%20Purwokerto%2C%20Sokanegara%2C%20Kec.%20Purwokerto%20Tim.%2C%20Kabupaten%20Banyumas%2C%20Jawa%20Tengah%2053115!5e1!3m2!1sid!2sid!4v1767970000163!5m2!1sid!2sid"
                  title="Our Clinic Site"
                  width="100%"
                  height="100%"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 border-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MotionDiv>
  );
};

export default ContactUs;