import { gql } from "@apollo/client";

export const GET_USER_UNSTAKED_TOKENS = gql`
  query GetUserUnstakedTokens($userId: String!) {
    tokens(filter: { owner: { equalTo: $userId } }) {
      nodes {
        id
        owner
        rarity
        tokenURI
        isStaked
        stakedNFT {
          id
        }
      }
    }
  }
`;
