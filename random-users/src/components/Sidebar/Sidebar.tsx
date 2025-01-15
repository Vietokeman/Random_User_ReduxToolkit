import { useEffect } from "react";
import { Button } from "antd";
import {
  UserOutlined,
  CodeOutlined,
  DatabaseOutlined,
  ProjectOutlined,
} from "@ant-design/icons";
import styles from "./Sidebar.module.css";

interface ISidebar {
  role: string;
  onRoleChange: (role: string) => void;
}

const Sidebar = ({ role, onRoleChange }: ISidebar) => {
  const roles = [
    { key: "dev", label: "Developer", icon: <CodeOutlined /> },
    { key: "ba", label: "Business Analyst", icon: <UserOutlined /> },
    { key: "qc", label: "Quality Control", icon: <DatabaseOutlined /> },
    { key: "pm", label: "Project Manager", icon: <ProjectOutlined /> },
  ];

  useEffect(() => {
    console.log(role);
  }, [role]);

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        {roles.map((item) => (
          <Button
            key={item.key}
            icon={item.icon}
            type={role === item.key ? "primary" : "default"}
            className={`${styles.button} ${
              role === item.key ? styles.active : ""
            }`}
            onClick={() => onRoleChange(item.key)}
          >
            {item.label}
          </Button>
        ))}
      </aside>
    </div>
  );
};

export default Sidebar;
