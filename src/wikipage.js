import React, { useState } from 'react';
import './App.css'
function Wikipage() {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);
    const [searchinfo, setSearchInfo] = useState({});
    let handleSubmit = async () => {
        const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${search}`
        const response = await fetch(endpoint);
        const json = await response.json();
        console.log(json)
        setResults(json.query.search);
        setSearchInfo(json.query.searchinfo);
        console.log(search);
    }
    return (
        <div>
            <div>
                <input type="text" placeholder='Enter something to search' value={search} onChange={e => setSearch(e.target.value)} />
                &nbsp;
                <button style={{ width: "100px", height: "20px" }} onClick={() => handleSubmit()}>Search</button>
            </div>
            <div>
                {results.map((result, i) => {
                    const url = `https://en.wikipedia.org/?curid=${result.pageid}`;
                    return (
                        <div key={i} className={i % 2 === 0 ? 'firstcol' : 'secondcol'}>
                            <h3>{result.title}</h3>
                            <p dangerouslySetInnerHTML={{ __html: result.snippet }}></p>
                            <a href={url} target="_blank" rel="nofollow" style={{ textDecoration: "none" }}>Read More</a>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default Wikipage