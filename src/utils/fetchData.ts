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

export const fetchTopPodcasts = async () => {
  try {
    const response = await fetchData('https://itunes.apple.com/us/rss/toppodcasts/limit=20/genre=1310/json');

    if (response.status.http_code === 200) {
      const json = await JSON.parse(response.contents);
      return json.feed.entry
    } else {
      throw new Error('Failed to fetch data');
    }
  } catch (error: any) { // Explicitly specify the type of 'error'
    console.error('Error fetching data:', error.message);
  }
  
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
