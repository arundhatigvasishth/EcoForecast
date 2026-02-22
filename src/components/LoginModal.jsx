import React, { useEffect } from "react";

export default function LoginModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center p-4"
      aria-modal="true"
      role="dialog"
    >
      {/* overlay */}
      <button
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-label="Close login modal"
      />

      <div className="relative w-full max-w-md rounded-2xl bg-[#f4f1ea] border border-black/10 shadow-xl p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-black leading-tight">Log In</h3>
            <p className="mt-1 text-sm text-black/70">
              Welcome back — enter your details.
            </p>
          </div>

          <button
            onClick={onClose}
            className="h-9 w-9 rounded-full border border-black/15 hover:bg-black/5 grid place-items-center"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <form className="mt-6 space-y-4">
          <div>
            <label className="text-sm text-black/80">Email</label>
            <input
              type="email"
              className="mt-2 w-full rounded-xl border border-black/15 bg-white/50 px-4 py-3 outline-none focus:border-black/40"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="text-sm text-black/80">Password</label>
            <input
              type="password"
              className="mt-2 w-full rounded-xl border border-black/15 bg-white/50 px-4 py-3 outline-none focus:border-black/40"
              placeholder="••••••••"
            />
          </div>

          <button
            type="button"
            className="w-full rounded-xl bg-[#0c120b] py-3 text-white text-sm font-medium hover:opacity-95"
          >
            Sign in
          </button>

          <div className="flex items-center justify-between text-sm text-black/70">
            <button type="button" className="hover:underline underline-offset-4">
              Forgot password?
            </button>
            <button type="button" className="hover:underline underline-offset-4">
              Create account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}