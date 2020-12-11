import { GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import axios from "axios";
import { UserType } from "./User";

const CompanyType = new GraphQLObjectType({
  name: "Company",
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      async resolve(parent, args) {
        const res = await axios.get(
          `http://localhost:3000/companies/${parent.id}/users`
        );
        return res.data;
      }
    }
  }
});

export { CompanyType };
