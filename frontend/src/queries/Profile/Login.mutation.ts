import { gql } from '@apollo/client/core/core.cjs.js';
import type { IProfile, IExecutionResult } from '@app/shared';

// Exporting ILoginMutationResponse interface
interface ILoginMutationData {
  login: IProfile,
};

export type ILoginMutationResponse = IExecutionResult<ILoginMutationData>;

// Exporting LoginMutation
export const LoginMutation = gql`
  mutation Login($token: String!) {
    login(token: $token) {
      _id
      email
      username
    }
  }
`;
