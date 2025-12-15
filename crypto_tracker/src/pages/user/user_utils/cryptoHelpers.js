import { cryptoHighLightsList, cryptoHighLightsUpdate } from "./CryptoApi";

export const trendingCoins = [
  { name: "Firo", price: "$2.20", change: "0.3%", isPositive: true },
  { name: "Bitcoin", price: "$91,143.70", change: "1.8%", isPositive: true },
  {
    name: "Pudgy Penguins",
    price: "$0.0113",
    change: "0.1%",
    isPositive: false,
  },
];

export const topGainers = [
  { name: "Lucidum", price: "$0.292", change: "47.3%", isPositive: true },
  { name: "Moonbeam", price: "$0.0363", change: "37.1%", isPositive: true },
  { name: "Audiera", price: "$1.85", change: "2%", isPositive: true },
];

export const marketStats = {
  coins: "19,224",
  exchanges: "1,440",
  marketCap: "$3.19T",
  marketCapChange: "1.6%",
  volume24h: "$106.301B",
  dominance: { btc: "57.1%", eth: "11.8%" },
  gas: "0.36 GWEI",
};


export const ShimmerRow = () => (
    <tr className="animate-pulse">
      {[...Array(9)].map((_, i) => (
        <td key={i} className="px-6 py-4">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
        </td>
      ))}
    </tr>
  );
// Function to chunk an array
export function chunkArray(array, chunkSize) {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

// Function to load coin icons in batches
export async function loadIcons(coinIds, cryptoIcon) {
  const chunks = chunkArray(coinIds, 50); // max 50 per request
  let icons = {};

  for (const chunk of chunks) {
    try {
      const batchIcons = await cryptoIcon(chunk);
      Object.entries(batchIcons).forEach(([id, data]) => {
        if (data?.logo) icons[id] = data.logo;
      });
    } catch (err) {
      console.log("Batch icon request failed:", err);
    }
    await new Promise((r) => setTimeout(r, 200)); // 200ms delay
  }

  return icons;
}

// Toggle highlight
export async function cryptoHighlight(userId, coinId, setHLList) {
  try {
    const data = await cryptoHighLightsUpdate(userId, coinId);
    console.log("Highlight update status:", data?.status);
    // Refresh list
    await cryptoHList(userId, setHLList);
  } catch (err) {
    console.error("Failed to update highlights:", err);
  }
}

export async function cryptoHList(userId, setHLList) {
  try {
    const data = await cryptoHighLightsList(userId);
    setHLList(data?.data || []); // even if empty, setHLList([])
  } catch (err) {
    console.error("Failed to fetch highlights list:", err);
    setHLList([]); // fallback
  }
}



// Mini chart component
export const MiniChart = ({ color }) => (
  <svg width="120" height="40" viewBox="0 0 120 40" className="inline-block">
    <path
      d={
        color === "green"
          ? "M0,35 L20,32 L40,28 L60,25 L80,15 L100,12 L120,10"
          : "M0,10 L20,15 L40,20 L60,18 L80,25 L100,30 L120,32"
      }
      fill="none"
      stroke={color === "green" ? "#10b981" : "#ef4444"}
      strokeWidth="2"
    />
  </svg>
);
