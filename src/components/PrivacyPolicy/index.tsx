'use client'

import Link from 'next/link';
import { MotionDiv } from '@/lib/motion';

export default function PrivacyPage() {
  const lastUpdated = "February 19, 2026";
  const contactEmail = "maulana.arby10.com"; // Replace this

  return (
    <MotionDiv className="mt-20" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <header className="mb-12 border-b pb-8">
        <h1 className="text-4xl font-extrabold mb-4 tracking-tight">Privacy Policy</h1>
        <p className="text-slate-500 italic text-sm">Last Updated: {lastUpdated}</p>
      </header>

      <div className="space-y-10">
        <section>
          <h2 className="text-2xl font-semibold mb-3">1. Overview</h2>
          <p>
            This website is my professional portfolio. I use analytics tools to understand 
            how visitors interact with my work so I can improve the site&apos;s design and content.
          </p>
        </section>

        {/* Google Analytics Section - Strictly Required by Google Terms */}
        <section className="bg-orange-50/50 p-6 rounded-xl border border-orange-100">
          <h2 className="text-2xl font-semibold mb-2 text-orange-900">2. Google Analytics 4 (GA4)</h2>
          <p className="mb-4">
            I use GA4 to track visitor behavior and traffic sources. Google Analytics uses 
            <strong> cookies</strong> and identifiers to collect data such as:
          </p>
          <ul className="list-disc ml-6 space-y-2 text-slate-700 text-sm">
            <li>Approximate location (city/country level)</li>
            <li>Browser type and device information</li>
            <li>Pages visited and time spent on site</li>
          </ul>
          <p className="mt-4 text-sm italic">
            You can opt-out by using the 
            <Link href="https://tools.google.com/dlpage/gaoptout" target="_blank" className="text-orange-700 underline ml-1">Google Analytics Opt-out Add-on</Link>.
          </p>
        </section>

        {/* Vercel Analytics Section */}
        <section className="bg-blue-50/50 p-6 rounded-xl border border-blue-100">
          <h2 className="text-2xl font-semibold mb-2 text-blue-900">3. Vercel Analytics</h2>
          <p className="mb-4 text-slate-700">
            For real-time performance monitoring and web vitals, I use <strong>Vercel Analytics</strong>. 
            This is a privacy-first tool:
          </p>
          <ul className="list-disc ml-6 space-y-2 text-slate-700 text-sm">
            <li><strong>Cookieless:</strong> It does not use third-party cookies or track you across sites.</li>
            <li><strong>Anonymized:</strong> It collects aggregated data (page views and load speeds) without identifying you.</li>
            <li><strong>Retention:</strong> Data is discarded automatically after 24 hours.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-slate-800">4. Third-Party Data</h2>
          <p>
            I do not &quot;sell&quot; your data. Data processed by Google or Vercel is used solely 
            to help me build a better portfolio experience. 
          </p>
        </section>

        <section className="pt-8 border-t">
          <h2 className="text-2xl font-semibold mb-3">5. Contact Me</h2>
          <p>If you have any questions about this policy, please reach out via email:</p>
          <Link href={`mailto:${contactEmail}`} className="font-medium mt-2 text-blue-600 underline">{contactEmail}</Link>
        </section>

        <section className="pt-10 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link href="/" className="text-blue-600 font-medium hover:underline">
            &larr; Back to Portfolio
          </Link>
          <p className="text-slate-400 text-sm">Contact: {contactEmail}</p>
        </section>
      </div>
    </MotionDiv>
  );
}