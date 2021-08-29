import { aErrorable } from "@interfaces/Errorable"

export const readErrors = <T>(errorable: aErrorable<T>): T[] => {
  return errorable.errors
}
