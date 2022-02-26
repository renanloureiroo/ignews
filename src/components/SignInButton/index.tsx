import { FaGithub } from "react-icons/fa"
import { FiX } from "react-icons/fi"
import styles from "./styles.module.scss"
export const SignInButton = () => {
  const isLogged = true

  return isLogged ? (
    <button type="button" className={styles.container}>
      <FaGithub color="#04D361" />
      Renan Loureiro
      <FiX color="#737380" />
    </button>
  ) : (
    <button type="button" className={styles.container}>
      <FaGithub color="#eba417" /> Sign in With Github
    </button>
  )
}
