import { GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import axios from "axios";
import { CompanyType } from "./Company";
const UserType: GraphQLObjectType = new GraphQLObjectType({
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
export { UserType };
