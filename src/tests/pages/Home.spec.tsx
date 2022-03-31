import { render, screen, waitFor } from "@testing-library/react"
import { mocked } from "jest-mock"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import Home, { getStaticProps } from "../../pages"
import { stripe } from "../../services/stripe"

jest.mock("next-auth/react")
jest.mock("next/router")
jest.mock("../../services/stripe")

describe("Home page", () => {
  it("renders correctly", () => {
    const useSessionMocked = mocked(useSession)
    // const useRouterMocked = mocked(useRouter)

    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: "unauthenticated",
    })

    // useRouterMocked.mockReturnValueOnce({
    //   post: jest.fn(),
    // } as any)

    render(
      <Home
        product={{
          priceId: "fake-price-id",
          amount: "R$10,00",
        }}
      />
    )

    expect(screen.getByText("for R$10,00 month")).toBeInTheDocument()
  })

  it("loads initial data", async () => {
    const retrieveMocked = mocked(stripe.prices.retrieve)

    retrieveMocked.mockResolvedValueOnce({
      id: "fake-price-id",
      unit_amount: 1000,
    } as any)
    const response = await getStaticProps({})

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          product: {
            priceId: "fake-price-id",
            amount: "$10.00",
          },
        },
      })
    )
  })
})
