import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from './uuid.js';
import { UserType } from './userType.js';
import { PrismaContext } from './prismaContext.js';

export const PostType = new GraphQLObjectType({
  name: 'PostType',
  fields: {
    id: { type: new GraphQLNonNull(UUIDType) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    author: {
      type: UserType,
      resolve: (parent: { authorId: string }, _args, context: PrismaContext) => {
        return context.prisma.user.findUnique({ where: { id: parent.authorId } });
      },
    },
  },
});
