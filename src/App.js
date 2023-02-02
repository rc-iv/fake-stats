import logo from './logo.svg';
import './App.css';
import React, {useState, useCallback, useEffect} from 'react';
import CollectionTable from './components/CollectionTable/CollectionTable';

function App() {
    const [collectionData, setCollectionData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [lastUpdated, setLastUpdated] = useState(null);

    // function that grabs the top collections (more than 1eth 15mv) then fetche
    const fetchMemeCollections = useCallback(async () => {
        console.log("Fetching meme collections");
        setIsLoading(true);
        const response = await fetch('https://h4vyubq593.execute-api.us-east-1.amazonaws.com/collections');
        const memeList = await response.json();
        const memeKeys = memeList.map(address => address.replace('https://opensea.io/assets/ethereum/', '').replace('/', '%3A'));
        console.log(memeList);
        let dataList = [];

        for (const key in memeKeys) {
            const response = await fetch(
                `https://h4vyubq593.execute-api.us-east-1.amazonaws.com/collections/${memeKeys[key]}`);
            let meme_stats =await response.json()
            // convert meme_stats.floor_price  to float
            meme_stats.floor_price = parseFloat(meme_stats.floor_price)
            dataList.push(meme_stats)
        }
        setCollectionData(dataList);
        console.log(dataList)
        setIsLoading(false);
    });

    useEffect(() => {
        console.log("useEffect fired off");
        setIsLoading(true);
        fetchMemeCollections().then(() => {
            console.log('finished fetching')
        });
        setIsLoading(false);
    }, [])

    let content = <p>Data needs to load</p>

    if (isLoading) {
        content = <p>Loading...</p>
    }

    if (collectionData.length > 0) {
        content = <CollectionTable className='collectionTable'
                                   collectionData={collectionData}
        />
    }

    return (
        <React.Fragment>
            <div className='header'>
                {/*<img src={f20logo} alt="logo" height='50' width='50'/>*/}
                <h1>FakeStats</h1>
                <button onClick={fetchMemeCollections}>Refresh Data</button>
            </div>
            {content}
        </React.Fragment>
    )
}

export default App;
