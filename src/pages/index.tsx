import Image from "next/image"
import Head from "next/head"

import styles from "./home.module.scss"

import GirlSvg from "../public/images/avatar.svg"
import { SubscribeButton } from "../components/SubscribeButton"

export default function Home() {
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
            <span>for $9,90 month</span>
          </p>

          <SubscribeButton />
        </section>
        <Image src={GirlSvg} alt="Girl coding" />
      </main>
    </>
  )
}
