import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql';
import { UUIDType } from './uuid.js';

export const CreatePostType = new GraphQLInputObjectType({
  name: 'CreatePostType',
  fields: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    authorId: { type: new GraphQLNonNull(UUIDType) },
  },
});

export interface CreatePostProps {
  title: string;
  content: string;
  authorId: string;
}
