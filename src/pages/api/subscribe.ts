import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"

import { stripe } from "../../service/stripe"

const subscribe = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  if (request.method === "POST") {
    const session = await getSession({ req: request })

    const stripeCustomer = await stripe.customers.create({
      email: session.user.email,
      //metadata
    })

    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: stripeCustomer.id,
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
