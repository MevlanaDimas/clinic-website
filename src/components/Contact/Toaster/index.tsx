'use client'

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { MotionDiv } from '@/lib/motion';


interface ToasterProps {
    open: boolean;
    setIsOpen: (open: boolean) => void;
    isSuccess: boolean;
}

const Toaster = ({ open, setIsOpen, isSuccess }: ToasterProps) => {
    return (
        <Dialog open={open} onOpenChange={setIsOpen}>
            <MotionDiv initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }}>
            <DialogContent className={`sm:max-w-75 border-none ${isSuccess ? "bg-green-400/15" : "bg-red-400/15"} backdrop-blur shadow-2xl rounded-2xl flex flex-col items-center justify-center gap-4 animate-in fade-in zoom-in duration-300 py-10 px-50 group`}>
                {isSuccess ? (
                    <div className="flex flex-col items-center gap-5 w-full">
                        <div className="bg-green-200 w-20 h-20 rounded-full justify-center flex items-center group-data-[state=open]:animate-in group-data-[state=closed]:animate-out zoom-in spin-in-180 zoom-out spin-out-180 duration-700">
                            <CheckCircle2 size={75} className="text-green-600" />
                        </div>
                        <p className="font-semibold text-gray-900 whitespace-nowrap">Message Sent!</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-5">
                        <div className="bg-red-200 w-20 h-20 rounded-full justify-center flex items-center group-data-[state=open]:animate-in group-data-[state=closed]:animate-out zoom-in spin-in-180 zoom-out spin-out-180 duration-700">
                            <AlertCircle size={75} className="text-red-600" />
                        </div>
                        <p className="font-semibold text-gray-900 whitespace-nowrap">Failed to send</p>
                    </div>
                )}
            </DialogContent>
            </MotionDiv>
        </Dialog>
    )
};

export default Toaster;