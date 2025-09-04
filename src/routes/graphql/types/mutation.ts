import { GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { PostType } from './postType.js';
import { CreatePostProps, CreatePostType } from './createPostType.js';
import { PrismaContext } from './prismaContext.js';

export const RootMutationType = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    createPost: {
      type: new GraphQLNonNull(PostType),
      args: { dto: { type: new GraphQLNonNull(CreatePostType) } },
      resolve: (
        _parent,
        args: { dto: CreatePostProps },
        context: PrismaContext,
      ) => {
        return context.prisma.post.create({
          data: args.dto,
        });
      },
    },
  },
});
