import { persistentAtom } from "@nanostores/persistent";
import topicsData from "../data/topics.json";

export const topics = topicsData;
export const totalTopics = topics.length;

// Store indices of consumed topics
export const consumedTopicsAtom = persistentAtom<number[]>(
  "consumed_topics",
  [],
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  },
);

export function generateRandomTopic(): { topic: string; index: number } | null {
  const consumed = consumedTopicsAtom.get();
  if (consumed.length >= totalTopics) return null;

  let randomIndex: number;
  // efficient refilling strategy not needed for 2000 items, random retry is fine
  // keeping it simple
  do {
    randomIndex = Math.floor(Math.random() * totalTopics);
  } while (consumed.includes(randomIndex));

  // Update consumed
  consumedTopicsAtom.set([...consumed, randomIndex]);
  return { topic: topics[randomIndex], index: randomIndex };
}

export function resetProgress() {
  consumedTopicsAtom.set([]);
}
