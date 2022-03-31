import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import { query as q } from "faunadb"

import { stripe } from "../../services/stripe"
import { fauna } from "../../services/fauna"

type User = {
  ref: {
    id: string
  }
  data: {
    stripe_customer_id: string
  }
}

const subscribe = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  if (request.method === "POST") {
    const session = await getSession({ req: request })

    const user = await fauna.query<User>(
      q.Get(q.Match(q.Index("user_by_email"), q.Casefold(session.user.email)))
    )

    let costumerId = user.data.stripe_customer_id

    if (!costumerId) {
      const stripeCustomer = await stripe.customers.create({
        name: session.user.name,
        email: session.user.email,
        //metadata
      })
      costumerId = stripeCustomer.id

      await fauna.query(
        q.Update(q.Ref(q.Collection("users"), user.ref.id), {
          data: {
            stripe_customer_id: stripeCustomer.id,
          },
        })
      )
    }

    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: costumerId,
      mode: "subscription",
      payment_method_types: ["card"],
      billing_address_collection: "required",
      line_items: [
        {
          price: "price_1K8sVdGa3f7tXphT1qyQL8DE",
          quantity: 1,
        },
      ],
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_SUCCESS_CANCEL,
    })

    return response.status(200).json({ sessionId: stripeCheckoutSession.id })
  } else {
    response.setHeader("Allow", "POST")
    response.status(405).end("Method not allowed")
  }
}

export default subscribe
