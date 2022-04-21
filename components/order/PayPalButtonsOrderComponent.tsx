import { FC } from 'react'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { axiosGraphqlUtils, Toast } from '../../utils'
import { payPaypalGql } from '../../gql'
import { useSession0 } from '../../hooks/useSession0'
import { useRouter } from 'next/router'

export interface IPayPalButtonsOrderComponentProps {
  total: number
  orderId: string
  setIsPaying: (value: boolean) => void
}

export const PayPalButtonsOrderComponent: FC<IPayPalButtonsOrderComponentProps> = ({
  total,
  orderId,
  setIsPaying
}) => {
  const session = useSession0()
  const router = useRouter()
  return (
    <PayPalButtons
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: total.toString()
              }
            }
          ]
        })
      }}
      onApprove={(data, actions) => {
        return actions.order!.capture().then(async details => {
          if (details.status !== 'COMPLETED') {
            Toast.fire({
              icon: 'error',
              title: 'Error con el pago de PayPal'
            })
          } else {
            setIsPaying(true)
            try {
              const data = await axiosGraphqlUtils({
                query: payPaypalGql,
                variables: {
                  input: {
                    orderId,
                    transactionId: details.id,
                    userId: session?.user.id
                  }
                }
              })

              if (data.errors) {
                Toast.fire({
                  icon: 'error',
                  title: data.errors[0].message
                })
                setIsPaying(false)
              } else {
                Toast.fire({
                  icon: 'success',
                  iconColor: '#2563EB',
                  title: data.data.payPaypal
                }).then(() => {
                  router.reload()
                })
              }
            } catch (error) {
              Toast.fire({
                icon: 'error',
                title: 'Error con el pago de PayPal'
              })
              setIsPaying(false)
            }
          }
        })
      }}
    />
  )
}
