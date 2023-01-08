import { useEffect, useState } from "react";

function useFetch(url, method) {
  const [data, setData] = useState(null);
  const [isPanding, setIsPanding] = useState(false);
  const [error, setError] = useState(null);
const [options, setOptions] = useState(null)

const postData = (postedData) => {
setOptions({
  method:"POST", 
  headers:{
    "Content-Type":"application/json"
  },
  body: JSON.stringify(postedData)
})
  }

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async (fetchOptions) => {
      setIsPanding(true);

      try {
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
