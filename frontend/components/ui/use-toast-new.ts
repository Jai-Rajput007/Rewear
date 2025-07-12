"use client"

import { useState, useEffect } from "react"

type Toast = {
  id: string
  title?: string
  description?: string
  action?: React.ReactNode
  variant?: "default" | "destructive"
}

const TOAST_LIMIT = 3
const TOAST_REMOVE_DELAY = 5000 // 5 seconds

let toasts: Toast[] = []
let listeners: ((toasts: Toast[]) => void)[] = []

const notify = () => {
  listeners.forEach((listener) => {
    listener(toasts)
  })
}

export function toast(toast: Omit<Toast, "id">) {
  const id = Math.random().toString(36).slice(2)
  toasts = [{ id, ...toast }, ...toasts].slice(0, TOAST_LIMIT)
  notify()

  setTimeout(() => {
    toasts = toasts.filter((t) => t.id !== id)
    notify()
  }, TOAST_REMOVE_DELAY)

  return {
    id,
    dismiss: () => {
      toasts = toasts.filter((t) => t.id !== id)
      notify()
    },
  }
}

export function useToast() {
  const [state, setState] = useState<Toast[]>(toasts)

  useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [])

  return {
    toasts: state,
    toast,
    dismiss: (toastId: string) => {
      toasts = toasts.filter((t) => t.id !== toastId)
      notify()
    },
  }
}
