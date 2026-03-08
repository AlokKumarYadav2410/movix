import { useEffect, useMemo, useState } from "react";
import {
  addAdminMovieApi,
  banUserApi,
  deleteAdminMovieApi,
  deleteUserApi,
  getAdminMoviesApi,
  getUsersApi,
  unbanUserApi,
  updateAdminMovieApi
} from "../api/admin.api";
import styles from "./AdminDashboard.module.scss";

const emptyForm = {
  title: "",
  posterUrl: "",
  description: "",
  movieId: "",
  releaseDate: "",
  trailerUrl: "",
  genre: "",
  category: ""
};

const AdminDashboard = () => {
  const [tab, setTab] = useState("movies");
  const [movies, setMovies] = useState([]);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [confirmState, setConfirmState] = useState({
    open: false,
    title: "",
    description: "",
    action: null
  });

  const showToast = (type, text) => {
    setToast({
      type,
      text,
      id: Date.now()
    });
  };

  useEffect(() => {
    if (!toast) {
      return;
    }

    const timer = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(timer);
  }, [toast]);

  const loadMovies = async () => {
    try {
      const data = await getAdminMoviesApi();
      setMovies(data?.movies || []);
    } catch (error) {
      showToast("error", error?.response?.data?.message || "Failed to load movies");
    }
  };

  const loadUsers = async () => {
    try {
      const data = await getUsersApi();
      setUsers(data?.users || []);
    } catch (error) {
      showToast("error", error?.response?.data?.message || "Failed to load users");
    }
  };

  useEffect(() => {
    setLoading(true);
    Promise.allSettled([loadMovies(), loadUsers()]).finally(() => setLoading(false));
  }, []);

  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) => Number(b.role === "admin") - Number(a.role === "admin"));
  }, [users]);

  const onInput = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId("");
  };

  const submitMovie = async (event) => {
    event.preventDefault();

    try {
      if (editingId) {
        await updateAdminMovieApi(editingId, form);
        showToast("success", "Movie updated successfully.");
      } else {
        await addAdminMovieApi(form);
        showToast("success", "Movie added successfully.");
      }
      resetForm();
      await loadMovies();
    } catch (error) {
      showToast("error", error?.response?.data?.message || "Action failed");
    }
  };

  const editMovie = (movie) => {
    setEditingId(movie._id);
    setForm({
      title: movie.title || "",
      posterUrl: movie.posterUrl || "",
      description: movie.description || "",
      movieId: movie.movieId || "",
      releaseDate: movie.releaseDate ? String(movie.releaseDate).slice(0, 10) : "",
      trailerUrl: movie.trailerUrl || "",
      genre: movie.genre || "",
      category: movie.category || ""
    });
  };

  const openConfirm = (title, description, action) => {
    setConfirmState({
      open: true,
      title,
      description,
      action
    });
  };

  const closeConfirm = () => {
    setConfirmState({
      open: false,
      title: "",
      description: "",
      action: null
    });
  };

  const executeConfirmAction = async () => {
    const action = confirmState.action;
    if (!action) {
      return;
    }

    try {
      if (action.type === "movie-delete") {
        await deleteAdminMovieApi(action.id);
        await loadMovies();
        showToast("success", "Movie deleted successfully.");
      }

      if (action.type === "user-delete") {
        await deleteUserApi(action.id);
        await loadUsers();
        showToast("success", "User deleted successfully.");
      }

      if (action.type === "user-ban-toggle") {
        if (action.isBanned) {
          await unbanUserApi(action.id);
          showToast("success", "User unbanned.");
        } else {
          await banUserApi(action.id);
          showToast("success", "User banned.");
        }
        await loadUsers();
      }
    } catch (error) {
      showToast("error", error?.response?.data?.message || "Action failed");
    } finally {
      closeConfirm();
    }
  };

  return (
    <section className={styles.admin}>
      <header className={styles.header}>
        <h1>Admin Dashboard</h1>
        <p>Manage movies and platform users from one place.</p>
      </header>

      <div className={styles.tabs}>
        <button type="button" className={tab === "movies" ? styles.active : ""} onClick={() => setTab("movies")}>Movies</button>
        <button type="button" className={tab === "users" ? styles.active : ""} onClick={() => setTab("users")}>Users</button>
      </div>

      {tab === "movies" ? (
        <div className={styles.grid}>
          <form className={styles.form} onSubmit={submitMovie}>
            <h2>{editingId ? "Edit Movie" : "Add Movie"}</h2>
            <input name="title" value={form.title} onChange={onInput} placeholder="Movie Title" required />
            <input name="posterUrl" value={form.posterUrl} onChange={onInput} placeholder="Poster URL" required />
            <textarea name="description" value={form.description} onChange={onInput} placeholder="Description" rows={3} />
            <input name="movieId" value={form.movieId} onChange={onInput} placeholder="Movie ID" required />
            <input name="releaseDate" value={form.releaseDate} onChange={onInput} type="date" />
            <input name="trailerUrl" value={form.trailerUrl} onChange={onInput} placeholder="YouTube trailer link" />
            <input name="genre" value={form.genre} onChange={onInput} placeholder="Genre" />
            <input name="category" value={form.category} onChange={onInput} placeholder="Category" />
            <div className={styles.formActions}>
              <button type="submit">{editingId ? "Update" : "Create"}</button>
              {editingId ? <button type="button" onClick={resetForm}>Cancel</button> : null}
            </div>
            <small>Fill movie details and submit to create or update records.</small>
          </form>

          <div className={styles.tableWrap}>
            <h2>Movies List</h2>
            {loading ? <p>Loading...</p> : movies.length === 0 ? (
              <div className={styles.emptyState}>
                <h3>No movies yet</h3>
                <p>Add your first movie using the form.</p>
              </div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {movies.map((movie) => (
                    <tr key={movie._id}>
                      <td>{movie.title}</td>
                      <td>{movie.category || "-"}</td>
                      <td className={styles.rowActions}>
                        <button type="button" onClick={() => editMovie(movie)}>Edit</button>
                        <button
                          type="button"
                          onClick={() => openConfirm(
                            "Delete movie",
                            `Are you sure you want to delete '${movie.title}'? This cannot be undone.`,
                            { type: "movie-delete", id: movie._id }
                          )}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      ) : (
        <div className={styles.tableWrap}>
          <h2>Users</h2>
          {loading ? <p>Loading...</p> : sortedUsers.length === 0 ? (
            <div className={styles.emptyState}>
              <h3>No users found</h3>
              <p>Registered users will appear here.</p>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedUsers.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{user.isBanned ? "Banned" : "Active"}</td>
                    <td className={styles.rowActions}>
                      {user.role !== "admin" ? (
                        <>
                          <button
                            type="button"
                            onClick={() => openConfirm(
                              user.isBanned ? "Unban user" : "Ban user",
                              user.isBanned
                                ? `Are you sure you want to unban ${user.name}?`
                                : `Are you sure you want to ban ${user.name}?`,
                              { type: "user-ban-toggle", id: user._id, isBanned: user.isBanned }
                            )}
                          >
                            {user.isBanned ? "Unban" : "Ban"}
                          </button>
                          <button
                            type="button"
                            onClick={() => openConfirm(
                              "Delete user",
                              `Delete account for ${user.name}? This cannot be undone.`,
                              { type: "user-delete", id: user._id }
                            )}
                          >
                            Delete
                          </button>
                        </>
                      ) : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {toast ? (
        <div className={`${styles.toast} ${toast.type === "success" ? styles.toastSuccess : styles.toastError}`} role="status">
          {toast.text}
        </div>
      ) : null}

      {confirmState.open ? (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal}>
            <h3>{confirmState.title}</h3>
            <p>{confirmState.description}</p>
            <div className={styles.modalActions}>
              <button type="button" onClick={closeConfirm}>Cancel</button>
              <button type="button" onClick={executeConfirmAction}>Confirm</button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default AdminDashboard;
