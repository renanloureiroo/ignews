import { signIn, useSession } from "next-auth/react"
import styles from "./styles.module.scss"

interface SubscribeProps {
  priceId: string
}

export const SubscribeButton = ({}: SubscribeProps) => {
  const { data: session } = useSession()
  function handleSubscribe() {
    if (!session) {
      signIn("github")
      return
    }
  }

  return (
    <button className={styles.container} type="button">
      Subscribe Now
    </button>
  )
}
