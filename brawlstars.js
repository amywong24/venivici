import Brawlstars from 'brawlstars.js';

const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjdlZmFlYjc0LTc5MGYtNDFjMi1hYTBjLTMzOWJkNzY2MDdmMyIsImlhdCI6MTcxMDkxODczNSwic3ViIjoiZGV2ZWxvcGVyLzJlY2Y0NDIyLWViMTItZjc4YS00ZWFkLTk5ZWExZWZiM2ExNiIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiMTU1LjE4Ni42NC4xMjgiXSwidHlwZSI6ImNsaWVudCJ9XX0.dQjEjqNubMp-PNyIkgo7XLwW7K98U6PBtaPFb_Ivo3ifuW_9V9XK4MiL1Y8nHCSAN99KTY_tdSKn_NaEZNTBEg";
const client = new Brawlstars.Client(token);

export const fetchPlayerData = async () => {
  try {
    const player = await client.getPlayer("#80QCQ0U0C");
    return player;
  } catch (error) {
    console.error('Error fetching player data:', error);
    return null;
  }
};

export const fetchBrawlerData = async () => {
  try {
    const brawler = await client.getBrawlerByName("COLT");
    return brawler;
  } catch (error) {
    console.error('Error fetching brawler data:', error);
    return null;
  }
};