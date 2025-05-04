import s from "./Landing.module.scss";
import AudioController from "../../utils/AudioController";
import { useState } from "react";
import Button from "../Button/Button";
import useStore from "../../utils/store";

const Landing = () => {
  const [hasClicked, setHasClicked] = useState(false);
  const { toggleShowTracks, setActiveTrackId } = useStore();

  const onClick = () => {
    AudioController.setup(setActiveTrackId);
    setHasClicked(true);
    toggleShowTracks();
  };

  return (
    <section className={`${s.landing} ${hasClicked ? s.landingHidden : ""}`}>
      <div className={s.wrapper}>
        <h1 className={s.title}>Music Visualizer</h1>
        <p>
          Projet conçu dans le cadre du cours Dispositifs interactifs à l'IUT de
          Champs-sur-Marne. <br />
          Découverte et usage de three.js, gsap, react, la Web Audio API. <br />
          Importez vos fichiers mp3 pour pouvoir les visualiser en 3D.
        </p>
        <Button label={"Commencer"} onClick={onClick} />
      </div>
    </section>
  );
};

export default Landing;
