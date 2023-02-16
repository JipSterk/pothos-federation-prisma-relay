import { gql } from "@apollo/client";
import { getToken, linkOptions } from "../lib/apolloLinkOptions";
import { initApollo } from "../lib/initApollo";
import { ThemeSwitcher } from "../modules/shared/ThemeSwitcher";
import { User } from "./__generated__/page.generated";

export default async function Home() {
  const apolloClient = initApollo(linkOptions, {}, { getToken });

  const { data, loading } = await apolloClient.query<User>({
    query: gql`
      query User {
        user(
          userId: "VXNlcjo0NjNiOGJiNy02Y2Y2LTRhOTctYTY2NS1hYjU3MzBiNjliYTI="
        ) {
          id
          email
          firstName
          lastName
          createdAt
          updatedAt
        }
      }
    `,
  });

  return (
    <main>
      <ThemeSwitcher />
      {!loading && data.user && <pre>{JSON.stringify(data.user, null, 2)}</pre>}
    </main>
  );
}
