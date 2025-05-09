import s from "./Manager.module.scss";
import useStore from "../../utils/store";
import audioController from "../../utils/AudioController";
import { useEffect, useState } from "react";
import PlayButton from "../../assets/play.svg?url";
import PauseButton from "../../assets/pause.svg?url";

const Manager = () => {
  const { activeTrackId, combinedTracks } = useStore();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioController.audio;

    const updateDuration = () => setDuration(audio.duration || 0);

    const updateCurrentTime = () => setCurrentTime(audio.currentTime);

    audio?.addEventListener("timeupdate", updateCurrentTime);
    audio?.addEventListener("loadedmetadata", updateDuration);
    audio?.addEventListener("play", updatePlayState);
    audio?.addEventListener("pause", updatePlayState);
    

    return () => {
      audio?.removeEventListener("timeupdate", updateCurrentTime);
      audio?.removeEventListener("loadedmetadata", updateDuration);
      audio?.removeEventListener("play", updatePlayState);
      audio?.removeEventListener("pause", updatePlayState);
    };
  }, [activeTrackId]);

  const handleRangeChange = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    audioController.audio.currentTime = newTime;
  };

  const updatePlayState = () => {
    setIsPlaying(!audioController.audio.paused);
  };

  return (
    <div className={s.manager}>
      <img src={combinedTracks.find((t)=>t.id == activeTrackId)?.album.cover_xl} alt="" />
      <input 
        type="range" 
        orient="vertical" 
        min="0"
        max={duration}
        step="0.1"
        value={currentTime}
        onChange={handleRangeChange}
      />
      <div className={s.playPause} onClick={() => audioController.togglePlay()}>
        <img src={isPlaying ? PauseButton : PlayButton} alt="" />
      </div>
    </div>
  );
};

export default Manager;
