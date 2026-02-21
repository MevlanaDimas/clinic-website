"use client"

import { cn } from "@/lib/utils"
import { MotionDiv } from "@/lib/motion"

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <MotionDiv
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      initial={{ opacity: 0.85 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
      {...(props as any)}
    />
  )
}

export { Skeleton }
