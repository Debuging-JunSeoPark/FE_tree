import { useEffect, useState } from "react";

interface Quote {
  content: string;
  author: string;
  date: string;
}

const QuoteCard = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const today = new Date().toISOString().split("T")[0];
  const storageKey = "quote_daily";

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      const parsed: Quote = JSON.parse(stored);
      if (parsed.date === today) {
        setQuote(parsed);
        setIsLoading(false);
        return;
      }
    }

    const realApi = "https://favqs.com/api/qotd";
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(realApi)}`;

    fetch(proxyUrl)
      .then((res) => res.json())
      .then((data) => {
        const parsedData = JSON.parse(data.contents);
        const newQuote: Quote = {
          content: parsedData.quote.body,
          author: parsedData.quote.author,
          date: today,
        };
        localStorage.setItem(storageKey, JSON.stringify(newQuote));
        setQuote(newQuote);
      })
      .catch((err) => {
        console.error("Failed to fetch quote:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [storageKey, today]);

  return (
    <>
      {isLoading ? (
        <p className="text-sm text-gray-400 animate-pulse">Loading quote...</p>
      ) : quote ? (
        <>
          <p className="text-sm text-black italic">"{quote.content}"</p>
          <p className="text-xs text-gray-600 text-right">– {quote.author}</p>
        </>
      ) : (
        <p className="text-sm text-gray-400">Failed to load quote 😢</p>
      )}
    </>
  );
};

export default QuoteCard;
