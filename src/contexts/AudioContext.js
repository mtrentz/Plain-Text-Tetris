import { createContext, useState, useEffect } from "react";
import song from "../static/tetris.mp3";

const AudioContext = createContext();

export default AudioContext;

export const AudioProvider = ({ children }) => {
  const [audio] = useState(new Audio(song));
  const [playing, setPlaying] = useState(false);

  const toggleAudio = () => {
    setPlaying(!playing);
    audio.volume = 0.1;
    audio.loop = true;
  };

  useEffect(() => {
    playing ? audio.play() : audio.pause();
    audio.loop = true;
  }, [playing]);

  useEffect(() => {
    audio.addEventListener("ended", () => {
      setPlaying(false);
    });
    return () => {
      audio.removeEventListener("ended", () => {
        setPlaying(false);
      });
    };
  }, []);

  const contextData = {
    toggleAudio,
    playing,
  };

  return <AudioContext.Provider value={contextData}>{children}</AudioContext.Provider>;
};
