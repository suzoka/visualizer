import s from "./Manager.module.scss";
import useStore from "../../utils/store";
import audioController from "../../utils/AudioController";
import { useEffect, useState } from "react";
import PlayButton from "../../assets/play.svg?url";
import PauseButton from "../../assets/pause.svg?url";
import RepeatButton from "../../assets/repeat.svg?url";

const Manager = () => {
  const { activeTrackId, combinedTracks } = useStore();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);

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

  const toggleLoop = () => {
    audioController.audio.loop = !audioController.audio.loop;
    setIsLooping(audioController.audio.loop);
  }

  return (
    <div className={s.manager}>
      <img src={combinedTracks.find((t)=>t.id == activeTrackId)?.album.cover_xl || '/img/unselected.png' } alt="" />
      <input 
        type="range" 
        orient="vertical" 
        min="0"
        max={duration}
        step="0.1"
        value={currentTime}
        className={!(combinedTracks.find((t)=>t.id == activeTrackId)) ? s.unselected : ''}
        onChange={handleRangeChange}
        disabled={!(combinedTracks.find((t)=>t.id == activeTrackId))}
      />
      <div className={s.playPause} onClick={() => audioController.togglePlay()}>
        <img 
          src={isPlaying ? PauseButton : PlayButton} 
          className={!(combinedTracks.find((t)=>t.id == activeTrackId)) ? s.unselected : ''}
          alt={isPlaying ? 'Pause' : 'Jouer'} 
        />
      </div>
      <img onClick={toggleLoop} src={RepeatButton} alt={ !isLooping ? 'Lire en boucle' : 'Arrêter de lire en boucle'} className={`${s.repeat} ${ !isLooping ? s.unselected : ''}`} />
    </div>
  );
};

export default Manager;
