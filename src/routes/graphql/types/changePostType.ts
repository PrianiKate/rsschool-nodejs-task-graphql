import { GraphQLInputObjectType, GraphQLString } from 'graphql';

export const ChangePostInput = new GraphQLInputObjectType({
  name: 'ChangePostInput',
  fields: {
    title: { type: GraphQLString },
    content: { type: GraphQLString },
  },
});

export interface ChangePostProps {
  title?: string;
  content?: string;
}
