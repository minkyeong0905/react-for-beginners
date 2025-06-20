import { useState, useEffect } from "react";

function App() {
  const [value, setValue] = useState(0);
  const [keyword, setKeyword] = useState("");

  const onClick = () => setValue((prev) => prev + 1);
  const onChange = (event) => setKeyword(event.target.value);

  useEffect(() => {
    console.log("I run only once.");
  }, []);
  
  useEffect(() => {
    console.log("I run when 'keyword' changes.");
  }, [keyword]);
  
  useEffect(() => {
    console.log("I run when 'counter' changes.");
  }, [value]);
  
  useEffect(() => {
    console.log("I run when 'keyword' or 'counter' changes.");
  }, [keyword, value]);

  return (
    <div>
      <input type="text" placeholder="Search here..." value={keyword} onChange={onChange} />
      <h1>{value}</h1>     
      <button onClick={onClick}>Click Me!</button> 
    </div>
  );
}

export default App;