const fetchData = async (url: string) => {
  try {
    const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
    
    if (response.ok) {
      const json = await response.json();
      return json;
    } else {
      throw new Error('Failed to fetch data');
    }
  } catch (error: any) { // Explicitly specify the type of 'error'
    console.error('Error fetching data:', error.message);
  }
}

// Function to store data in localStorage with timestamp
function storeData( itemName: string, data: any ) {
  const now = new Date().getTime();
  const dataToStore = {
    timestamp: now,
    data: data
  };
  localStorage.setItem(itemName, JSON.stringify(dataToStore));
}

// Function to retrieve data from localStorage and check expiration
function getLocalStorageData( itemName: string ) {
  const storedData = localStorage.getItem( itemName );
  if (!storedData) return null; // No data stored
  const { timestamp, data } = JSON.parse(storedData);
  const now = new Date().getTime();
  // const expirationTime = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  const expirationTime = 10000; // 24 hours in milliseconds
  if (now - timestamp > expirationTime) {
    // Data expired, remove from storage
    localStorage.removeItem( itemName );
    return null;
  } else {
    // Data is still valid
    return data;
  }
}

export const fetchTopPodcasts = async () => {
  const cachedData = getLocalStorageData( 'topPodcasts' );

  if (!cachedData) {
    try {
      const response = await fetchData('https://itunes.apple.com/us/rss/toppodcasts/limit=20/genre=1310/json');
  
      if (response.status.http_code === 200) {
        const json = await JSON.parse(response.contents);
        storeData( 'topPodcasts', json.feed.entry )
        return json.feed.entry
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error: any) { // Explicitly specify the type of 'error'
      console.error('Error fetching data:', error.message);
    }
  }

  console.log('using cache data')
  return cachedData;
}


export const fetchSinglePodcast = async ( podcastId: string ) => {
  try {
    const response = await fetchData(`https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`);
    if (response.status.http_code === 200) {
      const json = await JSON.parse(response.contents);
      return json.results
    } else {
      throw new Error('Failed to fetch data');
    }
  } catch (error: any) { // Explicitly specify the type of 'error'
    console.error('Error fetching data:', error.message);
  }
  
}
