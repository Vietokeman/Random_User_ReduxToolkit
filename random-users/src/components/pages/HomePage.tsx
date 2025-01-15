import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/strore";
import { useEffect, useState } from "react";
import {
  fetchUsers,
  setGenderFilter,
  setRoleFilter,
} from "../../redux/usersSlice";
import { UserCard } from "../UserCard/UserCard";
import Filters from "../Filters/Filters";
import Sidebar from "../Sidebar/Sidebar";
import styles from "./HomePage.module.css";
import Header from "../Header";
import { Pagination } from "antd";
const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, status, error, genderFilter, roleFilter } = useSelector(
    (state: RootState) => state.users
  );
  const [currentPage, setCurrentPage] = useState(3);
  const pageSize = 3;

  useEffect(() => {
    dispatch(
      fetchUsers({ page: currentPage, role: roleFilter, gender: genderFilter })
    );
  }, [dispatch, currentPage, genderFilter, roleFilter]);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <Header />
        </div>
        <div className={styles.filters}>
          <Filters
            gender={genderFilter}
            onGenderChange={(gender) => dispatch(setGenderFilter(gender))}
          />
        </div>
        <div className={styles.sidebar}>
          <Sidebar
            role={roleFilter}
            onRoleChange={(role) => dispatch(setRoleFilter(role))}
          />
        </div>
        <div className={styles.content}>
          {status === "loading" && <p>Loading...</p>}
          {status === "failed" && <p>Error: {error}</p>}
          {status === "succeeded" && (
            <div className={styles.userList}>
              {users.map((user) => (
                <UserCard user={user} key={user.login.uuid} />
              ))}
            </div>
          )}
          {status === "succeeded" && (
            <Pagination
              current={currentPage}
              onChange={handlePageChange}
              total={users.length}
              pageSize={pageSize}
              showSizeChanger={false}
              showTotal={(total) => `${total} users`}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
