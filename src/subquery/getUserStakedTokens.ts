import { gql } from "@apollo/client";

export const GET_USER_STAKED_TOKENS = gql`
  query GetUserStakedTokens($userId: String!) {
    stakedNFTs(filter: { owner: { id: { equalTo: $userId } } }) {
      nodes {
        id
        tokenIdNum
        stakedAt
        lastClaimedAt
        environment {
          id
          environmentId
        }
        hive {
          id
          hiveId
        }
        token {
          id
          tokenURI
          rarity
        }
      }
    }
  }
`;
