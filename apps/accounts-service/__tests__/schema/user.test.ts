import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginInlineTraceDisabled } from "@apollo/server/plugin/disabled";
import { faker } from "@faker-js/faker";
import assert from "assert";
import gql from "graphql-tag";
import { schema } from "../../src/schema";
import {
  CreateUserError,
  CreateUserErrorVariables,
  CreateUserSucces,
  CreateUserSuccesVariables,
  User,
  UserVariables,
} from "./__generated__/user.test.generated";

describe("User", () => {
  let server: ApolloServer;

  beforeEach(() => {
    server = new ApolloServer({
      schema,
      plugins: [ApolloServerPluginInlineTraceDisabled()],
    });
  });

  it("should query a user", async () => {
    const response = await server.executeOperation<User, UserVariables>({
      query: gql`
        query User($userId: ID!) {
          user(userId: $userId) {
            __typename
            id
            firstName
            lastName
          }
        }
      `,
      variables: {
        userId: "VXNlcjo1ZDJmYWIzYy1jYjc5LTRkYjAtYjAwMC04YmNiM2E3ZTZkNmI=",
      },
    });

    assert(response.body.kind === "single");
    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.user?.__typename).toBe("User");
    expect(response.body.singleResult.data?.user?.firstName).toBe("Ola");
  });

  it("should create a user", async () => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email(firstName, lastName, "acme.com");

    const response = await server.executeOperation<
      CreateUserSucces,
      CreateUserSuccesVariables
    >({
      query: gql`
        mutation CreateUserSucces(
          $email: String!
          $firstName: String!
          $lastName: String!
        ) {
          createUser(
            email: $email
            firstName: $firstName
            lastName: $lastName
          ) {
            __typename
            email
            firstName
            lastName
          }
        }
      `,
      variables: {
        email,
        firstName,
        lastName,
      },
    });

    assert(response.body.kind === "single");
    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.createUser?.__typename).toBe(
      "User"
    );
    expect(response.body.singleResult.data?.createUser?.firstName).toBe(
      firstName
    );
  });

  it("should throw an error if user signs up with same email", async () => {
    faker.seed(123);
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email(firstName, lastName, "acme.com");

    const response = await server.executeOperation<
      CreateUserError,
      CreateUserErrorVariables
    >({
      query: gql`
        mutation CreateUserError(
          $email: String!
          $firstName: String!
          $lastName: String!
        ) {
          createUser(
            email: $email
            firstName: $firstName
            lastName: $lastName
          ) {
            __typename
          }
        }
      `,
      variables: {
        email,
        firstName,
        lastName,
      },
    });

    assert(response.body.kind === "single");
    expect(response.body.singleResult.errors).toBeDefined();
    expect(response.body.singleResult.errors?.[0].message).toBe(
      "this email is taken"
    );
  });
});
