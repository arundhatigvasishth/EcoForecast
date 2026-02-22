import React from "react";
import { useNavigate, Link } from "react-router-dom";

export default function MyCompany() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#D9E4D7] text-[#0c120b]">
            <div className="mx-auto max-w-6xl px-6 py-14">
                <h1 className="text-4xl font-black">My Company</h1>

                <p className="mt-4 text-[#324D3E]/80 max-w-2xl">
                    This page can hold company profile info, uploaded datasets,
                    saved forecasts, and quick navigation into the Inputs flow.
                </p>

                <div className="mt-10 grid gap-6 md:grid-cols-3">
                    {/* Profile Card */}
                    <div className="rounded-2xl border border-black/10 bg-white/35 p-6">
                        <div className="font-semibold">Profile</div>
                        <div className="mt-2 text-sm text-[#324D3E]/80">
                            Name, industry, location, size.
                        </div>
                    </div>

                    {/* Saved Runs Card */}
                    <div className="rounded-2xl border border-black/10 bg-white/35 p-6">
                        <div className="font-semibold">Saved Runs</div>
                        <div className="mt-2 text-sm text-[#324D3E]/80">
                            Your previous forecasts and outputs.
                        </div>
                    </div>

                    {/* Quick Actions Card */}
                    <div className="rounded-2xl border border-black/10 bg-white/35 p-6">
                        <div className="font-semibold">Quick Actions</div>
                        <div className="mt-2 text-sm text-[#324D3E]/80">
                            Jump to Inputs, compare scenarios.
                        </div>

                        <div className="mt-6 flex gap-3">
                            {/* ✅ MyCompany -> Inputs */}
                            <button
                                onClick={() => navigate("/inputs")}
                                className="rounded-xl bg-[#0f3b2f] px-4 py-2 text-white font-semibold hover:opacity-90"
                            >
                                Go to Inputs
                            </button>

                            {/* Back to Home */}
                            <Link
                                to="/"
                                className="rounded-xl border border-black/20 px-4 py-2 font-semibold hover:bg-white/40"
                            >
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
