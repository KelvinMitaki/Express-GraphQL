import { GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import axios from "axios";

const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLString }
  }
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: {
        id: { type: GraphQLString }
      },
      async resolve(parent, args, ctx, info) {
        const res = await axios.get(`http://localhost:3000/users/${args.id}`);
        return res.data;
      }
    }
  }
});

const schema = new GraphQLSchema({
  query: RootQuery
});

export { schema };
