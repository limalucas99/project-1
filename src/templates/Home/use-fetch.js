import { useEffect, useRef, useState } from 'react';
import './styles.css';

const isObjectEqual = (objA, objB) => {
  return JSON.stringify(objA) === JSON.stringify(objB)
}

export const useFetch = (url , options) => {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [shouldLoad, setShouldLoad] = useState(false)
  const urlRef = useRef(url); // useRef CRIA UMA REFERÊNCIA DE MEMÓRIA E NÃO ATUALIZA O VALOR DURANTE AS RENDERIZAÇÕES
  const optionsRef = useRef(options); // useRef CRIA UMA REFERÊNCIA DE MEMÓRIA E NÃO ATUALIZA O VALOR DURANTE AS RENDERIZAÇÕES

  useEffect(() => {

    let changed = false;

    if(!isObjectEqual(url, urlRef.current)) {
      urlRef.current = url
      changed = true
    }
    if(!isObjectEqual(options, optionsRef.current)) {
      optionsRef.current = options
      changed = true
    }

    if(changed) {
      setShouldLoad(s => !s)
    }

  }, [url, options])

  useEffect(() => {

    let wait = false
    const controller = new AbortController(); // UTILIZADO PARA ABORTAR REQUISIÇÕES QUE NÃO FORAM FINALIZADAS
    const signal = controller.signal // EXEMPLO, USUÁRIO SAI DA PÁGINA ANTES DA REQUISIÇÃO FINALIZAR
    // NÃO É NECESSÁRIO

    setLoading(true)
    const fetchData = async () => {
      await new Promise(r => setTimeout(r, 3000))
      try {
        const response = await fetch(urlRef.current, { signal, ...optionsRef.current });
        const jsonResult = await response.json();

        if(!wait) {
        setResult(jsonResult);
        setLoading(false)
        }
      }
      catch (err) {
        if(!wait) {
          setLoading(false)
        }
        throw err;
      }
    }
  //1231
    fetchData()

    return () => {
      wait = true
      controller.abort()
    }

  }, [shouldLoad])

  return [result,loading]
}