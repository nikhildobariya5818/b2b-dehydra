"use client";

import { FormEvent, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "../admin-login-styles.css";

export const dynamic = "force-dynamic";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [needsSetup, setNeedsSetup] = useState(false);
  const [isCheckingSetup, setIsCheckingSetup] = useState(true);

  // Check if admin account exists
  useEffect(() => {
    async function checkSetupStatus() {
      try {
        const response = await fetch("/api/admin/setup-status");
        const data = await response.json();
        
        if (!data.setupComplete) {
          setNeedsSetup(true);
        }
      } catch (err) {
        console.error("Failed to check setup status:", err);
      } finally {
        setIsCheckingSetup(false);
      }
    }

    checkSetupStatus();
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/sign-in/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("[v0] Login error:", errorData);
        setError(errorData.message || errorData.error || "Login failed. Please check your credentials.");
        return;
      }

      router.push("/admin");
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("[v0] Login exception:", err);
    } finally {
      setIsLoading(false);
    }
  }

  if (isCheckingSetup) {
    return (
      <div className="login-container">
        <div className="login-box">
          <h1>De&apos;Hydra Admin</h1>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (needsSetup) {
    return (
      <div className="login-container">
        <div className="login-box">
          <h1>De&apos;Hydra Admin</h1>
          <p>Welcome! Let&apos;s set up your admin account</p>
          
          <div style={{ 
            backgroundColor: "#e7f3ff", 
            border: "1px solid #b3d9ff", 
            padding: "1rem", 
            borderRadius: "4px", 
            marginBottom: "1.5rem",
            textAlign: "center" 
          }}>
            <p style={{ margin: "0 0 1rem 0" }}>No admin account exists yet. Create your admin account now.</p>
            <Link href="/admin/register" style={{ 
              display: "inline-block",
              backgroundColor: "#007bff",
              color: "white",
              padding: "0.5rem 1.5rem",
              borderRadius: "4px",
              textDecoration: "none",
              fontWeight: "500"
            }}>
              Create Admin Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>De&apos;Hydra Admin</h1>
        <p>Sign in to your account</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@dehydrafoods.com"
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              required
              disabled={isLoading}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="login-footer">
          Don&apos;t have an account?{" "}
          <Link href="/admin/register" className="register-link">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
