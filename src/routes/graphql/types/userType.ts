import {
  GraphQLFieldConfigMap,
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { UUIDType } from './uuid.js';
import { ProfileType } from './profileType.js';
import { PrismaContext } from './prismaContext.js';
import { PostType } from './postType.js';

export const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: (): GraphQLFieldConfigMap<{ id: string }, PrismaContext> => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
    profile: {
      type: ProfileType,
      resolve: (parent: { id: string }, _args, context: PrismaContext) => {
        return context.prisma.profile.findUnique({ where: { userId: parent.id } });
      },
    },
    posts: {
      type: new GraphQLNonNull(new GraphQLList(PostType)),
      resolve: (parent: { id: string }, _args, context: PrismaContext) => {
        return context.prisma.post.findMany({ where: { authorId: parent.id } });
      },
    },
    userSubscribedTo: {
      type: new GraphQLNonNull(new GraphQLList(UserType)),
      resolve: async (parent: { id: string }, _args, context: PrismaContext) => {
        const deps = await context.prisma.subscribersOnAuthors.findMany({
          where: { subscriberId: parent.id },
        });
        const authorIds = deps.map((s) => s.authorId);
        return context.prisma.user.findMany({ where: { id: { in: authorIds } } });
      },
    },
    subscribedToUser: {
      type: new GraphQLNonNull(new GraphQLList(UserType)),
      resolve: async (parent: { id: string }, _args, context: PrismaContext) => {
        const deps = await context.prisma.subscribersOnAuthors.findMany({
          where: { authorId: parent.id },
        });
        const subscriberIds = deps.map((s) => s.subscriberId);
        return context.prisma.user.findMany({ where: { id: { in: subscriberIds } } });
      },
    },
  }),
});
