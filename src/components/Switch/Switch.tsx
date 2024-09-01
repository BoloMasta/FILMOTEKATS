import { SwitchProps } from '../../ts/types/componentProps';
import styles from './Switch.module.scss';

const Switch: React.FC<SwitchProps> = ({ label, isChecked, onToggle, dataAttribute }) => (
  <div className={styles.switch}>
    <span className={styles.switchLabel}>{label}</span>
    <label className={styles.switchContainer}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onToggle}
        data-attribute={dataAttribute}
      />
      <div className={styles.slider}></div>
    </label>
  </div>
);

export default Switch;
