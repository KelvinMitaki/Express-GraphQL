import express from "express";
import { graphqlHTTP } from "express-graphql";

const app = express();

app.use(
  "/graphql",
  // @ts-ignore
  graphqlHTTP({
    graphiql: true
  })
);

app.listen(4000, () => console.log("server started on port 4000"));
