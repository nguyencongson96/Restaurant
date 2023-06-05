import React, { useState } from "react";
import { logIn } from "store/reducers/info";
import { useDispatch } from "react-redux";
import styles from "pages/login/login.module.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(logIn(password)).then((data) => data.payload.accessToken && navigate("/admin/info"));
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={styles.header}>Login</h1>
      <input
        className={styles.password}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </form>
  );
};

export default Login;
