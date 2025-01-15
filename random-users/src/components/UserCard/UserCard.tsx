import styles from "./UserCard.module.css";
import { User } from "../../utils/Types";
interface IUserCard {
  user: User;
}

export const UserCard = ({ user }: IUserCard) => {
  return (
    <>
      <div className={styles.card}>
        <img src={user.picture.thumbnail} alt={user.name.first} />
        <h3>{`${user.name.first} ${user.name.last}`}</h3>
        <p>{user.email}</p>
      </div>
    </>
  );
};
