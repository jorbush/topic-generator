import { useState, useEffect } from "react";
import { generateRandomTopic } from "../store/topicStore";

export default function TopicGenerator() {
  const [currentTopic, setCurrentTopic] = useState<string | null>(null);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleGenerate = () => {
    if (isTyping) return; // Prevent double clicks while animating

    // Play sound effect (optional, maybe later)

    const result = generateRandomTopic();
    if (result) {
      setCurrentTopic(result.topic);
    } else {
      setCurrentTopic(
        "MISSION COMPLETE. ALL TOPICS CONSUMED. PLEASE RESET SYSTEM.",
      );
    }
  };

  useEffect(() => {
    if (currentTopic) {
      setIsTyping(true);
      setDisplayText("");
      let i = 0;
      const speed = 30; // ms per char

      const interval = setInterval(() => {
        setDisplayText(currentTopic.substring(0, i + 1));
        i++;
        if (i > currentTopic.length) {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, speed);

      return () => clearInterval(interval);
    }
  }, [currentTopic]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full max-w-4xl mx-auto px-4">
      <div className="w-full min-h-[200px] border-4 border-green-800 bg-black/50 p-8 mb-12 relative shadow-[0_0_30px_rgba(34,197,94,0.1)] flex items-center justify-center text-center">
        {/* CRT Scanline effect overlay could go here in CSS */}

        {!currentTopic && (
          <div className="text-green-700 animate-pulse text-xl font-pixel">
            WAITING FOR INPUT...
          </div>
        )}

        {currentTopic && (
          <h1 className="text-2xl md:text-4xl leading-relaxed text-green-400 font-pixel drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]">
            {displayText}
            <span className="animate-blink inline-block w-4 h-8 bg-green-500 ml-2 align-middle"></span>
          </h1>
        )}
      </div>

      <button
        onClick={handleGenerate}
        disabled={isTyping}
        className={`
          relative group px-12 py-6
          bg-black border-4 border-green-500
          text-green-500 font-pixel text-2xl tracking-widest uppercase
          transition-all duration-200
          hover:bg-green-500 hover:text-black hover:shadow-[0_0_30px_rgba(34,197,94,0.6)]
          active:scale-95
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
      >
        <span className="absolute inset-0 border-2 border-green-500 translate-x-1 translate-y-1 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform"></span>
        Generate Topic
      </button>
    </div>
  );
}
