import React from "react";
import {
  TrendingUp,
  TrendingDown,
  Star,
  Settings,
  User,
  Search,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function UserHeader({ marketStats, userId, search, setSearch }) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-8 text-sm text-gray-600">
            <span>
              Coins:{" "}
              <span className="font-semibold text-gray-900">
                {marketStats.coins}
              </span>
            </span>
            <span>
              Exchanges:{" "}
              <span className="font-semibold text-gray-900">
                {marketStats.exchanges}
              </span>
            </span>
            <span>
              Market Cap:{" "}
              <span className="font-semibold text-gray-900">
                {marketStats.marketCap}
              </span>{" "}
              <span className="text-green-600">
                ▲ {marketStats.marketCapChange}
              </span>
            </span>
            <span>
              24h Vol:{" "}
              <span className="font-semibold text-gray-900">
                {marketStats.volume24h}
              </span>
            </span>
            <span>
              Dominance:{" "}
              <span className="font-semibold text-gray-900">
                BTC {marketStats.dominance.btc}
              </span>{" "}
              <span className="font-semibold text-gray-900">
                ETH {marketStats.dominance.eth}
              </span>
            </span>
            <span>
              ⛽ Gas:{" "}
              <span className="font-semibold text-gray-900">
                {marketStats.gas}
              </span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to={"/settings"}
              state={{ userId: userId }}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <Settings className="w-5 h-5 text-gray-600" />
            </Link>
            <Link to={"/logout"} className="p-2 hover:bg-gray-100 rounded-lg">
              <LogOut className="w-5 h-5 text-gray-600" />
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">CT</span>
              </div>
              <span className="font-bold text-xl">Crypto Tracker</span>
            </div>
            <nav className="flex items-center gap-6">
              <Link
                to={"/dashboard"}
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Cryptocurrencies
              </Link>
              <Link
                to={"/settings"}
                state={{ userId: userId }}
                className="text-gray-600 hover:text-gray-900"
              >
                Profiles
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
