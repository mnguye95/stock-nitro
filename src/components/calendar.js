import { useState, useEffect } from "react";
import moment from "moment";
import { Tooltip } from "react-tooltip";

const Calendar = (props) => {
  const [state, setState] = useState({
    dateContext: moment(),
    today: moment(),
    showMonthPopup: false,
    showYearPopup: false,
    selectedDay: moment(),
  });

  const weekdays = moment.weekdays();
  const weekdaysShort = moment.weekdaysShort();
  const months = moment.months();

  // Return year from moment object
  const year = () => {
    return state.dateContext.format("Y");
  };

  const month = () => {
    return state.dateContext.format("MMMM");
  };

  const daysInMonth = () => {
    return state.dateContext.daysInMonth();
  };

  const currentDate = () => {
    return state.dateContext.get("date");
  };

  const currentDay = () => {
    return state.dateContext.format("D");
  };

  const firstDayOfMonth = () => {
    let dateContext = state.dateContext;
    let firstDay = moment(dateContext).startOf("month").format("d");
    return firstDay;
  };

  const setMonth = (month) => {
    let monthNo = months.indexOf(month);
    let dateContext = Object.assign({}, state.dateContext);
    dateContext = moment(dateContext).set("month", monthNo);
    setState({ ...state, dateContext: dateContext });
  };

  const nextMonth = () => {
    let dateContext = Object.assign({}, state.dateContext);
    dateContext = moment(dateContext).add(1, "month");
    setState({ ...state, dateContext: dateContext });
    props.onNextMonth && props.onNextMonth();
  };

  const prevMonth = () => {
    let dateContext = Object.assign({}, state.dateContext);
    dateContext = moment(dateContext).subtract(1, "month");
    setState({ ...state, dateContext: dateContext });
    props.onPrevMonth && props.onPrevMonth();
  };

  const onSelectChange = (e, data) => {
    setMonth(data);
    props.onMonthChange && props.onMonthChange();
  };

  const SelectList = (props) => {
    let popup = props.data.map((data) => {
      return (
        <div key={data}>
          <a
            href="#"
            onClick={(e) => {
              onSelectChange(e, data);
            }}
          >
            {data}
          </a>
        </div>
      );
    });
    return (
      <div className="absolute p-1 bg-white border-2 border-sky-300">
        {popup}
      </div>
    );
  };

  const onChangeMonth = (e, month) => {
    setState({ ...state, showMonthPopup: !state.showMonthPopup });
  };

  const MonthNav = () => {
    return (
      <span className="text-xl text-center">
        {month()}
        {state.showMonthPopup && <SelectList data={months} />}
      </span>
    );
  };

  const showYearEditor = () => {
    setState({ ...state, showYearNav: !state.showYearNav });
  };

  const setYear = (year) => {
    let dateContext = Object.assign({}, state.dateContext);
    dateContext = moment(dateContext).set("year", year);
    setState({ ...state, dateContext: dateContext });
  };

  const onYearChange = (e) => {
    setYear(e.target.value);
    props.onYearChange && props.onYearChange(e, e.target.value);
  };

  const onKeyUpYear = (e) => {
    if (e.which === 13 || e.which === 27) {
      setYear(e.target.value);
    }
  };
  const YearNav = () => {
    return state.showYearNav ? (
      <input
        defaultValue={year()}
        className="editor-year"
        ref={(yearInput) => {
          yearInput = yearInput;
        }}
        onKeyUp={(e) => onKeyUpYear(e)}
        onChange={(e) => onYearChange(e)}
        type="number"
        placeholder="year"
      />
    ) : (
      <span
        className="label-year"
        onDoubleClick={(e) => {
          showYearEditor();
        }}
      >
        {year()}
      </span>
    );
  };

  const onDayClick = (e, day) => {
    setState({
      ...state,
      selectedDay: moment(
        `${state.dateContext.format("MM")}/${day}/${state.dateContext.format(
          "YYYY"
        )}`
      ),
    });
    props.onDayClick &&
      props.onDayClick(
        e,
        moment(
          `${state.dateContext.format("MM")}/${day}/${state.dateContext.format(
            "YYYY"
          )}`
        )
      );
  };

  let cells = [];
  let defaultCellStyle =
    "flex flex-col p-1 rounded-[2%] text-black bg-white font-bungee text-2xl justify-between";

  // Names of Weekdays
  let namesOfDays = weekdaysShort.map((day) => {
    return (
      <div
        key={day}
        className={defaultCellStyle + " items-center justify-center"}
      >
        {day}
      </div>
    );
  });

  for (let i = 0; i < firstDayOfMonth(); i++) {
    cells.push({
      day: null,
      className: defaultCellStyle,
    });
  }

  for (let d = 1; d <= daysInMonth(); d++) {
    let className = defaultCellStyle;
    if (d < currentDate()) {
      className +=
        " cursor-pointer bg-white hover:border-black border-2 hover:scale-105 duration-100";
      // eslint-disable-next-line
    } else if (d == currentDay()) {
      className +=
        " cursor-pointer bg-yellow-100 hover:border-black border-2 hover:scale-105 duration-100";
    }
    if (d > currentDate()) {
      className += " bg-gray-100";
    }
    // eslint-disable-next-line
    if (d == state.selectedDay.format("D")) {
      className += " border-black border-2";
    }

    let sum = 0;
    let trades = [];
    let dayTrades =
      props.trades[
        `${state.dateContext.format("MM")}/${d}/${state.dateContext.format(
          "YYYY"
        )}`
      ] || [];
    const positions = dayTrades["positions"] || {};
    Object.keys(positions)
      .sort()
      .forEach((key) => {
        let trade = positions[key];
        if (parseFloat(trade.sell_price)) {
          sum =
            sum +
            (parseFloat(trade.sell_price) - parseFloat(trade.buy_price)) *
              100 *
              parseInt(trade.quanity);
          console.log(sum);
        }
        trades.push({ time: key, ...trade });
      });

    cells.push({
      day: d,
      className: className,
      trades: trades,
      starting: dayTrades["starting"],
      sum,
    });
  }

  return (
    <div className="pb-5 grid grid-cols-7 grid-rows-5 md:gap-1 w-full h-full">
      {/* {namesOfDays} */}
      {cells.map((cell, i) => {
        if (!cell.day) {
          return <div key={i * 50} className={cell.className}></div>;
        }
        return (
          <div
            onClick={(e) => cell.day <= currentDay() && onDayClick(e, cell.day)}
            key={i + cell.day}
            className={cell.className}
          >
            <div className="flex justify-between">
              <p>{cell.day}</p>
            </div>
            <div className="md:flex flex-wrap gap-1 hidden">
              {cell.trades.map((trade, index) => {
                return (
                  <div key={index}>
                    <div
                      id={`trade-${cell.day}-${index}`}
                      key={index}
                      className={`${
                        parseFloat(trade.sell_price)
                          ? parseFloat(trade.buy_price) >
                            parseFloat(trade.sell_price)
                            ? "bg-red-300"
                            : "bg-green-300"
                          : "bg-gray-300"
                      } rounded-full border-2 border-black p-[0.15em]`}
                    ></div>
                    <Tooltip
                      key={`tooltip-${cell.day}-${index}`}
                      anchorId={`trade-${cell.day}-${index}`}
                      content={
                        parseFloat(trade.sell_price)
                          ? `${Math.round(
                              ((parseFloat(trade.sell_price) -
                                parseFloat(trade.buy_price)) /
                                parseFloat(trade.buy_price)) *
                                100
                            )}%`
                          : ""
                      }
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between">
              {cell.sum != 0 && (
                <>
                  <p
                    className={`${
                      cell.sum > 0 ? "text-green-500" : "text-red-500"
                    } text-sm`}
                  >
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      maximumFractionDigits: 0,
                      minimumFractionDigits: 0,
                    }).format(cell.sum)}
                  </p>
                  <p
                    className={`${
                      cell.sum > 0 ? "text-green-500" : "text-red-500"
                    } text-sm`}
                  >
                    {Math.round(
                      ((parseFloat(cell.starting) +
                        parseFloat(cell.sum) -
                        parseFloat(cell.starting)) /
                        parseFloat(cell.starting)) *
                        100
                    )}
                    %
                  </p>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Calendar;
