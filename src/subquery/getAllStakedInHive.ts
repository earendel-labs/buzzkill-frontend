// src/graphql/queries/getAllStakedInHive.ts
import { gql } from "@apollo/client";

export const GET_ALL_STAKED_IN_HIVE = gql`
  query GetStakedInEnvironmentAndHive(
    $environmentId: BigFloat!
    $hiveId: BigFloat!
  ) {
    stakedNFTs(
      filter: {
        environment: { environmentId: { equalTo: $environmentId } }
        hive: { hiveId: { equalTo: $hiveId } }
      }
    ) {
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
          tokenURI
        }
      }
    }
  }
`;
