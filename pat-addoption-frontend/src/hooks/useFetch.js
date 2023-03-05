import { useEffect, useState } from "react";

function useFetch(url, method) {
  console.log('TEST FROM THE TOP');
  
  const [data, setData] = useState(null);
  const [isPanding, setIsPanding] = useState(false);
  const [error, setError] = useState(null);
const [options, setOptions] = useState(null)

const postData = (postedData) => {
  console.log('TEST FROM THE POSTdATA');
setOptions({
  method:"POST", 
  headers:{
    "Content-Type":"application/json"
  },
  body: JSON.stringify(postedData)
})
console.log('options ====>', options);

  }

  useEffect(() => {
    console.log('TEST FROM THE USE-EFFECT');

    const controller = new AbortController();

    const fetchData = async (fetchOptions) => {
      console.log('TEST FROM THE FETCH-TOP');

      setIsPanding(true);

      try {
        console.log('TEST FROM THE TRY');

        const res = await fetch(url, { ...fetchOptions,signal: controller.signal });
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        const data = await res.json();

        setIsPanding(false);
        setData(data);
        setError(null);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("the fetch was aborted");
        } else {
          setIsPanding(false);
          setError("could not fetch the data");
        }
      }
    };
if (method === "GET"){
  fetchData();
}
if (method === "POST" && options){
fetchData(options);
}
    return () => {
      controller.abort();
    };
  }, [url, options, method]);
  return { data, isPanding, error, postData };
}

export default useFetch;
