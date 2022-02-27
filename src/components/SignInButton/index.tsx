import { useSession, signIn, signOut } from "next-auth/react"

import { FaGithub } from "react-icons/fa"
import { FiX } from "react-icons/fi"
import styles from "./styles.module.scss"
export const SignInButton = () => {
  const { data: session } = useSession()

  console.log(session)

  return session ? (
    <button type="button" className={styles.container}>
      {/* <FaGithub color="#04D361" /> */}
      <img src={session.user.image} alt="User photo" />
      {session.user.name}
      <FiX color="#737380" onClick={() => signOut()} />
    </button>
  ) : (
    <button
      onClick={() => signIn("github")}
      type="button"
      className={styles.container}
    >
      <FaGithub color="#eba417" /> Sign in With Github
    </button>
  )
}
