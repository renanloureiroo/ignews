import { signIn, useSession } from "next-auth/react"
import { useState } from "react"
import ReactLoading from "react-loading"
import { api } from "../../service/api"
import { getStripeJs } from "../../service/stripeJs"
import styles from "./styles.module.scss"

interface SubscribeProps {
  priceId: string
}

export const SubscribeButton = ({}: SubscribeProps) => {
  const { data: session } = useSession()

  const [isLoading, setIsLoading] = useState(false)

  async function handleSubscribe() {
    setIsLoading(true)

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
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleSubscribe}
      className={styles.container}
      type="button"
      disabled={isLoading}
    >
      {isLoading ? (
        <ReactLoading type="spin" height={30} width={30} />
      ) : (
        "Subscribe Now"
      )}
    </button>
  )
}
