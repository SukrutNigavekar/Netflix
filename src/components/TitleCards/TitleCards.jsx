import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import card_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'

const TitleCards = ({title, category}) => {

  const [apiData,setApiData]= useState([])
  const cardsRef = useRef();
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZGU0NzU3NDdiMWQ2MWU5MTQ5MDE2MDk1M2I0N2I2ZSIsIm5iZiI6MTczNzI2MDI0Mi42MzMsInN1YiI6IjY3OGM3Y2QyNWFkZDYxMjczZDY1MGUzOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.R4F5W8krlzQw-vj_EeY1Kmp_LD8NAe61jIjNcmcFyT8'
    }
  };
  
  

  const handlewheel = (e) => {
    e.preventDefault();
    cardsRef.current.scrollLeft += e.deltaY;
  }

  useEffect(() => {

    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));

    cardsRef.current.addEventListener('wheel',handlewheel)
  },[]);
  return (
    <div className='title-cards'>
      <h2>{title ? title : `Popular on Netflix`}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return(
            <Link to={`/player/${card.id}`} className='card' key={index}>
              <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt=''/>
              <p>{card.original_title}</p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default TitleCards