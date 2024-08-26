import Button from "../Button/Button";
import styles from "./MovieActionButtons.module.scss";
import { Movie } from "../../ts/types/Movie";

interface MovieActionButtonsProps {
  inQueue: boolean;
  inWatched: boolean;
  onAddToQueue: (movie: Movie) => void;
  onRemoveFromQueue: (movie: Movie) => void;
  onAddToWatched: (movie: Movie) => void;
  onRemoveFromWatched: (movie: Movie) => void;
  moveToWatched: (movie: Movie) => void;
  movie: Movie;
}

const MovieActionButtons: React.FC<MovieActionButtonsProps> = ({
  inQueue,
  inWatched,
  onAddToQueue,
  onRemoveFromQueue,
  onAddToWatched,
  onRemoveFromWatched,
  moveToWatched,
  movie,
}) => (
  <div className={styles.buttonContainer}>
    <Button
      onClick={inQueue ? () => onRemoveFromQueue(movie) : () => onAddToQueue(movie)}
      label={inQueue ? "Remove from Queue" : "Add to Queue"}
      variant="primary"
    />
    {inQueue ? (
      <Button onClick={() => moveToWatched(movie)} label="Move to Watched" variant="secondary" />
    ) : inWatched ? (
      <Button
        onClick={() => onRemoveFromWatched(movie)}
        label="Remove from Watched"
        variant="secondary"
      />
    ) : (
      <Button onClick={() => onAddToWatched(movie)} label="Add to Watched" variant="secondary" />
    )}
  </div>
);

export default MovieActionButtons;
