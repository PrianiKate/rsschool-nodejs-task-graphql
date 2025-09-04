import { GraphQLSchema } from 'graphql';
import { RootQueryType } from './query.js';
import { RootMutationType } from './mutation.js';

export const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});
