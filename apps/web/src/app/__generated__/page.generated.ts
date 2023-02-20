/* eslint-disable */
import * as Types from '../../__generated__/acme.generated';

export type UserVariables = Types.Exact<{ [key: string]: never; }>;


export type User = { __typename?: 'Query', user?: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, createdAt: string, updatedAt: string } | null };
