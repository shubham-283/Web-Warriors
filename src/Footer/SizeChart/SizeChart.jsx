import React from "react";

const SizeChart = () => {
  const sizes = [
    { size: "S", bust: 35, waist: 34, hip: 41 },
    { size: "M", bust: 37, waist: 36, hip: 43 },
    { size: "L", bust: 39, waist: 38, hip: 45 },
    { size: "XL", bust: 41, waist: 40, hip: 47 },
    { size: "XXL", bust: 43, waist: 42, hip: 49 },
  ];

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-lg pt-24">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-semibold text-pink-600 mb-2">
          Size Guide
        </h2>
        <p className="text-gray-600">Female Ethnic Wear Measurements</p>
      </div>

      <div className="space-y-8">
        {/* Inches Table */}
        <div className="bg-white rounded-lg overflow-hidden border border-pink-100">
          <div className="bg-pink-50 px-6 py-4">
            <h3 className="text-lg font-medium text-pink-700">
              Measurements in Inches
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-pink-500 text-white">
                  <th className="px-6 py-4 text-left font-medium">Size</th>
                  <th className="px-6 py-4 text-left font-medium">Bust</th>
                  <th className="px-6 py-4 text-left font-medium">Waist</th>
                  <th className="px-6 py-4 text-left font-medium">Hip</th>
                </tr>
              </thead>
              <tbody>
                {sizes.map((item, index) => (
                  <tr
                    key={item.size}
                    className={`border-t border-pink-100 ${
                      index % 2 === 0 ? "bg-pink-50/30" : "bg-white"
                    }`}
                  >
                    <td className="px-6 py-4 font-medium text-pink-700">{item.size}</td>
                    <td className="px-6 py-4 text-gray-700">{item.bust}"</td>
                    <td className="px-6 py-4 text-gray-700">{item.waist}"</td>
                    <td className="px-6 py-4 text-gray-700">{item.hip}"</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Centimeters Table */}
        <div className="bg-white rounded-lg overflow-hidden border border-pink-100">
          <div className="bg-pink-50 px-6 py-4">
            <h3 className="text-lg font-medium text-pink-700">
              Measurements in Centimeters
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-pink-500 text-white">
                  <th className="px-6 py-4 text-left font-medium">Size</th>
                  <th className="px-6 py-4 text-left font-medium">Bust</th>
                  <th className="px-6 py-4 text-left font-medium">Waist</th>
                  <th className="px-6 py-4 text-left font-medium">Hip</th>
                </tr>
              </thead>
              <tbody>
                {sizes.map((item, index) => (
                  <tr
                    key={item.size}
                    className={`border-t border-pink-100 ${
                      index % 2 === 0 ? "bg-pink-50/30" : "bg-white"
                    }`}
                  >
                    <td className="px-6 py-4 font-medium text-pink-700">{item.size}</td>
                    <td className="px-6 py-4 text-gray-700">
                      {(item.bust * 2.54).toFixed(1)} cm
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {(item.waist * 2.54).toFixed(1)} cm
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {(item.hip * 2.54).toFixed(1)} cm
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>Please note: Measurements may vary slightly due to manufacturing process</p>
      </div>
    </div>
  );
};

export default SizeChart;