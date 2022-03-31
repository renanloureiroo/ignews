import { render, screen } from "@testing-library/react"
import { mocked } from "jest-mock"
import { getSession } from "next-auth/react"
import Post, { getServerSideProps } from "../../pages/posts/[slug]"
import { getPrismicClient } from "../../services/prismic"

jest.mock("next-auth/react")
jest.mock("../../services/prismic")

const post = {
  slug: "new-post",
  title: "My new post",
  content: "<h2>Test</h2><p>Testing post page</p>",
  updatedAt: "01 de abril de 2022",
}

describe("Post page", () => {
  it("renders correctly", () => {
    const page = render(<Post post={post} />)

    expect(screen.getByText("My new post")).toBeInTheDocument()
    expect(screen.getByTestId("content")).toContainHTML(
      "<h2>Test</h2><p>Testing post page</p>"
    )
  })

  it("redirects user if no subscription is found", async () => {
    const getSessionMocked = mocked(getSession)

    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: null,
    } as any)

    const response = await getServerSideProps({
      req: {
        cookies: {},
      },
      params: {
        slug: "new-post",
      },
    } as any)

    expect(response).toEqual(
      expect.objectContaining({
        redirect: {
          destination: "/",
          permanent: false,
        },
      })
    )
  })

  it("loads initial data", async () => {
    const getSessionMocked = mocked(getSession)
    const getPrismicClientMocked = mocked(getPrismicClient)

    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [{ type: "heading", text: "My new post test" }],
          content: [
            {
              type: "paragraph",
              text: "Content test",
            },
          ],
        },
        last_publication_date: "04/01/2022",
      }),
    } as any)

    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: "active",
    } as any)

    const response = await getServerSideProps({
      params: {
        slug: "my-new-post-test",
      },
    } as any)

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: "my-new-post-test",
            title: "My new post test",
            content: "<p>Content test</p>",
            updatedAt: "01 de abril de 2022",
          },
        },
      })
    )
  })
})
