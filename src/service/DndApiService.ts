import { gql } from '@apollo/client';

export const GET_MONSTERS = gql`
  query MonstersQuery($limit: Int!) {
    monsters(limit: $limit) {
      name
    }
  }
`;
