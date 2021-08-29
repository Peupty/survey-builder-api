export const asd = "asd"
export const IN_PRODUCTION = process.env.NODE_ENV === "production"
export const GRAPHQL_PORT = IN_PRODUCTION ? process.env.PORT : 3000
