const clientId = "e3e9ca1af934479c8b0a86dece349eed";
const redirectURI = "http://localhost:3000/";
let accessToken;

/*
request
const baseURL = "https://api.spotify.com/v1";
const endPoint = "/search";
const query = "?type=track&q=TERM";
const urlToFetch = baseURL + endPoint + query;
*/

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const userUrlTokenMatch =
      window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (userUrlTokenMatch && expiresInMatch) {
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
    return fetch(
      `https://api.spotify.com/v1/search?type=track&q=${userInput}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )
      .then(
        (response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("request failed");
        },
        (networkError) => console.log(networkError.message)
      )
      .then((jsonResponse) => {
        if (!jsonResponse.tracks) {
          return [];
        }
        return jsonResponse.tracks.items.map((track) => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri,
        }));
      });
  },

  savePlaylist(playlistName, array) {
    if (!playlistName || array) {
      return;
    }
    const accessToken = Spotify.getAccessToken();
    let userId;
    const headers = { Authorization: `Bearer ${accessToken}` };

    //get user’s Spotify username
    return fetch(`https://api.spotify.com/v1/me/${userId}`, { headers })
      .then(
        (response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("request failed");
        },
        (networkError) => console.log(networkError.message)
      )
      .then((jsonResponse) => {
        userId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/user/${userId}/playlists`, {
          headers,
          method: "POST",
          body: JSON.stringify({ name: playlistName }),
        })
          .then(
            (response) => {
              if (response.ok) {
                return response.json();
              }
              throw new Error("request failed");
            },
            (networkError) => console.log(networkError)
          )
          .then((jsonResponse) => {
            const playListId = jsonResponse.id;
            return fetch(
              `https://api.spotify.com/v1/playlists/${playListId}/tracks`,
              {
                headers,
                method: "POST",
                body: JSON.stringify({ uris: array }),
              }
            )
              .then(
                (response) => {
                  if (response.ok) {
                    return response.json();
                  }
                  throw new Error("request failed");
                },
                (networkError) => console.log(networkError)
              )
              .then((jsonResponse) => {
                return jsonResponse.snapshot_id;
              });
          });
      });
  },
};

export default Spotify;
