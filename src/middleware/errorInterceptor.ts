import { ArgumentValidationError, MiddlewareFn } from "type-graphql"

export const ErrorInterceptor: MiddlewareFn<any> = async (
  { context },
  next
) => {
  try {
    return await next()
  } catch (error) {
    // todo
    throw error
  }
}
