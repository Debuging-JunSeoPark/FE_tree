import { WordCloud as IsoterikWordCloud } from "@isoterik/react-word-cloud";

export type Word = { text: string; value: number };

interface WordCloudProps {
  words: Word[];
}

export default function WordCloud({ words }: WordCloudProps) {
  return (
    <div className="w-full">
    <IsoterikWordCloud
  words={words}
  width={700}
  height={300}
  rotate={() => 0}
/>
    </div>
  );
}
