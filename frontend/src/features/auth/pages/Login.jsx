import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearAuthError, loginUser } from "../redux/authSlice";
import styles from "./AuthPage.module.scss";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ email: "", password: "" });

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) {
      dispatch(clearAuthError());
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const result = await dispatch(loginUser(form));
    if (loginUser.fulfilled.match(result)) {
      navigate("/");
    }
  };

  return (
    <section className={styles.authWrap}>
      <form className={styles.card} onSubmit={onSubmit}>
        <h1>Welcome Back</h1>
        <p>Login to save favourites and continue your watch history.</p>

        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" value={form.email} onChange={onChange} placeholder="your@gmail.com" required />

        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" value={form.password} onChange={onChange} placeholder="••••••••" required />

        {error ? <span className={styles.error}>{error}</span> : null}

        <button type="submit" disabled={isLoading}>{isLoading ? "Please wait..." : "Login"}</button>

        <small>
          New here? <Link to="/register">Create account</Link>
        </small>
      </form>
    </section>
  );
};

export default Login;
