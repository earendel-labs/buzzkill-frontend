// src/graphql/queries/getAllStakedInHive.ts
import { gql } from "@apollo/client";

export const GET_ALL_STAKED_IN_HIVE = gql`
  query GetStakedInEnvironmentAndHive(
    $environmentId: BigFloat!
    $hiveId: BigFloat!
  ) {
    stakedNFTs(
      filter: {
        environmentId: { environmentId: { equalTo: $environmentId } }
        hiveId: { hiveId: { equalTo: $hiveId } }
      }
    ) {
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
