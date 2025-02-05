import { gql } from "@apollo/client";

export const GET_USER_REWARDS_DATA = gql`
  query getUserRewardsData($userId: String!) {
    users(filter: { id: { equalTo: $userId } }) {
      edges {
        node {
          id
          mintedCount
          lastMintedTime
          stakingApproved
          totalPoints
          claimedPoints
          totalProduction
          averageProduction
          userRewardMultiplier
          hasExternalNFTFlag
        }
      }
    }
  }
`;
