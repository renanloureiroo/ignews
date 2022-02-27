import { signIn, useSession } from "next-auth/react"
import { api } from "../../service/api"
import { getStripeJs } from "../../service/stripeJs"
import styles from "./styles.module.scss"

interface SubscribeProps {
  priceId: string
}

export const SubscribeButton = ({}: SubscribeProps) => {
  const { data: session } = useSession()

  async function handleSubscribe() {
    if (!session) {
      signIn("github")
      return
    }

    try {
      const response = await api.post("/subscribe")

      const { sessionId } = response.data

      const stripe = await getStripeJs()

      stripe.redirectToCheckout({ sessionId })
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <button
      onClick={handleSubscribe}
      className={styles.container}
      type="button"
    >
      Subscribe Now
    </button>
  )
}
