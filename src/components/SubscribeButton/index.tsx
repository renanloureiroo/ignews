import styles from "./styles.module.scss"

interface SubscribeProps {
  priceId: string
}

export const SubscribeButton = ({}: SubscribeProps) => {
  return (
    <button className={styles.container} type="button">
      Subscribe Now
    </button>
  )
}
