import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from "react-router-dom";

const Player = () => {

  const {id} = useParams();
  const navigate = useNavigate();

  const [apiData,setApiData]= useState({
    'name': "",
    'key': "",
    "published_at": "",
    "type":""
  })

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZGU0NzU3NDdiMWQ2MWU5MTQ5MDE2MDk1M2I0N2I2ZSIsIm5iZiI6MTczNzI2MDI0Mi42MzMsInN1YiI6IjY3OGM3Y2QyNWFkZDYxMjczZDY1MGUzOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.R4F5W8krlzQw-vj_EeY1Kmp_LD8NAe61jIjNcmcFyT8'
    }
  };
  
  useEffect(()=>{

    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results[0]))
    .catch(err => console.error(err));
  },[])

  return (
  <div className="player">
    <img src={back_arrow_icon} alt="backarrow" onClick={()=>{navigate('/')}}/>
    <iframe width='90%' height='90%' src={`https://www.youtube.com/embed/${apiData.key}`}
    title="Gameplay" frameBorder='0' allowFullScreen></iframe>
    <div className="player-info">
      <p>{apiData.published_at}</p>
      <p>{apiData.name}</p>
      <p>{apiData.type}</p>
    </div>
  </div>
  );
};

export default Player;
