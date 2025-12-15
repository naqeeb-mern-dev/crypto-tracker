import React from 'react'

export default function CryptoTableTabs({activeTab,setActiveTab}) {
  return (
    <div className="border-b border-gray-200 px-6 py-3 flex items-center gap-4">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 rounded-lg font-medium ${
                activeTab === "all"
                  ? "bg-green-100 text-green-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              📊 All
            </button>
            <button
              onClick={() => setActiveTab("highlights")}
              className={`px-4 py-2 rounded-lg font-medium ${
                activeTab === "highlights"
                  ? "bg-green-100 text-green-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              ⭐ Highlights
            </button>
          </div>
  )
}
