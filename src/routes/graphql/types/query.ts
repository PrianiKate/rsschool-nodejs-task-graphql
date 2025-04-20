import { GraphQLObjectType, GraphQLString } from 'graphql';

export const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    hello: {
      type: GraphQLString,
      resolve() {
        return 'world';
      },
    },
  },
});
