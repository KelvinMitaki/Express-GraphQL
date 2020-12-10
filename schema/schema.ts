import { GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";

const users = [
  {
    id: "1",
    firstName: "kevin",
    age: 20
  },
  {
    id: "2",
    firstName: "brian",
    age: 22
  },
  {
    id: "3",
    firstName: "wesley",
    age: 26
  }
];

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
      resolve(parent, args, ctx, info) {
        return users.find(usr => usr.id === args.id);
      }
    }
  }
});

const schema = new GraphQLSchema({
  query: RootQuery
});

export { schema };
