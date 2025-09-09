import { GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { PostType } from './postType.js';
import { CreatePostProps, CreatePostType } from './createPostType.js';
import { PrismaContext } from './prismaContext.js';
import { UserType } from './userType.js';
import { CreateUserProps, CreateUserType } from './createUserType.js';
import { ProfileType } from './profileType.js';
import { CreateProfileProps, CreateProfileType } from './createProfileType.js';

export const RootMutationType = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    createPost: {
      type: new GraphQLNonNull(PostType),
      args: { dto: { type: new GraphQLNonNull(CreatePostType) } },
      resolve: (_parent, args: { dto: CreatePostProps }, context: PrismaContext) => {
        return context.prisma.post.create({
          data: args.dto,
        });
      },
    },
    createUser: {
      type: new GraphQLNonNull(UserType),
      args: { dto: { type: new GraphQLNonNull(CreateUserType) } },
      resolve: (_parent, args: { dto: CreateUserProps }, context: PrismaContext) => {
        return context.prisma.user.create({
          data: args.dto,
        });
      },
    },
    createProfile: {
      type: new GraphQLNonNull(ProfileType),
      args: { dto: { type: new GraphQLNonNull(CreateProfileType) } },
      resolve: (_parent, args: { dto: CreateProfileProps }, context: PrismaContext) => {
        return context.prisma.profile.create({
          data: args.dto,
        });
      },
    },
  },
});
