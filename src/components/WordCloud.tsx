import { useEffect, useRef } from "react";
import WordCloudLib from "wordcloud";

export type Word = { text: string; value: number };

interface WordCloudProps {
  words: Word[];
  width?: number;
  height?: number;
}

export default function WordCloud({ words, width = 700, height = 300 }: WordCloudProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
  
    useEffect(() => {
      if (canvasRef.current && words.length > 0) {
        const list = words.map(({ text, value }) => [text, value]);
        const maxValue = Math.max(...words.map((w) => w.value));
  
        WordCloudLib(canvasRef.current, {
          list,
          gridSize: Math.round(8 * (width / 1024)),
          weightFactor: (val: number) => Math.pow(val / maxValue, 0.8) * (width / 30),

          fontFamily: "Pretendard, sans-serif",
          color: () => {
            const palette = ["#0F9D58", "#3C3C3B", "#8B5E3C", "#4CAF50", "#6D4C41"];
            return palette[Math.floor(Math.random() * palette.length)];
          },
          backgroundColor: "transparent",
          rotateRatio: 0,
          drawOutOfBound: false, 
          shuffle: true,
          shape: "circle",
          origin: [width / 2, height / 2], 
        });
      }
    }, [words, width, height]);
  
    return <canvas ref={canvasRef} width={width} height={height} />;
  }