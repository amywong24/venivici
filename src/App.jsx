import { useState, useEffect } from 'react'
const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
import './App.css'

function App() {
  const [dogData, setDogData] = useState(null)
  const [banList, setBanList] =useState([])

  // Fetching the connection to the Dog API
  const fetchDogData = async () => {
    try {
      const response = await fetch('https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1', {
        headers: {
          'x-api-key': ACCESS_KEY
        }
      });
      const data = await response.json();
      setDogData(data[0]);
    } catch (error) {
      console.error('Error fetching dog data:', error);
    }
  };

  // Banned attributes are stored here
  const handleBans = (attribute) => {
    setBanList([...banList, attribute]);
  };

  const renderDogData = () => {
    if (!dogData) {
      return <p>No data available</p>;
    }

    const { url, breeds } = dogData;
    const randomAttributes = breeds && breeds.length > 0 ? breeds[0].temperament.split(',') : [];

    const filteredAttributes = randomAttributes.filter(attribute => !banList.includes(attribute));

    return (
      <div>
        <img src={url} alt="Dog" />
        <ul>
          {filteredAttributes.map((attribute, index) => (
            <li key={index}>
              <button onClick={() => handleBans(attribute)}>Ban</button> {attribute}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  useEffect(() => {
    fetchDogData();
  }, []);

  return (
    <>
      <h2>Viewing Dog Photos </h2>
      <h5>Discover the world of dogs!</h5>
      {renderDogData()}
      <button onClick={fetchDogData}>Fetch Dog Data</button>
    </>
  )
}

export default App
