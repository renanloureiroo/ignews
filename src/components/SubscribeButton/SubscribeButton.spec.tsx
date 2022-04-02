import { render, screen, fireEvent, act } from "@testing-library/react"
import { mocked } from "jest-mock"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/router"

import { SubscribeButton } from "."

import { api } from "../../services/api"
import { getStripeJs } from "../../services/stripeJs"

jest.mock("next-auth/react")
jest.mock("../../services/api")
jest.mock("../../services/stripeJs")
jest.mock("next/router")

const apiMocked = api as jest.Mocked<typeof api>

describe("SubscribeButton component", () => {
  it("renders correctly", () => {
    const useSessionMocked = mocked(useSession)
    useSessionMocked.mockReturnValue({
      data: null,
      status: "unauthenticated",
    })

    render(<SubscribeButton />)
    expect(screen.getByText("Subscribe Now")).toBeInTheDocument()
  })

  it("redirects user to sign in when not authenticated", () => {
    const signInMocked = mocked(signIn)
    // const useSessionMocked = mocked(useSession)

    // useSessionMocked.mockReturnValueOnce({
    //   data: null,
    //   status: "unauthenticated",
    // })
    render(<SubscribeButton />)

    const subscribeButton = screen.getByText("Subscribe Now")

    fireEvent.click(subscribeButton)

    expect(signInMocked).toHaveBeenCalled()
  })

  it("redirects to posts when user already has a subscription", () => {
    const useSessionMocked = mocked(useSession)
    const useRouterMocked = mocked(useRouter)

    const pushMocked = jest.fn()

    useSessionMocked.mockReturnValueOnce({
      data: {
        user: {
          name: "John Doe",
          email: "johndoe@email.com",
          image: "http://github.com/renanloureiroo.png",
        },
        expires: "fake-expires",
        activeSubscription: "active",
      },
      status: "authenticated",
    })
    useRouterMocked.mockReturnValueOnce({
      push: pushMocked,
    } as any)

    render(<SubscribeButton />)

    const subscribeButton = screen.getByText("Subscribe Now")

    fireEvent.click(subscribeButton)

    expect(pushMocked).toHaveBeenCalledWith("/posts")
  })
})
