import React from "react";
import { MiniChart } from "../../user_utils/cryptoHelpers";

export default function StatsCards({ trendingCoins, topGainers }) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Market Cap Card */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                $3,190,121,499,730
              </div>
              <div className="text-sm text-gray-600">
                Market Cap{" "}
                <span className="text-green-600 font-semibold">▲ 1.6%</span>
              </div>
            </div>
            <MiniChart color="green" />
          </div>
        </div>

        {/* Trending */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔥</span>
              <h3 className="font-bold text-gray-900">Trending</h3>
            </div>
            {/* <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1">
                    View more <ChevronRight className="w-4 h-4" />
                  </button> */}
          </div>
          <div className="space-y-3">
            {trendingCoins.map((coin, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-red-500 rounded-full"></div>
                  <span className="font-medium text-gray-900">{coin.name}</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">
                    {coin.price}
                  </div>
                  <div
                    className={
                      coin.isPositive
                        ? "text-green-600 text-sm"
                        : "text-red-600 text-sm"
                    }
                  >
                    {coin.isPositive ? "▲" : "▼"} {coin.change}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Gainers */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🚀</span>
              <h3 className="font-bold text-gray-900">Top Gainers</h3>
            </div>
            {/* <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1">
                    View more <ChevronRight className="w-4 h-4" />
                  </button> */}
          </div>
          <div className="space-y-3">
            {topGainers.map((coin, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full"></div>
                  <span className="font-medium text-gray-900">{coin.name}</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">
                    {coin.price}
                  </div>
                  <div className="text-green-600 text-sm">▲ {coin.change}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-200 mb-8">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              $106,301,462,957
            </div>
            <div className="text-sm text-gray-600">24h Trading Volume</div>
          </div>
          <MiniChart color="green" />
        </div>
      </div>
    </>
  );
}
