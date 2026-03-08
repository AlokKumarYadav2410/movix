import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearAuthError, registerUser } from "../redux/authSlice";
import styles from "./AuthPage.module.scss";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) {
      dispatch(clearAuthError());
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const result = await dispatch(registerUser(form));
    if (registerUser.fulfilled.match(result)) {
      navigate("/");
    }
  };

  return (
    <section className={styles.authWrap}>
      <form className={styles.card} onSubmit={onSubmit}>
        <h1>Create Account</h1>
        <p>
          Join <Link to="/" className={styles.brandLink}>Movix</Link> and build your personal movie universe.
        </p>

        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" value={form.name} onChange={onChange} required />

        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" value={form.email} onChange={onChange} required />

        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" value={form.password} onChange={onChange} required minLength={6} />

        {error ? <span className={styles.error}>{error}</span> : null}

        <button type="submit" disabled={isLoading}>{isLoading ? "Please wait..." : "Register"}</button>

        <small>
          Already have an account? <Link to="/login">Login</Link>
        </small>
      </form>
    </section>
  );
};

export default Register;
