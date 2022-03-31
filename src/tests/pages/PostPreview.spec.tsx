import { render, screen } from "@testing-library/react"
import { mocked } from "jest-mock"
import PostPreview, {
  getStaticProps,
  getStaticPaths,
} from "../../pages/posts/preview/[slug]"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { getPrismicClient } from "../../services/prismic"

const post = {
  slug: "new-post",
  title: "My new post",
  content: "<h2>Test</h2><p>Testing post page</p>",
  updatedAt: "01 de abril de 2022",
}

jest.mock("next-auth/react")
jest.mock("next/router")
jest.mock("../../services/prismic")

describe("PostPreview Page", () => {
  it("renders correctly", () => {
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: "unauthenticated",
    })

    render(<PostPreview post={post} />)

    expect(screen.getByText("My new post")).toBeInTheDocument()
    expect(screen.getByTestId("contentPreview")).toContainHTML(
      "<h2>Test</h2><p>Testing post page</p>"
    )
    expect(screen.getByText("Wanna continue reading?")).toBeInTheDocument()
  })

  it("redirects to post page if active subscription", () => {
    const useSessionMocked = mocked(useSession)
    const useRouterMocked = mocked(useRouter)

    useSessionMocked.mockReturnValueOnce({
      data: {
        activeSubscription: "active",
      },
      status: "authenticated",
    } as any)

    const pushMocked = jest.fn()

    useRouterMocked.mockReturnValueOnce({
      push: pushMocked,
    } as any)

    render(<PostPreview post={post} />)

    expect(pushMocked).toHaveBeenCalledWith("/posts/new-post")
  })

  it("loads initial data", async () => {
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

    const response = await getStaticProps({ params: { slug: "new-post" } })

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: "new-post",
            title: "My new post test",
            content: "<p>Content test</p>",
            updatedAt: "01 de abril de 2022",
          },
        },
      })
    )
  })
})
