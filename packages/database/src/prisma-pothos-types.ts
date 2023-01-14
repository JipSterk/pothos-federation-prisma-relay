/* eslint-disable */
import type { Prisma, Comment, User } from "/Users/jipsterk/Repos/Personal/pothos-federation-prisma-relay/node_modules/.pnpm/@prisma+client@4.7.1_prisma@4.7.1/node_modules/@prisma/client";
export default interface PrismaTypes {
    Comment: {
        Name: "Comment";
        Shape: Comment;
        Include: Prisma.CommentInclude;
        Select: Prisma.CommentSelect;
        OrderBy: Prisma.CommentOrderByWithRelationInput;
        WhereUnique: Prisma.CommentWhereUniqueInput;
        Where: Prisma.CommentWhereInput;
        RelationName: "user";
        ListRelations: never;
        Relations: {
            user: {
                Shape: User;
                Types: PrismaTypes["User"];
            };
        };
    };
    User: {
        Name: "User";
        Shape: User;
        Include: Prisma.UserInclude;
        Select: Prisma.UserSelect;
        OrderBy: Prisma.UserOrderByWithRelationInput;
        WhereUnique: Prisma.UserWhereUniqueInput;
        Where: Prisma.UserWhereInput;
        RelationName: "comments";
        ListRelations: "comments";
        Relations: {
            comments: {
                Shape: Comment[];
                Types: PrismaTypes["Comment"];
            };
        };
    };
}