import Image from "next/image"

import { useRouter } from "next/router"

import Logo from "../../public/images/logo.svg"
import { ActiveLink } from "../ActiveLink"
import { SignInButton } from "../SignInButton"

import styles from "./styles.module.scss"

export const Header = () => {
  const { asPath } = useRouter()
  console.log(asPath)
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Image src={Logo} alt="ig.news" />

        <nav>
          <ActiveLink activeClassName={styles.active} href="/">
            <a>Home</a>
          </ActiveLink>

          <ActiveLink activeClassName={styles.active} href="/posts" prefetch>
            <a>Posts</a>
          </ActiveLink>
        </nav>

        <SignInButton />
      </div>
    </header>
  )
}
