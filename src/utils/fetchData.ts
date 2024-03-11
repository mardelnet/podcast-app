/**
 * Function to store data in localStorage with timestamp.
 * @param itemName - The name/key under which the data will be stored in localStorage.
 * @param data - The data to be stored.
 */
export function storeData(itemName: string, data: any): void {
  const now = new Date().getTime();
  const dataToStore = {
    timestamp: now,
    data: data
  };
  localStorage.setItem(itemName, JSON.stringify(dataToStore));
}

/**
 * Function to retrieve data from localStorage and check expiration.
 * @param itemName - The name/key of the item to retrieve from localStorage.
 * @returns The stored data if it's still valid, otherwise returns null.
 */
export function getLocalStorageData(itemName: string): any | null {
  const storedData = localStorage.getItem(itemName);
  if (!storedData) return null; // No data stored
  const { timestamp, data } = JSON.parse(storedData);
  const now = new Date().getTime();
  const expirationTime = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  if (now - timestamp > expirationTime) {
    // Data expired, remove from storage
    localStorage.removeItem(itemName);
    return null;
  } else {
    // Data is still valid
    return data;
  }
}

/**
 * Function to fetch data from a specified URL using the AllOrigins API.
 * @param url - The URL from which to fetch the data.
 * @returns The fetched data.
 */
const fetchData = async (url: string): Promise<any> => {
  try {
    const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
    
    if (response.ok) {
      const json = await response.json();
      return json;
    } else {
      throw new Error('Failed to fetch data');
    }
  } catch (error: any) {
    console.error('Error fetching data:', error.message);
  }
}

/**
 * Function to fetch the top podcasts data.
 * @returns The top podcasts data, either fetched from the API or retrieved from localStorage if available.
 */
export const fetchTopPodcasts = async (): Promise<any> => {
  const cachedData = getLocalStorageData('topPodcasts');

  if (!cachedData) {
    try {
      const response = await fetchData('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json');
  
      if (response.status.http_code === 200) {
        const json = await JSON.parse(response.contents);
        storeData('topPodcasts', json.feed.entry);
        return json.feed.entry;
      } else {
        throw new Error('Failed to fetch top podcasts data');
      }
    } catch (error: any) {
      console.error('Error fetching top podcasts data:', error.message);
    }
  }
  return cachedData;
}

/**
 * Function to fetch data for a single podcast.
 * @param podcastId - The ID of the podcast to fetch data for.
 * @returns The data for the specified podcast, either fetched from the API or retrieved from localStorage if available.
 */
export const fetchSinglePodcast = async (podcastId: string): Promise<any> => {
  const cachedData = getLocalStorageData(`podcast_${podcastId}`);

  if (!cachedData) {
    try {
      const response = await fetchData(`https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`);
  
      if (response.status.http_code === 200) {
        const json = await JSON.parse(response.contents);
        storeData(`podcast_${podcastId}`, json.results);
        return json.results;
      } else {
        throw new Error('Failed to fetch podcast data');
      }
    } catch (error: any) {
      console.error('Error fetching podcast data:', error.message);
    }
  }
  return cachedData;
}
