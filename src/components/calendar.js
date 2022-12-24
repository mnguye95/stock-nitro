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
    "flex flex-col p-1 rounded-[2%] text-black bg-white font-bungee text-2xl";

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

    // let dayTrades = [];
    // let trades =
    //   props.trades[
    //     `${state.dateContext.format("MM")}/${d}/${state.dateContext.format(
    //       "YYYY"
    //     )}`
    //   ];
    // if (trades) {
    //   for (const trade in trades['positions']) {
    //     dayTrades.push({ time: trade, ...trades['positions'][trade] });
    //   }
    // }

    let trades = [];
    let dayTrades = props.trades[
      `${state.dateContext.format("MM")}/${d}/${state.dateContext.format(
        "YYYY"
      )}`
    ] || [];
    const positions = dayTrades["positions"] || {};
    Object.keys(positions).sort().forEach((key) => {
      let trade = positions[key];
      trades.push(
        { time: key, ...trade });
    });

    cells.push({
      day: d,
      className: className,
      trades: trades,
    });
  }

  //
  console.log();

  // console.log("days: ", daysInMonth);

  // var totalSlots = [...blanks, ...daysInMonthNow];
  // let rows = [];
  // let cells = [];

  // totalSlots.forEach((row, i) => {
  //   if (i % 7 !== 0) {
  //     cells.push(row);
  //   } else {
  //     let insertRow = cells.slice();
  //     rows.push(insertRow);
  //     cells = [];
  //     cells.push(row);
  //   }
  //   if (i === totalSlots.length - 1) {
  //     let insertRow = cells.slice();
  //     rows.push(insertRow);
  //   }
  // });

  // let trElems = rows.map((d, i) => {
  //   return <tr key={i * 100}>{d}</tr>;
  // });

  // return (
  //   <div className="p-0 m-0 border-2-sky-300 h-full">
  //     <table className="p-0 m-0 bg-white border-spacing-0 border-collapse w-full h-full">
  //       <thead className="text-center w-full">
  //         <tr className="p-0 m-0 border-b-1 border-dashed border-sky-300 w-full ">
  //           <td className="border-spacing-0 pl-[5px] mx-auto" colSpan="5">
  //             <MonthNav /> <YearNav />
  //           </td>
  //           <td colSpan="2" className="absolute top-2 text-xl r-[3px]">
  //             <i
  //               className="prev fa fa-fw fa-chevron-left"
  //               onClick={(e) => {
  //                 prevMonth();
  //               }}
  //             ></i>
  //             <i
  //               className="prev fa fa-fw fa-chevron-right"
  //               onClick={(e) => {
  //                 nextMonth();
  //               }}
  //             ></i>
  //           </td>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         <tr>{wdElements}</tr>
  //         {trElems}
  //       </tbody>
  //     </table>
  //   </div>
  // );
  return (
    <div className="grid grid-cols-7 grid-rows-5 md:gap-2 w-full h-full">
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
            {cell.day}
            <div className="md:flex flex-wrap gap-2 hidden">
              {cell.trades.map((trade, index) => (
                <div key={index}>
                  <div
                    id={`trade-${cell.day}-${index}`}
                    key={index}
                    className={`${
                      trade.sell_price
                        ? trade.buy_price > trade.sell_price
                          ? "bg-red-600"
                          : "bg-green-500"
                        : "bg-gray-400"
                    } rounded-full border-2 border-black p-[0.3em]`}
                  ></div>
                  <Tooltip
                    key={`tooltip-${cell.day}-${index}`}
                    anchorId={`trade-${cell.day}-${index}`}
                    content={trade.sell_price ? `${ Math.round((trade.sell_price - trade.buy_price) / trade.buy_price * 100) / 100 * 100}%` : ''}
                  />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Calendar;
