import { GetStaticProps } from "next"
import Image from "next/image"
import Head from "next/head"

import styles from "./home.module.scss"

import GirlSvg from "../public/images/avatar.svg"
import { SubscribeButton } from "../components/SubscribeButton"
import { stripe } from "../service/stripe"

interface HomeProps {
  product: {
    priceId: string
    amount: string
  }
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome!</span>

          <h1>
            New about the <span>React</span> world.
          </h1>

          <p>
            Get access to all publications <br />
            <span>for {product.amount} month</span>
          </p>

          <SubscribeButton priceId={product.priceId} />
        </section>
        <Image src={GirlSvg} alt="Girl coding" />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve("price_1K8sVdGa3f7tXphT1qyQL8DE")
  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price.unit_amount / 100),
  }
  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  }
}
