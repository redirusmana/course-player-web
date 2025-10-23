import React, { useState, type FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "@/core/services/authServices";
import { useAuthStore } from "@/core/stores/useAuthStore";

import "@/modules/auth/styles/LoginPage.css";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [localError, setLocalError] = useState<string | null>(null);

  const { isLoading, error: authError, setError } = useAuthStore();

  useEffect(() => {
    setError(null);
  }, [setError]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!form.username || !form.password) {
      setLocalError("Nama Lengkap dan Kata Sandi wajib diisi.");
      return;
    }

    try {
      const responseData = await authService.login(
        form.username,
        form.password
      );
      if (responseData.status === 200 && responseData.data) {
        navigate("/course", { replace: true });
      }
    } catch (err) {
      setForm((prev) => {
        return {
          ...prev,
          password: "",
        };
      });
      console.log(err);
    }
  };

  return (
    <div className="login-page">
      <div className="left-panel">
        <div className="left-content">
          <h2>KOMUNITAS MEA</h2>
          <p>Komunitas Jago Jualan Online</p>
        </div>
      </div>

      <div className="right-panel">
        <div className="tab-container">
          <div className="tab active">Masuk</div>
          <div className="tab">Daftar</div>
        </div>
        <div className="right-panel-container">
          <p className="sub-title">
            Silahkan masuk ke akun Komunitas Mea kamu!{" "}
          </p>

          <form onSubmit={handleLogin}>
            {(localError || authError) && (
              <div className="error-message">{localError || authError}</div>
            )}

            <div className="input-group">
              <label htmlFor="fullName">Nama Lengkap</label>
              <input
                id="fullName"
                type="text"
                placeholder="Masukkan Nama Lengkap"
                value={form.username}
                onChange={(e) =>
                  setForm((prev) => {
                    return {
                      ...prev,
                      username: e.target.value,
                    };
                  })
                }
                className="form-input"
                disabled={isLoading}
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Kata Sandi</label>
              <input
                id="password"
                type="password"
                placeholder="Masukkan Kata Sandi"
                value={form.password}
                onChange={(e) =>
                  setForm((prev) => {
                    return {
                      ...prev,
                      password: e.target.value,
                    };
                  })
                }
                className="form-input"
                disabled={isLoading}
              />
              <p className="link-forgot">Lupa Kata Sandi</p>
            </div>

            <button type="submit" className="btn-login" disabled={isLoading}>
              {isLoading ? "Memproses..." : "Masuk"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
