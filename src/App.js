import React, {useEffect, useState} from 'react';
import './App.css';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';




export default () =>
{

  const [movieList,setMovieList] = useState([]);

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

     }

     loadAll();

   },[]);


  return (
    <div className="page">

      <section className="lists"> 
           {movieList.map((item,key)=>(

                    <MovieRow key={key} title={item.title} items={item.items} />

           ))}
      </section>
      
    </div>
  );
}