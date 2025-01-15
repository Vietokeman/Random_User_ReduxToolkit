import styles from "./Filters.module.css";

interface IFilters {
  gender: string;
  onGenderChange: (gender: string) => void;
}

const Filters = ({ gender, onGenderChange }: IFilters) => {
  return (
    <>
      <div className={styles.filters}>
        Gender:{" "}
        <select value={gender} onChange={(e) => onGenderChange(e.target.value)}>
          <option value="">All</option>
          <option value="male">Male</option>
          <option value="female">Femail</option>
        </select>
      </div>
    </>
  );
};

export default Filters;
