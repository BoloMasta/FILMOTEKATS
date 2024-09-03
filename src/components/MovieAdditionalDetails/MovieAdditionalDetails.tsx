import React from 'react';
import { MovieAdditionalDetailsProps } from '../../ts/types/componentProps';
import styles from './MovieAdditionalDetails.module.scss';

const MovieAdditionalDetails: React.FC<MovieAdditionalDetailsProps> = ({ movieDetails }) => {
  const formatRuntime = (runtime: number) => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}min`;
  };

  if (!movieDetails) {
    return null;
  }

  return (
    <>
      {!movieDetails.vote_count &&
        !movieDetails.release_date &&
        !movieDetails.spoken_languages.length &&
        !movieDetails.budget &&
        !movieDetails.runtime &&
        !movieDetails.production_countries.length &&
        !movieDetails.production_companies.length &&
        !movieDetails.imdb_id &&
        !movieDetails.homepage && <p>No additional details available for this movie.</p>}

      {movieDetails.vote_count > 0 && (
        <p className={styles.detailItem}>Votes: {movieDetails.vote_count}</p>
      )}
      {movieDetails.release_date && (
        <p className={styles.detailItem}>Release Date: {movieDetails.release_date}</p>
      )}
      {movieDetails.spoken_languages.length > 0 && (
        <p className={styles.detailItem}>
          Spoken Languages:{' '}
          {movieDetails.spoken_languages.map((lang) => lang.english_name).join(', ')}
        </p>
      )}
      {movieDetails.budget > 0 && (
        <p className={styles.detailItem}>Budget: ${movieDetails.budget.toLocaleString()}</p>
      )}
      {movieDetails.runtime !== null && movieDetails.runtime > 0 && (
        <p className={styles.detailItem}>Runtime: {formatRuntime(movieDetails.runtime)}</p>
      )}
      {movieDetails.production_countries.length > 0 && (
        <p className={styles.detailItem}>
          Production Countries:{' '}
          {movieDetails.production_countries.map((country) => country.name).join(', ')}
        </p>
      )}
      {movieDetails.production_companies.length > 0 && (
        <p className={styles.detailItem}>
          Production Companies:{' '}
          {movieDetails.production_companies.map((company) => company.name).join(', ')}
        </p>
      )}
      {movieDetails.imdb_id && (
        <a
          href={`https://www.imdb.com/title/${movieDetails.imdb_id}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.imdbLink}
        >
          View on IMDb
        </a>
      )}
      <br />
      {movieDetails.homepage && (
        <a
          href={movieDetails.homepage}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.homepageLink}
        >
          Visit Website
        </a>
      )}
    </>
  );
};

export default MovieAdditionalDetails;
