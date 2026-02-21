'use client'

import Link from 'next/link';
import { MotionDiv } from '@/lib/motion';

export default function CookiePolicy() {
  const lastUpdated = "February 19, 2026";

  return (
    <MotionDiv className="mt-20" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <header className="mb-10 border-b pb-8">
        <h1 className="text-4xl font-extrabold mb-4 tracking-tight text-slate-900">Cookie Policy</h1>
        <p className="text-slate-500 italic">Last Updated: {lastUpdated}</p>
      </header>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-3">1. What are Cookies?</h2>
          <p>
            Cookies are small text files stored on your device when you visit a website. They help the 
            site remember your preferences and understand how you use the pages.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">2. How I Use Cookies</h2>
          <p className="mb-4">
            On this portfolio, I use cookies primarily for **Google Analytics**. This helps me see 
            which projects are getting the most attention and which regions my visitors are from.
          </p>
          
          <table className="min-w-full border-collapse border border-slate-200 text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="border border-slate-200 p-2 text-left">Cookie Type</th>
                <th className="border border-slate-200 p-2 text-left">Provider</th>
                <th className="border border-slate-200 p-2 text-left">Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-200 p-2 font-medium">Analytics</td>
                <td className="border border-slate-200 p-2">Google Analytics</td>
                <td className="border border-slate-200 p-2">Distinguishes unique users and throttles request rates.</td>
              </tr>
              <tr>
                <td className="border border-slate-200 p-2 font-medium">Performance</td>
                <td className="border border-slate-200 p-2">Vercel</td>
                <td className="border border-slate-200 p-2">Vercel Analytics is generally cookieless but may use technical headers for performance.</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">3. Your Choices</h2>
          <p>
            You have the right to decide whether to accept or reject cookies. Most web browsers 
            automatically accept cookies, but you can usually modify your browser setting to decline 
            them if you prefer.
          </p>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-100">
          <h2 className="text-xl font-semibold mb-2">4. Third-Party Cookies</h2>
          <p className="text-sm">
            Please note that third parties (such as LinkedIn or GitHub if I embed their widgets) 
            may also use cookies, over which I have no control. You should check their respective 
            cookie policies for more information.
          </p>
        </section>
      </div>

      <footer className="mt-16 pt-8 border-t flex flex-wrap gap-4 text-sm text-slate-500">
        <Link href="/" className="hover:text-slate-900 underline">Home</Link>
        <Link href="/privacy" className="hover:text-slate-900 underline">Privacy Policy</Link>
        <Link href="/terms" className="hover:text-slate-900 underline">Terms of Service</Link>
      </footer>
    </MotionDiv>
  );
}