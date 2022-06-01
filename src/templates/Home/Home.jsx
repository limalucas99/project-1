import { useEffect, useLayoutEffect, useRef, useState } from "react";

export const Home = () => {

  const [counted, setCounted] = useState([0, 1, 2, 3, 4])

  const divRef = useRef()

  useLayoutEffect(() => { // FAZ O DOM ESPERAR PARA QUE OS ELEMENTOS SEJAM MODIFICADOS SIMULTÂNEAMENTE
    const now = Date.now() // useLayoutEffect - SÓ ATUALIZA OS ELEMENTOS JUNTOS DPS QUE A EXECUÇÃO TERMINA
    while (Date.now() < now + 600)
    divRef.current.scrollTop = divRef.current.scrollHeight;
  })

  const handleClick = () => {
    setCounted(c => [...c, +c.slice(-1) + 1])
  }

  return (
    <>
    <button onClick={handleClick}>Count {counted.slice(-1)}</button>
    <div ref={divRef} style={{height: '100px', width: '100px', overflowY: 'scroll'}}>
    {counted.map(c => {
      return <p key={`c-${c}`}>{c}</p>
    })}
    </div> 
    </>
  )

}

export default Home;
