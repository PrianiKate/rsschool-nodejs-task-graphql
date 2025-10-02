import { MemberType, Post, PrismaClient, Profile, User } from '@prisma/client';
import DataLoader from 'dataloader';

export interface PrismaContext {
  prisma: PrismaClient;
  loaders: {
    memberTypeLoader: DataLoader<string, MemberType>;
    userLoader: DataLoader<
      string,
      User & { userSubscribedTo?: User; subscribedToUser?: User }
    >;
    postLoader: DataLoader<string, Post>;
    profileLoader: DataLoader<string, Profile>;
  };
}
