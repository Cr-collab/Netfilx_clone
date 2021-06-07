import React, {useEffect, useState} from 'react';
import './App.css';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';




export default () =>
{

  const [movieList,setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);

   useEffect(()=>
   {
     /**
      * quando a tela for carregada
      * a função vai executar o que  eu 
      * colocar dentro daqui
      */

     const loadAll = async () =>
     {
            
            //Pegando a lista Total
            let list = await Tmdb.getHomeList();
            setMovieList(list);

            //Pegando filme em destaque
            let originals = list.filter(i => i.slug === 'originals');
            let randomChosen = Math.floor(Math.random() *  (originals[0].items.results.length - 1)); 
            let chosen = originals[0].items.results[randomChosen];
            let chosenInfo = await Tmdb.getMovieInfo(chosen.id, "tv");

             setFeaturedData(chosenInfo);
           

     }

     loadAll();

   },[]);


  return (
    <div className="page">

       {featuredData &&
       <FeaturedMovie item={featuredData}/>
       }

      <section className="lists"> 
           {movieList.map((item,key)=>(

                    <MovieRow key={key} title={item.title} items={item.items} />

           ))}
      </section>
      
    </div>
  );
}