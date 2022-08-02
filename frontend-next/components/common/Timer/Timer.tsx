/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useRef, useEffect} from 'react';
const Timer = ({children, timerInit = '00:00'}: any) => {
  const Ref: any = useRef(null);

  const [timer, setTimer] = useState(timerInit);

  const getTimeRemaining = (e: any) => {
    const total: any = Date.parse(e) - Date.parse('' + new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (e: any) => {
    let {total, hours, minutes, seconds} = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        (minutes > 9 ? minutes : '0' + minutes) +
          ':' +
          (seconds > 9 ? seconds : '0' + seconds),
      );
    }
  };

  const clearTimer = (e: any) => {
    setTimer('02:00');

    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();

    deadline.setSeconds(deadline.getSeconds() + 120);
    return deadline;
  };
  const getStartTime = () => {
    let deadline = new Date();

    deadline.setSeconds(deadline.getSeconds() + 120);
    return deadline;
  };

  useEffect(() => {
    clearTimer(getStartTime());
  }, []);

  const onClickReset = () => {
    clearTimer(getDeadTime());
  };

  return (
    <div className="flex">
      {/* {timer !== "00:00" && <h4>{timer}  </h4>} */}

      {children(onClickReset, timer !== '00:00')}
    </div>
  );
};

export default Timer;
