import { useEffect, useState } from "react";

import Track from "../Track/Track";
import useStore from "../../utils/store";
import { fetchMetadata } from "../../utils/utils";
import TRACKS from "../../utils/TRACKS";

import fetchJsonp from "fetch-jsonp";

import s from "./Tracks.module.scss";

const Tracks = () => {
  // permet d'alterner entre true et false pour afficher / cacher le composant
  const { setTracks, defaultTracks, setDefaultTracks, combinedTracks, showTracks, toggleShowTracks } = useStore();

  // TODO : Slider (infini ou non) pour sélectionner les tracks

  // TODO : Fonction de tri / filtre sur les tracks, par nom, durée...

  // TODO : Récupérer les tracks du store

  useEffect(() => {
    fetchMetadata(TRACKS, defaultTracks, setDefaultTracks);
  }, []);

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {

      if (e.target.value !== "") {
        // l'utilisateur a appuyé sur sa touche entrée
        const userInput = e.target.value;

        // appeler la fonction
        getSongs(userInput);
      } else {
        setTracks([]);
      }
    }
  };

  const getSongs = async (userInput) => {
    let response = await fetchJsonp(
      `https://api.deezer.com/search?q=${userInput}&output=jsonp`
    );

    if (response.ok) {
      response = await response.json();

      // récupérer le tableau de tracks du store existant
      const _tracks = [];

      // pour chaque track renvoyée par l'API
      response.data.forEach((result) => {
        _tracks.push(result);
      });

      // màj le store
      setTracks(_tracks);

    } else {
      // erreurs
    }
  };

  return (
    <>
      <div
        className={s.toggleTracks}
        onClick={() => toggleShowTracks()}
      >
        tracklist
      </div>

      <section
        className={`
      ${s.wrapper}
      ${showTracks ? s.wrapper_visible : ""}`}
      >
        <div className={s.tracks}>
          <div className={s.header}>
            <span className={s.order}>#</span>
            <span className={s.title}>Titre</span>
            <span className={s.duration}>Durée</span>
          </div>

          {combinedTracks.map((track, i) => (
            <Track
              key={track.title + i}
              title={track.title}
              duration={track.duration}
              cover={track.album.cover_xl}
              // artists={track.artists}
              src={track.preview}
              index={i}
              allMetadata={track}
            />
          ))}
        </div>

        <input
          type="text"
          placeholder="Chercher un artiste"
          className={s.searchInput}
          onKeyDown={onKeyDown}
        />
      </section>
    </>
  );
};

export default Tracks;
