"use client";

import { FormEvent, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "../admin-login-styles.css";

export const dynamic = "force-dynamic";

export default function AdminRegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [setupComplete, setSetupComplete] = useState(false);
  const [isCheckingSetup, setIsCheckingSetup] = useState(true);

  // Check if admin account already exists
  useEffect(() => {
    async function checkSetupStatus() {
      try {
        const response = await fetch("/api/admin/setup-status");
        const data = await response.json();
        
        if (data.setupComplete) {
          setSetupComplete(true);
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

    // Validation
    if (!formData.name.trim()) {
      setError("Full name is required");
      return;
    }

    if (!formData.email.trim()) {
      setError("Email is required");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/sign-up/email", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("[v0] Registration error:", errorData);
        setError(errorData.message || errorData.error || "Registration failed. Please try again.");
        return;
      }

      // Registration successful, redirect to login
      setSetupComplete(true);
      setTimeout(() => {
        router.push("/admin/login");
      }, 1500);
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
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

  if (setupComplete) {
    return (
      <div className="login-container">
        <div className="login-box">
          <h1>De&apos;Hydra Admin</h1>
          <div className="error-message" style={{ marginBottom: "1rem" }}>
            Admin account already created. Registration is closed.
          </div>
          <p>Please log in with your admin credentials.</p>
          <Link href="/admin/login" className="register-link" style={{ display: "block", textAlign: "center", marginTop: "2rem" }}>
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>De&apos;Hydra Admin</h1>
        <p>Create your admin account (one-time setup)</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Your full name"
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="At least 8 characters"
              required
              minLength={8}
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              placeholder="Confirm your password"
              required
              minLength={8}
              disabled={isLoading}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          {setupComplete && (
            <div className="success-message" style={{ marginBottom: "1rem", padding: "0.75rem", backgroundColor: "#d4edda", color: "#155724", borderRadius: "4px", textAlign: "center" }}>
              Admin account created successfully! Redirecting to login...
            </div>
          )}

          <button type="submit" className="login-btn" disabled={isLoading || setupComplete}>
            {isLoading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="login-footer">
          Already have an account?{" "}
          <Link href="/admin/login" className="register-link">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}
