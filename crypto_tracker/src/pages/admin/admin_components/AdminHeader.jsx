import React from "react";
import { Link } from "react-router-dom";

export default function AdminHeader() {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </div>

        <Link
          to={"/admin-logout"}
          className="bg-white text-purple-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition"
        >
          Logout
        </Link>
      </div>
    </div>
  );
}
