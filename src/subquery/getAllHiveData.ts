import { gql } from "@apollo/client";

export const GET_ALL_HIVE_DATA = gql`
  query GetAllStakedNFTs {
    stakedNFTs {
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
          ownerId {
            id
          }
          tokenId {
            rarity
            tokenURI
          }
        }
      }
    }
  }
`;
