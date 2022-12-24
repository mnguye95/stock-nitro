import { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { AiOutlineCloseCircle, AiOutlineCheckCircle } from "react-icons/ai";
import Calendar from "../components/calendar";
import moment from "moment";
import Navbar from "../components/navbar";
import { Tooltip } from "react-tooltip";
import Popup from "reactjs-popup";
// import Candles from "../components/candles";

const Journal = () => {
  const { details, addTrade, closeTrade, formatter } = UserAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [today, setToday] = useState(
    moment()
  );
  const [day, selectDay] = useState({
    key: moment().format("MM/DD/YYYY"),
    text: moment().format("MMM Do YYYY"),
  });
  const [confirmBuy, setConfirmBuy] = useState(false);
  const [confirmSell, setConfirmSell] = useState("");
  const [priceSold, setPriceSold] = useState(0);
  const [error, setError] = useState("");
  const [entry, setEntry] = useState({
    type: "",
    quanity: 0,
    buy_price: 0,
    sell_price: null,
    time_sold: null,
    total: 0,
    notes: "",
  });

  function refreshClock() {
    setToday(moment());
  }

  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);

  const handleTrade = async () => {
    if (entry.quanity > 0 && entry.buy_price > 0) {
      let writeCheck = await addTrade(entry);
      setEntry({
        type: "",
        quanity: 0,
        buy_price: 0,
        sell_price: null,
        time_sold: null,
        total: 0,
        notes: "",
      })
    } else {
      setError("Please add a quanity and fill price.");
    }
  };

  const handleClose = async (trade) => {
    if (priceSold > 0) {
      let closeConfirm = await closeTrade(trade);
      if (!closeConfirm) {
        setError("Insufficient Funds.");
      }
    } else {
      setError("Please add a sell price.");
    }
  };

  const onDayClick = (e, dateContext) => {
    let text = dateContext.format("MMM Do YYYY");
    let key = dateContext.format("MM/DD/YYYY");
    selectDay({ text, key });
  };

  let trades = [];
  const dayTrades = details.trades[day.key] || {};
  const positions = dayTrades["positions"] || {};
  Object.keys(positions).sort().forEach((key) => {
    let trade = positions[key];
    let pL = Math.round((trade.sell_price - trade.buy_price) / trade.buy_price * 100) / 100
    let sold = trade.sell_price > 0;
    console.log(pL);
    trades.push(
      <tr
        key={key}
        className={`${
          trade.sell_price ? (trade.buy_price < trade.sell_price ? 'bg-green-400' : 'bg-red-400') : ''
        }`}
        id={`row-${key}`}
      >
        <td>{moment(parseInt(key)).format("h:mmA")}</td>
        <td>{trade.type}</td>
        <td>{trade.quanity}</td>
        <td>{formatter.format(trade.buy_price)}</td>
        <td>{formatter.format(trade.total)}</td>
        <td>{trade.sell_price && `${pL * 100}%`}</td>
        <td>
          {sold ? (
            formatter.format(trade.sell_price)
          ) : (
              <Popup
                modal={true}
                repositionOnResize={true}
                trigger={
                  <p
                    id={`sell-${key}`}
                    onClick={() => setConfirmSell(key)}
                    className="rounded-md text-sm font-bungee bg-red-400 border border-black cursor-pointer hover:scale-105 duration-75"
                  >
                    SELL
                  </p>}
                position="left center"
              >
                <div className="flex flex-col items-center gap-4 p-16 mx-auto">
                  <p className="text-4xl text-center font-bold">Close {trade.type}</p>
                  <div className="grid grid-cols-2 border-purple-gray border-4 rounded-md">
                    <p className="text-2xl font-bold p-2 text-center">Buy Time: {moment(parseInt(key)).format("h:mmA")}</p>
                    <p className="text-2xl font-bold p-2 text-center">Quanity: {trade.quanity}</p>
                    <p className="text-2xl font-bold p-2 text-center">Cost: {formatter.format(trade.buy_price)}</p>
                    <p className="text-2xl font-bold p-2 text-center">Total: {formatter.format(trade.total)}</p>
                  </div>
                <p className="font-bold text-2xl">
                  Sell Price
                </p>
                <input
                  className="rounded-md border border-purple-gray p-2 appearance-none"
                  onChange={(e) => setPriceSold(e.target.value)}
                  type={"number"}
                  placeholder="Enter Close Price"
                />
                <button
                  className="text-2xl font-bold bg-red-200 py-1 px-5 rounded-md font-space-grotesk hover:scale-105 duration-75"
                  onClick={() =>
                    handleClose({
                      day: day,
                      timestamp: key,
                      price_sold: priceSold,
                      quanity: trade.quanity,
                    })
                  }
                >Confirm</button> 
                <div className="flex gap-1">
                  <div className="flex flex-col">
                    <label className="font-bungee" htmlFor="notes">
                      Notes
                    </label>
                    <textarea
                      id="notes"
                      className="rounded-md p-1 border-purple-gray border h-full resize-none"
                      type={"text"}
                      onChange={(e) =>
                        setEntry({ ...entry, notes: e.target.value })
                      }
                      value={entry.notes}
                    ></textarea>
                </div>
                </div>
                <p className="font-bold text-2xl">
                {today.format("MMMM Do YYYY, h:mm:ss a")}</p>
                </div>
              </Popup>
          )}
        </td>
      </tr>
    );
  });

  return (
    <div className="w-full md:h-screen bg-white md:overflow-hidden">
      <Navbar />
      {/* <Candles/> */}
      <div className="flex md:flex-row flex-col w-full md:h-[91%] h-[50%]">
        <div className="flex flex-col md:w-2/3 bg-gray-200 p-5 gap-4 border-purple-gray md:border-[10px]">
          <div className="flex md:flex-row flex-col items-center justify-between md:text-left text-center">
            <h1 className="font-bungee font-purple-gray md:text-5xl text-2xl select-none">
              {moment(day).format("MMMM YYYY")}
            </h1>
            <div className="flex font-bungee md:text-4xl text-2xl select-none">
              <p>
                {details.current
                  ? formatter.format(details.current)
                  : formatter.format(0)}{" "}
              </p>
              <p className="text-green-500">
                &nbsp;{" "}
                {Math.round(
                  (details.starting - details.current) / details.starting
                )}
                % YTD
              </p>
            </div>
          </div>
          <Calendar trades={details.trades} onDayClick={onDayClick} />
        </div>
        <div className="flex md:flex-col flex-col-reverse md:w-1/3">
          <div className="flex flex-col h-1/2 w-full border-purple-gray md:border-r-[10px] md:border-t-[10px] md:border-b-[10px] p-5 gap-2">
            <h3 className="font-bungee font-purple-gray text-center text-xl pl-3">
              {day.text} Trades
            </h3>
            <div className="overflow-y-auto overflow-x-hidden [&_*]:font-space-grotesk border-purple-gray border-4">
              <table className="[&_th]:bg-white [&_th]:p-1 [&_td]:p-1 [&_th]:font-bold [&_th]:text-2xl [&_td]:select-none [&_td]:text-center [&_td]:border-2 [&_td]:font-bold [&_td]:text-xl [&_thead]:sticky [&_thead]:top-0 [&_thead]:z-1 [&_th]:sticky [&_th]:top-0 [&_th]:z-1 border-collapse w-full">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Type</th>
                    <th>Qty</th>
                    <th>Buy</th>
                    <th>$</th>
                    <th>P/L</th>
                    <th>Sell</th>
                  </tr>
                </thead>
                <tbody>{trades}</tbody>
              </table>
            </div>
          </div>
          <div className="flex flex-col h-1/2 w-full border-purple-gray md:border-r-[10px] md:border-b-[10px]">
            <div className="flex flex-col w-full h-full bg-gray-100 p-5 gap-6 justify-center">
              <h3 className="font-bungee font-purple-gray text-center text-2xl pl-3">
                Trade Entry
              </h3>
              <div className="flex gap-1">
                <div className="flex flex-col gap-1 h-full w-1/2 ">
                  <label className="font-bungee" htmlFor="notes">
                    Notes
                  </label>
                  <textarea
                    id="notes"
                    className="rounded-md p-1 border-purple-gray border h-full resize-none"
                    type={"text"}
                    onChange={(e) =>
                      setEntry({ ...entry, notes: e.target.value })
                    }
                    value={entry.notes}
                  ></textarea>
                </div>
                <div className="flex flex-col gap-1 h-full w-1/2 justify-center">
                  <div className="flex flex-col gap-1">
                    <label className="font-bungee" htmlFor="quanity">
                      Quanity
                    </label>
                    <input
                      id="quanity"
                      type={"number"}
                      className="rounded-md p-1 border-purple-gray border"
                      placeholder="0"
                      onChange={(e) =>
                        setEntry({
                          ...entry,
                          quanity: parseInt(e.target.value),
                          total: e.target.value * entry.buy_price * 100,
                        })
                      }
                      value={entry.quanity}
                    ></input>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-bungee" htmlFor="fill-price">
                      Fill Price
                    </label>
                    <input
                      id="fill-price"
                      type={"number"}
                      className="rounded-md p-1 border-purple-gray border"
                      placeholder="$0.00"
                      onChange={(e) =>
                        setEntry({
                          ...entry,
                          buy_price: e.target.value,
                          total: e.target.value * entry.quanity * 100,
                        })
                      }
                      value={entry.buy_price}
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
                      value={formatter.format(entry.total)}
                    ></input>
                  </div>
                </div>
              </div>
              {error ? (
                <p className="border-rose-600 bg-rose-200 text-rose-500 rounded-md text-2xl font-bold p-2 text-center">
                  {error}
                </p>
              ) : (
                <p className="text-center text-lg font-bungee">{today.format("MMMM Do YYYY, h:mm:ss a")}</p>
              )}
            </div>
            {confirmBuy ? (
              <div className="flex bottom-0">
                <div
                  onClick={() => handleTrade()}
                  className="flex flex-col items-center justify-center p-3 w-1/2 bg-green-400 cursor-pointer group"
                >
                  <span className="flex gap-2 items-center font-bungee group-hover:scale-125 select-none">
                    Confirm {entry.type} <AiOutlineCheckCircle />
                  </span>
                </div>
                <div
                  onClick={() => {
                    setConfirmBuy(false);
                    setError("");
                  }}
                  className="flex flex-col items-center justify-center p-3 w-1/2 bg-red-400  cursor-pointer group"
                >
                  <span className="flex gap-2 items-center font-bungee group-hover:scale-125 select-none">
                    Cancel {entry.type} <AiOutlineCloseCircle />
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex bottom-0">
                <div
                  onClick={() => {
                    setEntry({
                      ...entry,
                      type: "CALL",
                    });
                    setConfirmBuy(true);
                  }}
                  className="flex flex-col items-center justify-center p-3 w-1/2 bg-green-400 cursor-pointer group"
                >
                  <span className="font-bungee group-hover:scale-125 select-none">
                    BUY CALL
                  </span>
                </div>
                <div
                  onClick={() => {
                    setEntry({
                      ...entry,
                      type: "PUT",
                    });
                    setConfirmBuy(true);
                  }}
                  className="flex flex-col items-center justify-center p-3 w-1/2 bg-red-400  cursor-pointer group"
                >
                  <span className="font-bungee group-hover:scale-125 select-none">
                    BUY PUT
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journal;
