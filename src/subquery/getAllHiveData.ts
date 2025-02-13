 
import { gql } from "@apollo/client";

export const GET_ALL_HIVE_DATA = gql`
  query GetAllStakedNFTs($after: Cursor) {
    stakedNFTs(first: 100, after: $after) {
      edges {
        cursor
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
          ownerId {
            id
          }
          tokenId {
            rarity
            tokenURI
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;
