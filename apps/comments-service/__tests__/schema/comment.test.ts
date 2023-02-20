import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginInlineTraceDisabled } from "@apollo/server/plugin/disabled";
import assert from "assert";
import gql from "graphql-tag";
import { schema } from "../../src/schema";
import {
  Comments,
  CommentsVariables,
} from "./__generated__/comment.test.generated";

describe("Comment", () => {
  let server: ApolloServer;

  beforeEach(() => {
    server = new ApolloServer({
      schema,
      plugins: [ApolloServerPluginInlineTraceDisabled()],
    });
  });

  it("should query comments for a user", async () => {
    const response = await server.executeOperation<Comments, CommentsVariables>(
      {
        query: gql`
          query Comments($representations: [_Any!]!) {
            _entities(representations: $representations) {
              ... on User {
                __typename
                comments {
                  __typename
                  id
                  body
                }
              }
            }
          }
        `,
        variables: {
          representations: [
            {
              __typename: "User",
              id: "VXNlcjphYjIxOWMzMC04NWQxLTQ3ZmMtODI3YS0xMjdjYWI5Njc3YjI=",
            },
          ],
        },
      }
    );

    assert(response.body.kind === "single");
    expect(response.body.singleResult.errors).toBeUndefined();
    assert(
      response.body.singleResult.data?._entities[0]?.__typename === "User"
    );
    expect(response.body.singleResult.data?._entities[0].comments[0].body).toBe(
      "Necessitatibus quas nihil enim voluptatem ea totam ipsum ab reprehenderit. Ducimus minima hic sequi eum quaerat nulla a magni nemo. Explicabo provident nemo perspiciatis aperiam blanditiis laborum. Exercitationem dolores incidunt ab nesciunt odit ut molestias ut."
    );
  });
});
