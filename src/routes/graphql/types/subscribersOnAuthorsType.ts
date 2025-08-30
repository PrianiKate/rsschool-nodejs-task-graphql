import { GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { UUIDType } from './uuid.js';

export const SubscribersOnAuthorsType = new GraphQLObjectType({
  name: 'SubscribersOnAuthorsType',
  fields: {
    subscriberId: { type: new GraphQLNonNull(UUIDType) },
    authorId: { type: new GraphQLNonNull(UUIDType) },
  },
});
