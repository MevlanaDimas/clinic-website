"use client";

import { useState, useLayoutEffect } from "react";
import { MotionDiv } from "@/lib/motion";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";

interface CookieConsentProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}


export default function CookieConsent({ isOpen, setIsOpen }: CookieConsentProps) {
  const [step, setStep] = useState<"banner" | "preferences">("banner");
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);

  // Load initial state on client only
  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      Promise.resolve().then(() => {
        const saved = localStorage.getItem("cookie-prefs");
        if (!saved) {
          setIsOpen(true);
          setAnalyticsEnabled(true);
        } else {
          try {
            const { analytics } = JSON.parse(saved);
            setAnalyticsEnabled(analytics);
          } catch (e) {
            console.error("Error parsing cookie prefs", e);
            setAnalyticsEnabled(true);
          }
        }
      });
    }
  }, [setIsOpen]);

  const handleSave = (allAccepted: boolean) => {
    const prefs = {
      essential: true,
      analytics: allAccepted ? true : analyticsEnabled,
    };
    localStorage.setItem("cookie-prefs", JSON.stringify(prefs));
    setIsOpen(false);
    // Reload if analytics was turned on/off to ensure script injection updates
    window.location.reload();
  };

  if (typeof window === 'undefined' || !isOpen) return null;

  return (
    <MotionDiv initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="fixed bottom-24 left-6 right-6 md:left-6 md:right-auto md:w-100 z-100">
      <Card className="shadow-2xl border-slate-200 dark:border-slate-800">
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <span>🍪</span> {step === "banner" ? "Cookie Notice" : "Preferences"}
          </CardTitle>
          <Button variant="ghost" size="sm" className="cursor-pointer" onClick={() => setIsOpen(false)}>
            <X />
          </Button>
        </CardHeader>
        
        <CardContent className="text-sm text-muted-foreground">
          {step === "banner" ? (
            <p>I use cookies to analyze traffic and optimize your clinic&apos;s experience.</p>
          ) : (
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground text-sm">Essential</p>
                  <p className="text-xs italic">Required for secure login.</p>
                </div>
                <Switch checked className="cursor-pointer" disabled />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground text-sm">Analytics</p>
                  <p className="text-xs italic">Google Analytics tracking.</p>
                </div>
                <Switch 
                  checked={analyticsEnabled} 
                  onCheckedChange={setAnalyticsEnabled} 
                  className="cursor-pointer"
                />
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col gap-2 pt-2">
          {step === "banner" ? (
            <div className="flex w-full gap-2">
              <Button className="flex-1 cursor-pointer" onClick={() => handleSave(true)}>Accept All</Button>
              <Button variant="outline" className="flex-1 cursor-pointer" onClick={() => setStep("preferences")}>Settings</Button>
            </div>
          ) : (
            <Button className="w-full" onClick={() => handleSave(false)}>Save Choices</Button>
          )}
        </CardFooter>
      </Card>
    </MotionDiv>
  );
}