export interface ToastProps {
  variant?: "default" | "destructive"
  className?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export interface ToastActionElement extends React.ReactElement {}
