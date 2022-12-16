import { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import Calendar from "../components/calendar";
import moment from "moment";
import Navbar from "../components/navbar";

const Journal = () => {
  const [date, setDate] = useState(moment().format("MMMM Do YYYY, h:mm:ss a"));
  const [day, selectDay] = useState(1);
  const [entry, setEntry] = useState({
    ticker: 'SPY',
    quanity: 0,
    price: 0,
    total: 0,
    notes: ''
  })

  const tradesForMonth = {
    1: [
      { type: 'PUT', strike: 389, quanity: 3, buy_price: 2.23, sell_price: 1.50 },
      { type: 'CALL', strike: 395, quanity: 1, buy_price: 1.23, sell_price: 1.50 },
      { type: 'PUT', strike: 388, quanity: 3, buy_price: 1.15, sell_price: 1.50 },
      { type: 'PUT', strike: 390, quanity: 1, buy_price: 1.73, sell_price: 1.50 },
      { type: 'PUT', strike: 391, quanity: 2, buy_price: 1.93, sell_price: 3.50 },
    ],
    2: [
      { type: 'PUT', strike: 389, quanity: 3, buy_price: 2.23, sell_price: 1.50 },
      { type: 'CALL', strike: 395, quanity: 1, buy_price: 1.23, sell_price: 1.50 },
      { type: 'PUT', strike: 388, quanity: 3, buy_price: 1.15, sell_price: 1.50 },
      { type: 'PUT', strike: 390, quanity: 1, buy_price: 1.73, sell_price: 1.50 },
      { type: 'PUT', strike: 391, quanity: 2, buy_price: 1.93, sell_price: 3.50 },
    ],
    3: [
      { type: 'PUT', strike: 389, quanity: 3, buy_price: 2.23, sell_price: 1.50 },
      { type: 'CALL', strike: 395, quanity: 1, buy_price: 1.23, sell_price: 1.50 },
      { type: 'PUT', strike: 388, quanity: 3, buy_price: 1.15, sell_price: 1.50 },
      { type: 'PUT', strike: 390, quanity: 1, buy_price: 1.73, sell_price: 1.50 },
      { type: 'PUT', strike: 391, quanity: 2, buy_price: 1.93, sell_price: 6.50 },
    ]
  };

  function refreshClock() {
    setDate(moment().format("MMMM Do YYYY, h:mm:ss a"));
  }

  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });


  const onDayClick = (e, day) => {
    selectDay(day)
  }

  return (
      <div className="w-full h-screen bg-white">
        <Navbar/>
        <div className="flex md:flex-row flex-col w-full md:h-[91%] h-[50%]">
          <div className="flex flex-col md:w-full bg-gray-200 p-5 gap-4 border-purple-gray md:border-[10px]">
            <div className="flex md:flex-row flex-col justify-between md:text-left text-center">
              <h1 className="font-bungee font-purple-gray md:text-4xl text-2xl pl-3">
                Performance Calendar
              </h1>
              <div className="flex mx-auto font-bungee text-3xl">
                <p>$15,340 </p>
                <p className="text-green-500">&nbsp; +43.0% YTD</p>
              </div>
            </div>
            <Calendar trades={tradesForMonth} onDayClick={onDayClick} />
          </div>
          <div className="flex md:flex-col flex-col-reverse">
            <div className="flex flex-col h-full w-full border-purple-gray md:border-r-[10px] md:border-t-[10px] md:border-b-[10px] p-5 gap-2">
              <h3 className="font-bungee font-purple-gray text-center text-xl pl-3">
                Positions of {day}
              </h3>
              <table className="border-purple-gray border-4 [&_td]:text-center [&_td]:border-2 [&_th]:border-2 [&_*]:font-space-grotesk ">
                <tr>
                  <th>Timestamp</th>
                  <th>Type</th>
                  <th>Strike</th>
                  <th>Qty</th>
                  <th>Buy</th>
                  <th>Sell</th>
                  <th>P/L</th>
                </tr>
                {}
                <tr className={"bg-green-300"}>
                  <td>1:39PM</td>
                  <td>Call</td>
                  <td>365</td>
                  <td>2</td>
                  <td>$1.23</td>
                  <td>$4.50</td>
                  <td>{Math.round((450 / 123) * 100)}%</td>
                </tr>
                <tr className={"bg-red-300"}>
                  <td>Put</td>
                  <td>362</td>
                  <td>8</td>
                  <td>$0.60</td>
                  <td>$1.20</td>
                  <td>{Math.round(((53 - 61) / 61) * 100)}%</td>
                </tr>
                <tr className={""}>
                  <td>Call</td>
                  <td>365</td>
                  <td>2</td>
                  <td>$1.23</td>
                  <td>
                    <a className="px-2 rounded-md text-sm font-bungee bg-red-400 border border-black cursor-pointer hover:scale-125 duration-75 ">
                      SELL
                    </a>
                  </td>
                  <td></td>
                </tr>
                <tr className={"bg-green-300"}>
                  <td>Call</td>
                  <td>365</td>
                  <td>2</td>
                  <td>$1.23</td>
                  <td>$4.50</td>
                  <td>{Math.round(((450 - 123) / 123) * 100)}%</td>
                </tr>
                <tr className={"bg-red-300"}>
                  <td>Put</td>
                  <td>362</td>
                  <td>8</td>
                  <td>$0.60</td>
                  <td>$1.20</td>
                  <td>{Math.round(((60 - 54) / 54) * 100)}%</td>
                </tr>
              </table>
              {/* <div className="flex gap-1">
                  <p className="font-bungee" htmlFor="quanity">
                    Entry Date:{" "}
                    <span className="font-space-grotesk">
                      {date}
                    </span>
                  </p>
                </div> */}
            </div>
            <div className="flex flex-col h-full w-full border-purple-gray md:border-r-[10px] md:border-b-[10px]">
              <div className="flex flex-col w-full h-full bg-gray-100 p-5">
                <h3 className="font-bungee font-purple-gray text-center text-2xl pl-3">
                  Trade Entry
                </h3>
                <div className="flex gap-1">
                  <div className="flex flex-col gap-1 w-full">
                    <label className="font-bungee" htmlFor="ticker">
                      Ticker
                    </label>
                    <input
                      id="ticker"
                      type={"text"}
                      className="rounded-md p-1 border-purple-gray border"
                      placeholder="SPY"
                      onChange={(e) => setEntry({...entry, ticker: e.target.value})}
                      value={entry.ticker}
                    ></input>
                    <label className="font-bungee" htmlFor="notes">
                      Notes
                    </label>
                    <textarea
                      id="notes"
                      className="rounded-md p-1 border-purple-gray border h-full resize-none"
                      type={"text"}
                      onChange={(e) => setEntry({...entry, notes: e.target.value})}
                      value={entry.notes}
                    ></textarea>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-col gap-1">
                      <label className="font-bungee" htmlFor="quanity">
                        Quanity
                      </label>
                      <input
                        id="quanity"
                        type={"number"}
                        className="rounded-md p-1 border-purple-gray border"
                        placeholder="0"
                        onChange={(e) => setEntry({...entry, quanity: e.target.value, total: e.target.value * entry.price})}
                        value={entry.quanity}
                      ></input>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="font-bungee" htmlFor="fill-price">
                        Fill Price
                      </label>
                      <input
                        id="fill-price"
                        type={"text"}
                        className="rounded-md p-1 border-purple-gray border"
                        placeholder="$0.00"
                        onChange={(e) => setEntry({...entry, price: e.target.value, total: e.target.value * entry.quanity})}
                        value={entry.price}
                      ></input>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="font-bungee" htmlFor="total">
                        Total Position
                      </label>
                      <input
                        id="total"
                        type={"text"}
                        className="rounded-md p-1 border-purple-gray border bg-white cursor-default"
                        placeholder="$0.00"
                        disabled
                        // onChange={(e) => setEntry({...entry, total: e.target.value})}
                        value={formatter.format(entry.total * 100)}
                      ></input>
                    </div>
                  </div>
                </div>
                <p className="text-center font-bungee" for="quanity">
                  {date}
                </p>
              </div>
              <div className="flex bottom-0">
                <div className="flex flex-col items-center justify-center p-3 w-1/2 bg-green-400 cursor-pointer group">
                  <span className="font-bungee group-hover:scale-125">
                    CALL
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center p-3 w-1/2 bg-red-400  cursor-pointer group">
                  <span className="font-bungee group-hover:scale-125">PUT</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Journal;
