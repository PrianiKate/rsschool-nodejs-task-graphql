import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { MemberType, MemberTypeId } from './memberType.js';
import { PrismaContext } from './prismaContext.js';
import { PostType } from './postType.js';
import { UUIDType } from './uuid.js';
import { UUID } from 'crypto';
import { UserType } from './userType.js';
import { ProfileType } from './profileType.js';

export const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    memberTypes: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(MemberType))),
      resolve: (_, _args, context: PrismaContext) => {
        return context.prisma.memberType.findMany();
      },
    },
    memberType: {
      type: MemberType,
      args: { id: { type: new GraphQLNonNull(MemberTypeId) } },
      resolve: (_, args: { id: string }, context: PrismaContext) => {
        return context.prisma.memberType.findUnique({ where: { id: args.id } });
      },
    },
    posts: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(PostType))),
      resolve: (_, _args, context: PrismaContext) => {
        return context.prisma.post.findMany();
      },
    },
    post: {
      type: PostType,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: (_, args: { id: UUID }, context: PrismaContext) => {
        return context.prisma.post.findUnique({ where: { id: args.id } });
      },
    },
    users: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserType))),
      resolve: (_, _args, context: PrismaContext) => {
        return context.prisma.user.findMany();
      },
    },
    user: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: (_, args: { id: UUID }, context: PrismaContext) => {
        return context.prisma.user.findUnique({ where: { id: args.id } });
      },
    },
    profiles: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ProfileType))),
      resolve: (_, _args, context: PrismaContext) => {
        return context.prisma.profile.findMany();
      },
    },
    profile: {
      type: ProfileType,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: (_, args: { id: UUID }, context: PrismaContext) => {
        return context.prisma.profile.findUnique({ where: { id: args.id } });
      },
    },
  },
});
