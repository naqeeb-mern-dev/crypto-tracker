import React from "react";

export default function TitleSec() {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Cryptocurrency Prices by Market Cap
          </h1>
          <p className="text-gray-600">
            The global cryptocurrency market cap today is $3.19 Trillion, a{" "}
            <span className="text-green-600 font-semibold">▲ 1.6%</span> change
            in the last 24 hours.{" "}
            {/* <a href="#" className="text-blue-600 hover:underline font-semibold">Read more</a> */}
          </p>
        </div>
        {/* <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center gap-2">
                  Highlights ✓
                </button> */}
      </div>
    </div>
  );
}
