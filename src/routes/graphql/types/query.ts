import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { MemberType, MemberTypeId } from './memberType.js';
import { PrismaContext } from './prismaContext.js';

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
      type: new GraphQLNonNull(MemberType),
      args: { id: { type: new GraphQLNonNull(MemberTypeId) } },
      resolve: (_, args: { id: string }, context: PrismaContext) => {
        return context.prisma.memberType.findUnique({ where: { id: args.id } });
      },
    },
  },
});
