import toast, { Toast } from "react-hot-toast"

export type ToastNotification = (
  message: string,
  options: OptionsToasNotfifications
) => string

type OptionsToasNotfifications = {
  type?: "success" | "error" | "loading" | "custom"
  options?:
    | Partial<
        Pick<
          Toast,
          | "id"
          | "icon"
          | "duration"
          | "ariaProps"
          | "className"
          | "style"
          | "position"
          | "iconTheme"
        >
      >
    | undefined
}

export const toastNotification: ToastNotification = (
  message,
  { type = "success", options }
) =>
  toast[type](message, {
    ...options,
    position: "bottom-right"
  })
