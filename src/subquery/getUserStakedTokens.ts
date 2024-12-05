import { gql } from "@apollo/client";

export const GET_USER_STAKED_TOKENS = gql`
  query GetUserStakedTokens($userId: String!) {
    stakedNFTs(filter: { ownerId: { id: { equalTo: $userId } } }) {
      edges {
        node {
          id
          tokenIdNum
          stakedAt
          lastClaimedAt
          environmentId {
            id
            environmentId
          }
          hiveId {
            id
            hiveId
          }
          tokenId {
            id
            tokenURI
            rarity
          }
        }
      }
    }
  }
`;
