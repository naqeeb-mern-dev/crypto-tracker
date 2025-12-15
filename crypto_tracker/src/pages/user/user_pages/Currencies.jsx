import React, { useEffect, useRef, memo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getCryptoListById } from "../user_utils/CryptoApi";
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  Users,
  Coins,
  Infinity,
  X,
} from "lucide-react";
import UserHeader from "../user_component/UserHeader";

function Currencies() {
  const location = useLocation();
  const crypto = location.state.crypto;
  const cryptoLogo = location.state.logo; 
  const [cryptoData, setCryptoData] = useState(null);
  const [loading, setLoading] = useState(true);

  const widgetRef = useRef(null);

  const formatNumber = (num) => {
    if (!num && num !== 0) return "N/A";

    const abs = Math.abs(num);

    if (abs >= 1_000_000_000_000)
      return (num / 1_000_000_000_000).toFixed(2) + "T";

    if (abs >= 1_000_000_000) return (num / 1_000_000_000).toFixed(2) + "B";

    if (abs >= 1_000_000) return (num / 1_000_000).toFixed(2) + "M";

    if (abs >= 1_000) return (num / 1_000).toFixed(2) + "K";

    return num.toString();
  };

  // Fetch crypto data
  useEffect(() => {
    let isMounted = true;

    const loadCryptoData = async (firstLoad = false) => {
      try {
        if (firstLoad) setLoading(true); // only show loading on first load
        const data = await getCryptoListById(crypto.id);
        if (!isMounted) return;
        setCryptoData(data?.data || []);
      } catch (err) {
        console.log("Error loading crypto data:", err);
      } finally {
        if (firstLoad && isMounted) setLoading(false); // hide loading after first load
      }
    };

    loadCryptoData(true); // first load

    const interval = setInterval(() => {
      loadCryptoData(false); // subsequent updates do not show loading
    }, 10000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [crypto.id]);

  // TradingView chart
  useEffect(() => {
    if (!widgetRef.current) return;

    widgetRef.current.innerHTML = "";
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: `OKX:${crypto.symbol}USD`,
      interval: "D",
      timezone: "Etc/UTC",
      theme: "light",
      style: "1",
      locale: "en",
      hide_top_toolbar: false,
      hide_side_toolbar: false,
      allow_symbol_change: false,
      calendar: false,
      support_host: "https://www.tradingview.com",
    });
    widgetRef.current.appendChild(script);

    return () => {
      if (widgetRef.current) {
        widgetRef.current.innerHTML = "";
      }
    };
  }, [crypto.symbol]);

  // Loading skeleton
  const LoadingSkeleton = () => (
    <div className="animate-pulse space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
        <div className="flex-1 space-y-2">
          <div className="h-6 bg-gray-200 rounded w-48"></div>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
      </div>
      <div className="h-12 bg-gray-200 rounded w-full"></div>
      <div className="grid grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-24 bg-gray-100 rounded-xl"></div>
        ))}
      </div>
    </div>
  );

  const PercentageChange = ({ value, label }) => {
    const isPositive = value >= 0;
    return (
      <div
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${
          isPositive ? "bg-green-50" : "bg-red-50"
        }`}
      >
        {isPositive ? (
          <TrendingUp className="w-4 h-4 text-green-600" />
        ) : (
          <TrendingDown className="w-4 h-4 text-red-600" />
        )}
        <span className="text-xs text-gray-600">{label}:</span>
        <span
          className={`text-sm font-bold ${
            isPositive ? "text-green-600" : "text-red-600"
          }`}
        >
          {isPositive ? "+" : ""}
          {value?.toFixed(2)}%
        </span>
      </div>
    );
  };

  const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className="flex flex-col items-start p-5 bg-white rounded-xl shadow hover:shadow-lg border border-gray-200 transition-all duration-300">
      <div className={`p-3 rounded-full bg-${color}-100 mb-2`}>
        <Icon className={`w-5 h-5 text-${color}-600`} />
      </div>
      <span className="text-gray-500 text-xs uppercase">{label}</span>
      <span className="font-bold text-gray-900 text-lg">{value}</span>
    </div>
  );

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
       <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">CT</span>
              </div>
              <span className="font-bold text-xl">Crypto Tracker</span>

              <Link
                              to={"/dashboard"}
                              className="text-gray-700 ml-5 hover:text-gray-900 font-medium"
                            >
                              Cryptocurrencies
                            </Link>
            </div>
            
            <button className="text-gray-600 hover:text-gray-900">
                <Link to={"/dashboard"}>
                 <X className="w-6 h-6" />
                 </Link> 
            </button>
          </div>
        </div>
      </header>
      {/* Chart on top */}
      <div
        className="bg-white rounded-2xl shadow border border-gray-200 overflow-hidden"
        style={{ height: 500 }}
      >
        <div ref={widgetRef} className="tradingview-widget-container h-full">
          <div className="tradingview-widget-container__widget h-full"></div>
        </div>
      </div>

      {/* Coin Info and Details below */}
      {loading ? (
        <LoadingSkeleton />
      ) : (
        <div className="space-y-6 max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 bg-white rounded-2xl p-6 shadow">
            <img
              src={cryptoLogo || "https://placehold.co/48x48?text=?"}
              alt={cryptoData?.name}
              className="w-16 h-16 rounded-full shadow ring-2 ring-indigo-300"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {cryptoData?.name}
              </h1>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-gray-600 font-medium">
                  {cryptoData?.symbol}
                </span>
                <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full">
                  Rank #{cryptoData?.cmc_rank}
                </span>
              </div>
            </div>
          </div>

          {/* Price and Percentage Changes */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 shadow flex flex-col lg:flex-row items-start justify-between gap-4">
            <div className="text-4xl font-bold text-gray-900">
              $
              {cryptoData?.quote?.USD?.price?.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
            <div className="flex flex-wrap gap-2">
              <PercentageChange
                value={cryptoData?.quote?.USD?.percent_change_1h}
                label="1h"
              />
              <PercentageChange
                value={cryptoData?.quote?.USD?.percent_change_24h}
                label="24h"
              />
              <PercentageChange
                value={cryptoData?.quote?.USD?.percent_change_7d}
                label="7d"
              />
              <PercentageChange
                value={cryptoData?.quote?.USD?.percent_change_30d}
                label="30d"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              icon={BarChart3}
              label="Market Cap"
              value={`$${formatNumber(cryptoData?.quote?.USD?.market_cap)}`}
              color="blue"
            />

            <StatCard
              icon={TrendingUp}
              label="24h Volume"
              value={`$${formatNumber(cryptoData?.quote?.USD?.volume_24h)}`}
              color="green"
            />

            <StatCard
              icon={Users}
              label="Dominance"
              value={`${cryptoData?.quote?.USD?.market_cap_dominance?.toFixed(
                2
              )}%`}
              color="purple"
            />
            <StatCard
              icon={Coins}
              label="Pairs"
              value={cryptoData?.num_market_pairs}
              color="orange"
            />
          </div>

          {/* Supply Info */}
          <div className="bg-white rounded-2xl p-6 shadow">
            <h3 className="text-gray-700 font-bold uppercase mb-4">
              Supply Info
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Circulating:</span>
                <span className="font-bold">
                  {crypto?.circulating_supply?.toLocaleString()}{" "}
                  {crypto?.symbol}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total:</span>
                <span className="font-bold">
                  {crypto?.total_supply?.toLocaleString()} {crypto?.symbol}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Max Supply:</span>
                <span className="font-bold flex items-center gap-2">
                  {crypto?.max_supply ? (
                    crypto.max_supply.toLocaleString()
                  ) : (
                    <>
                      <Infinity className="w-5 h-5" /> Unlimited
                    </>
                  )}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Infinite Supply:</span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    crypto?.infinite_supply
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {crypto?.infinite_supply ? "Yes" : "No"}
                </span>
              </div>
            </div>
          </div>

          {/* Tags */}
          {crypto?.tags?.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow">
              <h3 className="text-gray-700 font-bold uppercase mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {crypto.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default memo(Currencies);
