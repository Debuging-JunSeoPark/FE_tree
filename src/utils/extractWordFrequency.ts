import { Word } from "../components/WordCloud";

const stopwords = new Set([
  "i", "you", "he", "she", "they", "we", "it",
  "am", "is", "are", "was", "were", "be", "being", "been",
  "a", "an", "the", "and", "but", "or", "so",
  "to", "of", "in", "on", "for", "with", "at", "by", "from",
  "that", "this", "these", "those", "as", "if", "then", "just",
  "my", "your", "his", "her", "their", "our", "its", "me", "him", "them"
]);

export function extractWordFrequency(text: string): Word[] {
    const words = text
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .split(/\s+/)
      .filter(word => word && !stopwords.has(word));
  
    const frequencyMap = new Map<string, number>();
    for (const word of words) {
      frequencyMap.set(word, (frequencyMap.get(word) ?? 0) + 1);
    }
  
    return Array.from(frequencyMap.entries())
      .map(([text, value]) => ({ text, value }))
      .sort((a, b) => b.value - a.value) 
      .slice(0, 50); 
  }
  
