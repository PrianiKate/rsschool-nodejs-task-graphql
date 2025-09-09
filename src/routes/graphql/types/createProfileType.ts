import {
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
} from 'graphql';
import { UUIDType } from './uuid.js';
import { MemberTypeId } from './memberType.js';

export const CreateProfileType = new GraphQLInputObjectType({
  name: 'CreateProfileType',
  fields: {
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    memberTypeId: { type: new GraphQLNonNull(MemberTypeId) },
    userId: { type: new GraphQLNonNull(UUIDType) },
  },
});

export interface CreateProfileProps {
  isMale: boolean;
  yearOfBirth: number;
  memberTypeId: string;
  userId: string;
}
