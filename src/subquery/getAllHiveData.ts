import { gql } from "@apollo/client";

export const GET_ALL_HIVE_DATA = gql`
  query GetAllStakedNFTs {
    stakedNFTs {
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
        owner {
          id
        }
        token {
          rarity
          tokenURI
        }
      }
    }
  }
`;
