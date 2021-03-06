import Image from "next/image"

import { useRouter } from "next/router"

import { ActiveLink } from "../ActiveLink"
import { SignInButton } from "../SignInButton"

import styles from "./styles.module.scss"

export const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Image
          src="/images/logo.svg"
          width="108px"
          height="30px"
          alt="ig.news"
        />

        <nav>
          <ActiveLink activeClassName={styles.active} href="/">
            <a>Home</a>
          </ActiveLink>

          <ActiveLink activeClassName={styles.active} href="/posts">
            <a>Posts</a>
          </ActiveLink>
        </nav>

        <SignInButton />
      </div>
    </header>
  )
}
