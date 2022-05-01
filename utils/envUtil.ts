export const NEXT_PUBLIC_URL_API_GRAPHQL: string = process.env
  .NEXT_PUBLIC_URL_API
  ? `${process.env.NEXT_PUBLIC_URL_API}graphql`
  : ''
export const NEXT_PUBLIC_URL_API: string = process.env.NEXT_PUBLIC_URL_API || ''
export const NEXT_PUBLIC_TAX: number = +process.env.NEXT_PUBLIC_TAX! || 0
export const URL_API_GRAPHQL: string = process.env.URL_API
  ? `${process.env.URL_API}graphql`
  : ''
export const NEXT_PUBLIC_PAYPAL_CLIENT_ID: string =
  process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || ''

export const REVALIDATE: number = +process.env.REVALIDATE! || 86400000
export const NEXT_PUBLIC_REVALIDATE_DASHBOARD: number =
  +process.env.NEXT_PUBLIC_REVALIDATE_DASHBOARD! || 30
