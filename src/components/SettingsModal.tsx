import { useStore } from "@nanostores/react";
import {
  consumedTopicsAtom,
  totalTopics,
  resetProgress,
} from "../store/topicStore";
import { useState, useEffect } from "react";

export default function SettingsModal() {
  const [isOpen, setIsOpen] = useState(false);
  const consumed = useStore(consumedTopicsAtom);
  const count = consumed.length;
  const percentage = Math.round((count / totalTopics) * 100);

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const progressBarWidth = 20; // characters
  const filledChars = Math.round((percentage / 100) * progressBarWidth);
  const emptyChars = progressBarWidth - filledChars;
  const progressBar = `[${"=".repeat(filledChars)}${"-".repeat(emptyChars)}]`;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 text-green-500 hover:text-green-400 font-pixel text-xl z-50 p-2 border-2 border-green-900 bg-black hover:bg-green-900/20 transition-colors cursor-pointer"
        aria-label="Settings"
      >
        [SETTINGS]
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm font-pixel text-green-500">
          <div className="bg-black border-4 border-green-600 p-8 max-w-lg w-full shadow-[0_0_20px_rgba(34,197,94,0.3)] relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-4 text-2xl hover:text-white"
            >
              X
            </button>

            <h2 className="text-3xl mb-8 text-center glitch-text">
              SYSTEM STATUS
            </h2>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span>PROGRESS:</span>
                  <span>{percentage}%</span>
                </div>
                <div className="font-mono text-lg tracking-widest text-green-400 text-center">
                  {progressBar}
                </div>
                <div className="text-right text-sm mt-1 text-green-700">
                  {count} / {totalTopics} CONSTANTS
                </div>
              </div>

              <div className="pt-8 border-t-2 border-green-900/50">
                <p className="mb-4 text-sm text-green-700 text-center">
                  DANGER ZONE: RESETS LOCAL MEMORY
                </p>
                <button
                  onClick={() => {
                    if (
                      confirm(
                        "CONFIRM SYSTEM REBOOT? ALL PROGRESS WILL BE LOST.",
                      )
                    ) {
                      resetProgress();
                      setIsOpen(false);
                    }
                  }}
                  className="w-full py-4 border-2 border-red-900 text-red-500 hover:bg-red-900/20 hover:text-red-400 hover:border-red-500 transition-all font-bold tracking-widest uppercase"
                >
                  ⚠ SYSTEM REBOOT ⚠
                </button>
              </div>
            </div>

            <div className="mt-8 text-center text-xs text-green-800">
              ID: {Math.random().toString(36).substring(7).toUpperCase()}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
