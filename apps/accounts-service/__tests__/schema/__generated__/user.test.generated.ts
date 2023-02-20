/* eslint-disable */
import * as Types from '../../__generated__/acme.generated';

export type UserVariables = Types.Exact<{
  userId: Types.Scalars['ID'];
}>;


export type User = { __typename?: 'Query', user?: { __typename: 'User', id: string, firstName: string, lastName: string } | null };

export type CreateUserSuccesVariables = Types.Exact<{
  email: Types.Scalars['String'];
  firstName: Types.Scalars['String'];
  lastName: Types.Scalars['String'];
}>;


export type CreateUserSucces = { __typename?: 'Mutation', createUser: { __typename: 'User', email: string, firstName: string, lastName: string } };

export type CreateUserErrorVariables = Types.Exact<{
  email: Types.Scalars['String'];
  firstName: Types.Scalars['String'];
  lastName: Types.Scalars['String'];
}>;


export type CreateUserError = { __typename?: 'Mutation', createUser: { __typename: 'User' } };
