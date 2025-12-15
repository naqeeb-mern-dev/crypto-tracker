import { Star } from 'lucide-react';
import React from 'react'
import { cryptoHighlight, MiniChart } from '../../user_utils/cryptoHelpers';
import TradingViewWidget from "../../user_component/TradingViewData"
import { Link } from 'react-router-dom';

export default function CryptoTable({activeTab,ShimmerRow, loading,filteredCrypto,userId,hLList,setHLList,coinIcons }) {
  return (
    <div className="overflow-x-auto crypto-table">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th>#</th>
                  <th>Coin</th>
                  <th>Price</th>
                  <th>1h</th>
                  <th>24h</th>
                  <th>7d</th>
                  <th>24h Volume</th>
                  <th>Market Cap</th>
                  <th>Last 7 Days</th>
                </tr>
              </thead>
              {activeTab == "all" && (
                <tbody>
                  {loading
                    ? [...Array(10)].map((_, i) => <ShimmerRow key={i} />)
                    : filteredCrypto?.map((crypto) => (
                        <tr
                          key={crypto.id}
                          className={` hover:bg-gray-50 transition-colors`}
                        >
                          {/* Rank */}

                          <td>
                            <div className="flex items-center gap-2">
                              <Star
                                onClick={(e) => {
                                  e.stopPropagation();
                                  cryptoHighlight(userId, crypto.id, setHLList); // ✅ pass setHLList
                                }}
                                className={`${
                                  hLList.some((item) => item.coinId == crypto.id)
                                    ? "text-yellow-500"
                                    : "text-gray-400"
                                } w-4 h-4 hover:text-yellow-500 cursor-pointer`}
                              />

                              <span className="font-medium text-gray-900">
                                {crypto.cmc_rank}
                              </span>
                            </div>
                          </td>

                          {/* Name + Symbol */}
                          <td>
                            <div className="flex items-center gap-3">
                              {/* <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full"></div> */}
                              <img
                                src={
                                  coinIcons[crypto.id] ||
                                  "https://placehold.co/32x32?text=?"
                                }
                                alt={crypto.name}
                                className="w-8 h-8 rounded-full"
                                onError={(e) => {
                                  e.target.src =
                                    "https://placehold.co/32x32?text=?";
                                }}
                              />
                              <div>
                                <Link to={`/currencies/${crypto.slug}`} state={{
                                    crypto: crypto,
                                    logo: coinIcons[crypto.id]
                                  }}>
                                  <div className="font-semibold text-gray-900">
                                    {crypto.name}
                                  </div>
                                </Link>
                                <div className="text-sm text-gray-500">
                                  {crypto.symbol}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Price */}
                          <td>
                            <span className="font-semibold text-gray-900">
                              ${crypto.quote?.USD?.price.toLocaleString()}
                            </span>
                          </td>

                          {/* 1h Change */}
                          <td>
                            <span
                              className={
                                crypto.quote?.USD?.percent_change_1h < 0
                                  ? "text-red-600"
                                  : "text-green-600"
                              }
                            >
                              {crypto.quote?.USD?.percent_change_1h < 0
                                ? "▼"
                                : "▲"}{" "}
                              {crypto.quote?.USD?.percent_change_1h.toFixed(2)}%
                            </span>
                          </td>

                          {/* 24h Change */}
                          <td>
                            <span
                              className={
                                crypto.quote?.USD?.percent_change_24h < 0
                                  ? "text-red-600"
                                  : "text-green-600"
                              }
                            >
                              {crypto.quote?.USD?.percent_change_24h < 0
                                ? "▼"
                                : "▲"}{" "}
                              {crypto.quote?.USD?.percent_change_24h.toFixed(2)}
                              %
                            </span>
                          </td>

                          {/* 7d Change */}
                          <td>
                            <span
                              className={
                                crypto.quote?.USD?.percent_change_7d < 0
                                  ? "text-red-600"
                                  : "text-green-600"
                              }
                            >
                              {crypto.quote?.USD?.percent_change_7d < 0
                                ? "▼"
                                : "▲"}{" "}
                              {crypto.quote?.USD?.percent_change_7d.toFixed(2)}%
                            </span>
                          </td>

                          {/* Volume */}
                          <td className=" text-gray-900">
                            ${crypto.quote?.USD?.volume_24h.toLocaleString()}
                          </td>

                          {/* Market Cap */}
                          <td className=" font-semibold text-gray-900">
                            ${crypto.quote?.USD?.market_cap.toLocaleString()}
                          </td>

                          {/* Mini Chart */}
                          <td>
                            <MiniChart
                              color={
                                crypto.quote?.USD?.percent_change_7d < 0
                                  ? "red"
                                  : "green"
                              }
                            />
                          </td>
                        </tr>
                      ))}
                </tbody>
              )}
              {activeTab == "highlights" && (
                <tbody>
                  {filteredCrypto
                    ?.filter((crypto) =>
                      hLList.some((h) => h.coinId == crypto.id)
                    )
                    .map((crypto) => (
                      <tr
                        key={crypto.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        {/* Rank */}
                        <td>
                          <div className="flex items-center gap-2">
                            
                            <Star
                              onClick={(e) => {
                                e.stopPropagation();
                                cryptoHighlight(userId, crypto.id, setHLList); // ✅ pass setHLList
                              }}
                              className={`${
                                hLList.some((item) => item.coinId == crypto.id)
                                  ? "text-yellow-500"
                                  : "text-gray-400"
                              } w-4 h-4 hover:text-yellow-500 cursor-pointer`}
                            />


                            <span className="font-medium text-gray-900">
                              {crypto.cmc_rank}
                            </span>
                          </div>
                        </td>

                        {/* Name + Symbol */}
                        <td>
                          <div className="flex items-center gap-3">
                            <img
                              src={
                                coinIcons[crypto.id] ||
                                "https://placehold.co/32x32?text=?"
                              }
                              alt={crypto.name}
                              className="w-8 h-8 rounded-full"
                              onError={(e) => {
                                e.target.src =
                                  "https://placehold.co/32x32?text=?";
                              }}
                            />
                            <div>
                              <Link to={`/currencies/${crypto.slug}`}>
                                <div className="font-semibold text-gray-900">
                                  {crypto.name}
                                </div>
                              </Link>
                              <div className="text-sm text-gray-500">
                                {crypto.symbol}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Price */}
                        <td>
                          <span className="font-semibold text-gray-900">
                            ${crypto.quote?.USD?.price.toLocaleString()}
                          </span>
                        </td>

                        {/* 1h Change */}
                        <td>
                          <span
                            className={
                              crypto.quote?.USD?.percent_change_1h < 0
                                ? "text-red-600"
                                : "text-green-600"
                            }
                          >
                            {crypto.quote?.USD?.percent_change_1h < 0
                              ? "▼"
                              : "▲"}{" "}
                            {crypto.quote?.USD?.percent_change_1h.toFixed(2)}%
                          </span>
                        </td>

                        {/* 24h Change */}
                        <td>
                          <span
                            className={
                              crypto.quote?.USD?.percent_change_24h < 0
                                ? "text-red-600"
                                : "text-green-600"
                            }
                          >
                            {crypto.quote?.USD?.percent_change_24h < 0
                              ? "▼"
                              : "▲"}{" "}
                            {crypto.quote?.USD?.percent_change_24h.toFixed(2)}%
                          </span>
                        </td>

                        {/* 7d Change */}
                        <td>
                          <span
                            className={
                              crypto.quote?.USD?.percent_change_7d < 0
                                ? "text-red-600"
                                : "text-green-600"
                            }
                          >
                            {crypto.quote?.USD?.percent_change_7d < 0
                              ? "▼"
                              : "▲"}{" "}
                            {crypto.quote?.USD?.percent_change_7d.toFixed(2)}%
                          </span>
                        </td>

                        {/* Volume */}
                        <td className=" text-gray-900">
                          ${crypto.quote?.USD?.volume_24h.toLocaleString()}
                        </td>

                        {/* Market Cap */}
                        <td className=" font-semibold text-gray-900">
                          ${crypto.quote?.USD?.market_cap.toLocaleString()}
                        </td>

                        {/* Mini Chart */}
                        <td>
                          <MiniChart
                            color={
                              crypto.quote?.USD?.percent_change_7d < 0
                                ? "red"
                                : "green"
                            }
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              )}

               
            </table>
            
          </div>
  )
}
