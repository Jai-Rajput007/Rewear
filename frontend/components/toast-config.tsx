"use client"

import * as React from "react"
import { ToastProvider } from "@/components/ui/toast"

export function ToastConfig({ children }: { children: React.ReactNode }) {
  return <ToastProvider>{children}</ToastProvider>
}
