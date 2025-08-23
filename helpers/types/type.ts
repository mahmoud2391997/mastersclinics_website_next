export type Toast = {
  id: string
  title: string
  message: string
  type: "success" | "error" | "info" | "warning"
  duration?: number
  dismissed?: boolean
}

export type State = Toast[]

export type Action =
  | { type: "ADD_TOAST"; toast: Toast }
  | { type: "UPDATE_TOAST"; toast: Partial<Toast> & { id: string } }
  | { type: "DISMISS_TOAST"; toastId?: string }
  | { type: "REMOVE_TOAST"; toastId?: string }

export function toastReducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_TOAST":
      return [...state, action.toast]

    case "UPDATE_TOAST":
      return state.map((t) =>
        t.id === action.toast.id ? { ...t, ...action.toast } : t
      )

    case "DISMISS_TOAST":
      return state.map((t) =>
        action.toastId === undefined || t.id === action.toastId
          ? { ...t, dismissed: true }
          : t
      )

    case "REMOVE_TOAST":
      return state.filter(
        (t) => action.toastId === undefined || t.id !== action.toastId
      )

    default:
      return state
  }
}