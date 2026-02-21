'use client'

import Link from 'next/link';
import { MotionDiv } from '@/lib/motion';

export default function TermsOfService() {
  const lastUpdated = "February 19, 2026";

  return (
    <MotionDiv className="max-w-3xl mx-auto mt-15 py-8 px-6 font-sans text-slate-800 leading-relaxed" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-4xl font-extrabold mb-4">Terms of Service</h1>
      <p className="text-slate-500 mb-10 text-sm italic">Last Updated: {lastUpdated}</p>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-2">1. Acceptance of Terms</h2>
          <p>
            By accessing this portfolio website, you agree to be bound by these Terms of Service 
            and all applicable laws and regulations. If you do not agree with any of these terms, 
            you are prohibited from using or accessing this site.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">2. Intellectual Property Rights</h2>
          <p>
            Unless otherwise stated, all content on this website—including code snippets, 
            designs, graphics, and text—is my intellectual property. 
          </p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>You may view and download my projects for personal, non-commercial use only.</li>
            <li>You may not redistribute or &quot;clone&quot; my portfolio design as your own without permission.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">3. Accuracy of Materials</h2>
          <p>
            The materials appearing on this website are for showcase purposes and could include 
            technical, typographical, or photographic errors. I do not warrant that any of the 
            materials on this website are accurate, complete, or current.
          </p>
        </section>

        <section className="bg-slate-50 p-6 rounded-lg border border-slate-200 text-sm">
          <h2 className="text-xl font-semibold mb-2">4. Disclaimer & Limitation of Liability</h2>
          <p className="uppercase font-medium mb-2">Notice to Users:</p>
          <p>
            This website is provided &quot;as is&quot;. I make no warranties, expressed or implied. 
            In no event shall I be liable for any damages (including, without limitation, damages 
            for loss of data or profit) arising out of the use or inability to use the materials 
            on this website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">5. External Links</h2>
          <p>
            I have not reviewed all of the sites linked to this portfolio (like GitHub repositories 
            or external project demos) and am not responsible for the contents of any such linked site. 
          </p>
        </section>
      </div>

      <footer className="mt-16 pt-8 border-t flex justify-between items-center">
        <Link href="/" className="text-blue-600 hover:underline">&larr; Back to Home</Link>
        <Link href="/privacy" className="text-slate-400 hover:underline text-sm">Privacy Policy</Link>
      </footer>
    </MotionDiv>
  );
}