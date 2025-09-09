import { GraphQLInputObjectType, GraphQLInt, GraphQLNonNull, GraphQLString } from "graphql";

export const CreateUserType = new GraphQLInputObjectType({
  name: 'CreateUserType',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLInt) },
  },
});

export interface CreateUserProps {
  name: string;
  balance: number;
}
