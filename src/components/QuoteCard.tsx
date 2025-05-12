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

    // ✅ ZenQuotes API 사용
    const realApi = "https://zenquotes.io/api/today";
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(realApi)}`;

    fetch(proxyUrl)
      .then((res) => res.json())
      .then((data) => {
        const parsedData = JSON.parse(data.contents);
        const quoteData = parsedData[0]; // ZenQuotes는 배열로 옴
        const newQuote: Quote = {
          content: quoteData.q,
          author: quoteData.a,
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
          <p className="text-[6px] text-gray-200 text-right mt-1">
            Provided by{" "}
            <a
              href="https://zenquotes.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              ZenQuotes.io
            </a>
          </p>
        </>
      ) : (
        <p className="text-sm text-gray-400">Failed to load quote 😢</p>
      )}
    </>
  );
};

export default QuoteCard;
