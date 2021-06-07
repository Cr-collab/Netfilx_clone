const API_KEY = '0d9167d908b30cc102c4979f0adbdfbe';
const API_BASE = 'https://api.themoviedb.org/3';



/** Originais da netflix
 *  recomendados
 *  em alta
 *  ação 
 *  comédia  
 *  terror
 *  romance 
 *  documentarios
 */


const basicFetch = async (endpoint) =>
{
       
      const req = await fetch(`${API_BASE}${endpoint}`);  
      const json = await req.json();
      return json;

      /** await =  quer dizer espere a resposta e depois passe pro proximo passo */

}


export default 
{
    /**Pegar a lista da Home        vai ser uma função asincrona   */ 
    getHomeList:                   async () =>
    {
          /** vai retornar um  array */
          return [
              /** nesse array vai ter um objeto literal */
             {
                       slug : 'originals',
                       title: 'Originais do Netflix',
                       items: await basicFetch(`/discover/tv?with_network=213&language=pt-BR&api_key=${API_KEY}`)
             },

             {

                       slug: 'trending',
                       title: 'Recomendados para você',
                       items:  await basicFetch(`/trending/all/week?language=pt-BR&api_key=${API_KEY}`)

             },

             {

                slug: 'toprated',
                title: 'Ema Alta',
                items: await basicFetch(`/movie/top_rated?language=pt-BR&api_key=${API_KEY}`)

             },

             {

                slug: 'action',
                title: 'Ação',
                items: await basicFetch(`/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`)

             },

             {

                slug: 'comedy',
                title: 'Comédia',
                items: await basicFetch(`/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`)

             },

             {

                slug: 'horror',
                title: 'Terror',
                items: await basicFetch(`/discover/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}`)

            },

            {

                slug: 'romance',
                title: 'Romance',
                items: await basicFetch(`/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`)

             },

             {

                slug: 'documentary',
                title: 'Documentários',
                items: await basicFetch(`/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`)

             }

          ];  

    },

    getMovieInfo: async (movieId, type) =>{

      let info = {}

      if(movieId)
      {
         switch(type) 
         {
            case 'movie':

              info = await basicFetch(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`);

            break
            
            case 'tv' :

               info = await basicFetch(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`);

            break;

         }
      }

      return info;

    }






}