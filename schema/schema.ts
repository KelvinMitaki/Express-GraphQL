import { GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import axios from "axios";

const CompanyType = new GraphQLObjectType({
  name: "Company",
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString }
  }
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLString },
    company: {
      type: CompanyType,
      async resolve(parent, args) {
        const res = await axios.get(
          `http://localhost:3000/companies/${parent.companyId}`
        );
        return res.data;
      }
    }
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
    },
    company: {
      type: CompanyType,
      args: {
        id: { type: GraphQLString }
      },
      async resolve(parent, args) {
        const res = await axios.get(
          `http://localhost:3000/companies/${args.id}`
        );
        return res.data;
      }
    }
  }
});

const schema = new GraphQLSchema({
  query: RootQuery
});

export { schema };
