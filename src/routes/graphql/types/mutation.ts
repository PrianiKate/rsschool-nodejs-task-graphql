import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { PostType } from './postType.js';
import { CreatePostProps, CreatePostInput } from './createPostType.js';
import { PrismaContext } from './prismaContext.js';
import { UserType } from './userType.js';
import { CreateUserProps, CreateUserInput } from './createUserType.js';
import { ProfileType } from './profileType.js';
import { CreateProfileProps, CreateProfileInput } from './createProfileType.js';
import { UUIDType } from './uuid.js';
import { UUID } from 'crypto';

export const RootMutationType = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    createPost: {
      type: new GraphQLNonNull(PostType),
      args: { dto: { type: new GraphQLNonNull(CreatePostInput) } },
      resolve: (_parent, args: { dto: CreatePostProps }, context: PrismaContext) => {
        return context.prisma.post.create({
          data: args.dto,
        });
      },
    },
    createUser: {
      type: new GraphQLNonNull(UserType),
      args: { dto: { type: new GraphQLNonNull(CreateUserInput) } },
      resolve: (_parent, args: { dto: CreateUserProps }, context: PrismaContext) => {
        return context.prisma.user.create({
          data: args.dto,
        });
      },
    },
    createProfile: {
      type: new GraphQLNonNull(ProfileType),
      args: { dto: { type: new GraphQLNonNull(CreateProfileInput) } },
      resolve: (_parent, args: { dto: CreateProfileProps }, context: PrismaContext) => {
        return context.prisma.profile.create({
          data: args.dto,
        });
      },
    },
    deletePost: {
      type: new GraphQLNonNull(GraphQLString),
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_parent, args: { id: UUID }, context: PrismaContext) => {
        await context.prisma.post.delete({ where: { id: args.id } });
        return 'Success';
      },
    },
    deleteUser: {
      type: new GraphQLNonNull(GraphQLString),
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_parent, args: { id: UUID }, context: PrismaContext) => {
        await context.prisma.user.delete({ where: { id: args.id } });
        return 'Success';
      },
    },
    deleteProfile: {
      type: new GraphQLNonNull(GraphQLString),
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_parent, args: { id: UUID }, context: PrismaContext) => {
        await context.prisma.profile.delete({ where: { id: args.id } });
        return 'Success';
      },
    },
  },
});
