import { Client } from "faunadb"

const fauna = new Client({
  secret: process.env.FAUNADB_SECRET_KEY,
  domain: "db.us.fauna.com",
})

export { fauna }
