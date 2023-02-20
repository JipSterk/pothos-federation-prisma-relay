/* eslint-disable */
import * as Types from '../../__generated__/acme.generated';

export type CommentsVariables = Types.Exact<{
  representations: Array<Types.Scalars['_Any']> | Types.Scalars['_Any'];
}>;


export type Comments = { __typename?: 'Query', _entities: Array<{ __typename?: 'Comment' } | { __typename: 'User', comments: Array<{ __typename: 'Comment', id: string, body: string }> } | null> };
