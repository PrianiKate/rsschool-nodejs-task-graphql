import DataLoader from 'dataloader';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createLoaders = () => {
  const memberTypeLoader = new DataLoader(async (ids: readonly string[]) => {
    const memberTypes = await prisma.memberType.findMany({
      where: { id: { in: [...ids] } },
    });
    const memberTypesMap = new Map(
      memberTypes.map((memberType) => [memberType.id, memberType]),
    );
    return ids.map((id) => memberTypesMap.get(id));
  });

  const postLoader = new DataLoader(async (authorsIds: readonly string[]) => {
    const posts = await prisma.post.findMany({
      where: { authorId: { in: [...authorsIds] } },
    });
    const postsMap = new Map(posts.map((post) => [post.authorId, post]));
    return authorsIds.map((authorId) => postsMap.get(authorId));
  });

  const userLoader = new DataLoader(async (ids: readonly string[]) => {
    const users = await prisma.user.findMany({
      where: { id: { in: [...ids] } },
      include: {
        profile: {
          include: {
            memberType: true,
          },
        },
        posts: true,
        userSubscribedTo: {
          include: { author: true },
        },
        subscribedToUser: {
          include: { subscriber: true },
        },
      },
    });
    const usersMap = new Map(users.map((user) => [user.id, user]));
    return ids.map((id) => usersMap.get(id));
  });

  const profileLoader = new DataLoader(async (profileIds: readonly string[]) => {
    const profiles = await prisma.profile.findMany({
      where: { userId: { in: [...profileIds] } },
      include: {
        memberType: true,
      },
    });
    const profilesMap = new Map(profiles.map((profile) => [profile.userId, profile]));
    return profileIds.map((profileId) => profilesMap.get(profileId));
  });

  return {
    profileLoader,
    userLoader,
    memberTypeLoader,
    postLoader,
  };
};
