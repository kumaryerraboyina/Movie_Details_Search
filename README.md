# Movie Details Search Website

Welcome to the Movie Details Search Website project! This web application allows users to search for movie details, including information about their favorite movies.

## Features

- **Movie Search:** Users can search for movies using the search box.
- **Movie Details:** Clicking on a movie title will take the user to a page with detailed information about the selected movie, including the poster, release date, rating, overview, and more.
- **Watchlist:** Users can add movies to their watchlist for later viewing.
- **User Authentication:** Users can log in to access additional features.

## Technologies Used

- **Frontend:** React.js, React Router
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **API:** The Movie Database (TMDb) API

## Project Structure

```plaintext
movie-website/
|-- src/
|   |-- components/
|   |   |-- MovieList.js
|   |   |-- MovieDetails.js
|   |   |-- Watchlist.js
|   |   |-- Login.js
|   |-- App.js
|   |-- App.css
|-- server/
|   |-- server.js
|-- .env
|-- .gitignore
|-- package.json
|-- README.md
