const clientId = "e3e9ca1af934479c8b0a86dece349eed";
const redirectURI = "http://localhost:3000/";

/*
request
const baseURL = "https://api.spotify.com/v1";
const endPoint = "/search";
const query = "?type=track&q=TERM";
const urlToFetch = baseURL + endPoint + query;
*/

let accessToken;
let Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const userUrlTokenMatch =
      window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (userUrlToken && expiresIn) {
      accessToken = userUrlTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      window.location = accessUrl;
    }
  },

  search(userInput) {
    const accessToken = Spotify.getAccessToken();
    fetch(`https://api.spotify.com/v1/search?type=track&q=${userInput}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((jsonResponse) => {
        if (!jsonResponse.tracks) {
          return [];
        } else {
          return jsonResponse.tracks.map((track) => {
            return {
              id: track.id,
              name: track.name,
              artist: track.artists[0].name,
              album: track.album.name,
              uri: track.uri,
            };
          });
        }
      });
  },
};

export default Spotify;
