import { useCallback, useEffect, useState } from "react";


const useAsync = (asyncFunction, shouldRun) => {
  const [state, setState] = useState({
    result: null,
    error: null,
    status: 'idle'
  })
  const [error, setError] = useState(null)
  const [status, setStatus] = useState('idle')

  const run = useCallback(async () => {
    console.log('EFFECT', new Date().toLocaleString())
    await new Promise(r => setTimeout(r, 4000))

    setState({
     result: null,
     error: null,
     status: 'pending'
    })

    return asyncFunction()
      .then(response => {
        setState({
          result: response,
          error: null,
          status: 'settled'
        })
      })
      .catch(err => {
       setState({
          result: null,
          error: err,
          status: 'error'
        })
      })
    }, [asyncFunction])

  useEffect(() => {
    if(shouldRun) {
      run()
    }
  }, [run, shouldRun])

  return [run, state.result, state.error, state.status]

}

      const fetchData = async () => {
        await new Promise(r => setTimeout(r, 4000))
        const data = await fetch('https://jsonplaceholder.typicode.com/posts')
        const json = await data.json()
        return json
      }


export const Home = () => {

    const [posts, setPosts] = useState(null);
    const [reFetchData, result, error, status] = useAsync(fetchData, true)

    const handleClick =  () => {
         reFetchData()
      }


    useEffect(() => {
      setTimeout(() => {
        reFetchData()
      }, 6000)
    }, [reFetchData])

    if (status === 'idle') {
      return <pre>idle: Nada executando</pre>
    }

    if (status === 'pending') {
      return <pre>pending: Loading...</pre>
    }

    if (status === 'error') {
      return <pre>erro: {JSON.stringify(error, null, 2)}</pre>
    }

    if (status === 'settled') {
      return <pre onClick={handleClick}>{JSON.stringify(result, null, 2)}</pre>
    }

}

export default Home;
