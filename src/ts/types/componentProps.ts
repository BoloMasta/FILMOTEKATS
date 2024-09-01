import { MinimalMovie } from './movieTypes';

export type ButtonProps = {
  onClick: () => void;
  label: string;
  className?: string;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'tertiary';
};

export interface SwitchProps {
  label: string;
  isChecked: boolean;
  onToggle: () => void;
  dataAttribute?: string;
}

export interface GalleryProps {
  movies: MinimalMovie[];
  variant?: 'standard' | 'small';
}

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export interface MovieModalProps {
  movieId: number;
  onClose: () => void;
}

export interface MovieActionButtonsProps {
  inQueue: boolean;
  inWatched: boolean;
  onAddToQueue: (movie: MinimalMovie) => void;
  onRemoveFromQueue: (movie: MinimalMovie) => void;
  onAddToWatched: (movie: MinimalMovie) => void;
  onRemoveFromWatched: (movie: MinimalMovie) => void;
  moveToWatched: (movie: MinimalMovie) => void;
  movie: MinimalMovie;
}
