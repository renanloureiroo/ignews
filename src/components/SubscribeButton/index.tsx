import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useState } from "react"
import ReactLoading from "react-loading"
import { api } from "../../services/api"
import { getStripeJs } from "../../services/stripeJs"
import styles from "./styles.module.scss"

export const SubscribeButton = () => {
  const { data: session } = useSession()
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  async function handleSubscribe() {
    setIsLoading(true)

    if (!session) {
      signIn("github")
      return
    }

    if (session.activeSubscription) {
      router.push("/posts")
      setIsLoading(false)
      return
    }

    try {
      const response = await api.post("/subscribe")
      console.log("response", response)

      const { sessionId } = response.data

      console.log(sessionId)

      const stripe = await getStripeJs()
      console.log(stripe)
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
