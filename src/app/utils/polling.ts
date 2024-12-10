// src/app/utils/polling.ts

/**
 * Polls a condition function at specified intervals until it returns true or the maximum number of attempts is reached.
 *
 * @param conditionFn - An asynchronous function that returns a boolean indicating whether the condition is met.
 * @param interval - The time (in milliseconds) to wait between each attempt. Default is 500ms.
 * @param maxAttempts - The maximum number of polling attempts. Default is 10.
 * @returns A promise that resolves when the condition is met or rejects if the maximum attempts are exceeded.
 */
export const pollUntilCondition = async (
  conditionFn: () => Promise<boolean>,
  interval: number = 500,
  maxAttempts: number = 10
): Promise<void> => {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const conditionMet = await conditionFn();
      if (conditionMet) {
        console.log(`Condition met on attempt ${attempt}.`);
        return;
      }
      console.log(
        `Polling attempt ${attempt} failed. Retrying in ${interval}ms...`
      );
    } catch (error) {
      console.error(`Error during polling attempt ${attempt}:`, error);
    }
    await new Promise((resolve) => setTimeout(resolve, interval));
  }
  throw new Error(
    "Polling timeout: Condition not met within the specified attempts."
  );
};
