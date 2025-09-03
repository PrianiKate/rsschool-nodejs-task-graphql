import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { UUIDType } from './uuid.js';
import { PrismaContext } from './prismaContext.js';
import { MemberType } from './memberType.js';

interface Profile {
  userId: string;
  memberTypeId: string;
}

export const ProfileType = new GraphQLObjectType({
  name: 'ProfileType',
  fields: {
    id: { type: new GraphQLNonNull(UUIDType) },
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    memberType: {
      type: MemberType,
      resolve: (parent: Profile, _args, context: PrismaContext) => {
        return context.prisma.memberType.findUnique({
          where: { id: parent.memberTypeId },
        });
      },
    },
  },
});
