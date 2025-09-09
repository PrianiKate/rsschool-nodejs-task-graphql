import { GraphQLFloat, GraphQLInputObjectType, GraphQLString } from 'graphql';

export const ChangeUserInput = new GraphQLInputObjectType({
  name: 'ChangeUserInput',
  fields: {
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  },
});

export interface ChangeUserProps {
  name?: string;
  balance?: number;
}
