import { useState, useEffect } from 'react'
const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
import './App.css'

function App() {
  const [dogData, setDogData] = useState(null)
  const [banList, setBanList] = useState([])

  // Fetching the connection to the Dog API
  const fetchDogData = async (attempt = 0) => {
    try {
      const response = await fetch('https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1', {
        headers: {
          'x-api-key': ACCESS_KEY
        }
      });
      const data = await response.json();
      const dog = data[0];

      // Assume the breed's temperament is a comma-separated string.
      // Split it and check against the ban list.
      if (dog.breeds.length > 0) {
        const { temperament } = dog.breeds[0];
        if (temperament) {
          const attributes = temperament.split(', ');
          // Check if any attribute is in the ban list.
          const isBanned = attributes.some(attribute => banList.includes(attribute.trim()));

          // If the dog has a banned attribute, and we haven't exceeded our fetch attempts, fetch again.
          if (isBanned) {
            const maxAttempts = 5; // Prevent infinite fetching
            if (attempt < maxAttempts) {
              console.log(`Attempt ${attempt + 1}: Found banned attribute. Fetching again.`);
              return fetchDogData(attempt + 1);
            } else {
              console.log('Max fetch attempts reached. Showing last fetched dog regardless of ban list.');
            }
          }
        }
      }

      // If the dog passes the ban list check or we've reached the max attempts, set the dog data.
      setDogData(dog);
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
      <div className='img-display'>
        <img src={url} alt="Dog" />
        <ul>
          {filteredAttributes.map((attribute, index) => (
            <li key={index} className='attribute-item'>
              <button className="button" onClick={() => handleBans(attribute)}>Ban</button>
              <span>{attribute.trim()}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  useEffect(() => {
    fetchDogData();
  }, []);

  const removeBanAttribute = (attributeToRemove) => {
    setBanList(banList.filter(attribute => attribute !== attributeToRemove));
  };
  

  return (
    <>
      <h2>Viewing Dog Photos </h2>
      <h5>Discover the world of dogs!</h5>
      <div className="container">
        <div className="dog-content">
          {renderDogData()}
          <button className="button" onClick={fetchDogData}>Fetch Dog Data</button>
        </div>
        <div className="banned-list">
          <h3>Banned Attributes</h3>
          <ul>
            {banList.map((attribute, index) => (
              <li key={index}>{attribute}
              <button className="button" onClick={() => removeBanAttribute(attribute)}>Remove</button></li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default App
