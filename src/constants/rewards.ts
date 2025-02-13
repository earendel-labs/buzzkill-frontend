// Default values, these will be periodically updated from the backend
export let DAILY_BONUS_POINTS = 100;
export let REFERRAL_REWARD_POINTS = 500;

// Function to update the constants if needed (will be called by backend or a sync function)
export function updateRewardsConstants(
  dailyBonus: number,
  referralReward: number
) {
  DAILY_BONUS_POINTS = dailyBonus;
  REFERRAL_REWARD_POINTS = referralReward;
}
