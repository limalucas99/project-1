import { useEffect, useState } from "react";
import { useFetch } from "./use-fetch";


export const Home = () => {

  const [postId, setPostId] = useState('');
  const [result, loading] = useFetch('https://jsonplaceholder.typicode.com/posts/' + postId, { headers: { abc: '1' + postId}  })

  // CADA OBJETO CRIADO É DIFERENTE DO OUTRO: {} !== {} 
  // OBJETOS PODEM CAUSAR MULTIPLAS RENDERIZAÇÕES POR NÃO SEREM UM TIPO PRIMITIVO
  // CADA VEZ QUE O COMPONENTE É RENDERIZADO, É COMO SE UM NOVO OBJETO FOSSE CRIADO

    useEffect(() => {
      console.log('ID do post', postId)
    }, [postId])

    if (loading) {
      return <p>Loading ...</p>
    }

    const handleClick = (id) => {
      setPostId(id)
    }
    
    if(!loading && result) {
      return <div>
        {result?.length > 0 ? result.map(p => (
          <div key={`post-${p.id}`} onClick={() => handleClick(p.id)}>
            <p>{p.title}</p>
          </div>
        )) : (<div onClick={() => handleClick('')}>
            <p>{result.title}</p>
          </div>)
          }
      </div>
    }

    return <h1>Oi</h1>
}

export default Home;
