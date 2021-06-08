import React, {useEffect, useState} from 'react';
import './App.css';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';




export default () =>
{

  const [movieList,setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

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

   useEffect(() =>
   {

    const scrollListener = () =>
    {
         if(window.scrollY > 10 )
         {
           setBlackHeader(true);
         }else
         {
           setBlackHeader(false);
         }
    }

    window.addEventListener('scroll', scrollListener);
    return ()=>
    {
      window.addEventListener('scroll', scrollListener);
    }
        
   }, [])


  return (
    <div className="page">

      <Header  black={blackHeader}/>

       {featuredData &&
       <FeaturedMovie item={featuredData}/>
       }

      <section className="lists"> 
           {movieList.map((item,key)=>(

                    <MovieRow key={key} title={item.title} items={item.items} />

           ))}
      </section>

{movieList.length <= 0 && 
      <div className='loading'>

        <img src='https://i.pinimg.com/originals/e2/82/e2/e282e2739af30635723b9e2701bb8148.gif' />
      </div>
}      
    </div>

  );
}