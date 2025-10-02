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
        return context.loaders.profileLoader.load(parent.id);
      },
    },
    posts: {
      type: new GraphQLNonNull(new GraphQLList(PostType)),
      resolve: (parent: { id: string }, _args, context: PrismaContext) => {
        return context.loaders.postLoader.load(parent.id);
      },
    },
    userSubscribedTo: {
      type: new GraphQLNonNull(new GraphQLList(UserType)),
      resolve: async (parent: { id: string }, _args, context: PrismaContext) => {
        const user = await context.loaders.userLoader.load(parent.id);
        return user?.userSubscribedTo;
      },
    },
    subscribedToUser: {
      type: new GraphQLNonNull(new GraphQLList(UserType)),
      resolve: async (parent: { id: string }, _args, context: PrismaContext) => {
        const user = await context.loaders.userLoader.load(parent.id);
        return user?.subscribedToUser;
      },
    },
  }),
});
