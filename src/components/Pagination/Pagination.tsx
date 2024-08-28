import Button from "../../components/Button/Button";
import { PaginationProps } from "../../ts/types/componentProps";
import styles from "./Pagination.module.scss";

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const maxVisibleButtons = 4;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPaginationButtons = () => {
    const buttons = [];

    // First button
    buttons.push(
      <Button
        key={1}
        onClick={() => handlePageChange(1)}
        label="1"
        disabled={currentPage === 1}
        variant={currentPage === 1 ? "primary" : "secondary"}
        className={styles.paginationButton}
      />
    );

    // Separator
    if (currentPage > maxVisibleButtons + 2 && totalPages > maxVisibleButtons + 1) {
      buttons.push(
        <span key="start-ellipsis" className={styles.paginationEllipsis}>
          ...
        </span>
      );
    }

    // Middle buttons
    const startPage = Math.max(2, currentPage - maxVisibleButtons);
    const endPage = Math.min(totalPages - 1, currentPage + maxVisibleButtons);

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <Button
          key={i}
          onClick={() => handlePageChange(i)}
          label={i.toString()}
          disabled={i === currentPage}
          variant={i === currentPage ? "primary" : "secondary"}
          className={`${styles.paginationButton} ${
            i === currentPage ? styles.paginationActive : ""
          }`}
        />
      );
    }

    // Separator
    if (currentPage < totalPages - maxVisibleButtons - 1 && totalPages > maxVisibleButtons + 1) {
      buttons.push(
        <span key="end-ellipsis" className={styles.paginationEllipsis}>
          ...
        </span>
      );
    }

    // Last button
    if (totalPages > 1) {
      buttons.push(
        <Button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          label={totalPages.toString()}
          disabled={currentPage === totalPages}
          variant={currentPage === totalPages ? "primary" : "secondary"}
          className={styles.paginationButton}
        />
      );
    }

    return buttons;
  };

  return <div className={styles.pagination}>{renderPaginationButtons()}</div>;
};

export default Pagination;
