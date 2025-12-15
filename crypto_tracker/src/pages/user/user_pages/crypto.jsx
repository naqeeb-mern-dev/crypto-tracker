import React, { useEffect, useState } from "react";
import UserHeader from "../user_component/UserHeader";
import { cryptoIcon, getCryptoList} from "../user_utils/CryptoApi";
import "../../../css/Crypto.css";
import { loadIcons, trendingCoins, topGainers, marketStats, cryptoHList, ShimmerRow} from "../user_utils/cryptoHelpers";
import StatsCards from "../user_component/crypto_dashboard/StatsCards";
import TitleSec from "../user_component/crypto_dashboard/TitleSec";
import CryptoTableTabs from "../user_component/crypto_dashboard/CryptoTableTabs";
import CryptoTable from "../user_component/crypto_dashboard/CryptoTable";
import TradingViewTicker from "../user_component/TradingViewTicker";

const CryptoDashboard = ({ userId }) => {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  let [cryptoData, setCryptoData] = useState([]);
  const [coinIcons, setCoinIcons] = useState({});
  let [hLList, setHLList] = useState([]);


  const filteredCrypto = cryptoData.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.symbol.toLowerCase().includes(search.toLowerCase())
  );

    // Log updates
  useEffect(() => {
    console.log("Updated highlights list:", hLList);
  }, [hLList]);

  // Load highlights on mount
  useEffect(() => {
    cryptoHList(userId,setHLList);
  }, [userId]);

  useEffect(() => {
    let isMounted = true;

    const loadCryptoData = async (showShimmer = false) => {
      try {
        if (showShimmer) setLoading(true);

        const data = await getCryptoList();
        if (!isMounted) return;

        const list = data?.data?.data || [];
        setCryptoData(list);

        const coinIds = list.map((c) => c.id);
        const icons = await loadIcons(coinIds, cryptoIcon);

        if (!isMounted) return;
        setCoinIcons((prev) => ({
          ...prev,
          ...icons,
        }));
      } catch (err) {
        console.log("Error loading crypto data:", err);
      } finally {
        if (showShimmer) setLoading(false);
      }
    };

    loadCryptoData(true);

    const interval = setInterval(() => {
      loadCryptoData(false);
    }, 10000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <UserHeader
        marketStats={marketStats}
        userId={userId}
        search={search}
        setSearch={setSearch}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Title Section */}

        <TitleSec />

         <TradingViewTicker />

        {/* Stats Cards */}
        <StatsCards trendingCoins={trendingCoins} topGainers={topGainers} className="mt-5" />

        {/* 24h Volume Card */}

       

        {/* Tabs */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          
          <CryptoTableTabs activeTab={activeTab} setActiveTab={setActiveTab}/>

          {/* Table */}
           <CryptoTable activeTab={activeTab} ShimmerRow={ShimmerRow} loading={loading} filteredCrypto={filteredCrypto} userId={userId} hLList={hLList} setHLList={setHLList} coinIcons={coinIcons} />
        </div>
      </main>
    </div>
  );
};

export default CryptoDashboard;
