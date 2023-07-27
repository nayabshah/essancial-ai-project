import { useState } from "react";
import axios from "axios";
import Stonk from "./Stonk";
import DatePicker from "react-datepicker";

import "./App.css";
import "react-datepicker/dist/react-datepicker.css";
function App() {
  const [fetchedData, setFetchedData] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [ticker, setTicker] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const year = startDate.getFullYear();
    const month = String(startDate.getMonth() + 1).padStart(2, "0");
    const day = String(startDate.getDate()).padStart(2, "0");

    // Format the date string
    const formattedDate = `${year}-${month}-${day}`;

    try {
      const res = await axios.post("/api/fetchStockData", {
        ticker: ticker,
        date: formattedDate,
      });

      setFetchedData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex justify-center align-center mt-4">
        {fetchedData && fetchedData.length > 0 && (
          <Stonk initialData={fetchedData} />
        )}

        <form className="bg-white  px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Symbol of stock
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              value={ticker}
              onChange={(e) => setTicker(e.target.value)}
              placeholder="Symbol"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Date
            </label>

            <DatePicker
              selected={startDate}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(date) => setStartDate(date)}
              dateFormat="yyyy-MM-dd"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Get Data
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
