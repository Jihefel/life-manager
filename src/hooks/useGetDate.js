import { useDispatch } from "react-redux";
import { JOURS } from "../constants/constants";
import { getDay, getHour, getMinute } from "../redux/features/date/dateSlice";
import { useEffect } from "react";

const useGetDate = () => {
  const dispatch = useDispatch();

  function getDate() {
    const dateActuelle = new Date();
    const indexDay = dateActuelle.getDay();
    const jourActuel = JOURS.at(+indexDay - 1);
    const heureActuelle = dateActuelle.getHours();
    const minuteActuelle = dateActuelle.getMinutes();

    return { jourActuel, heureActuelle, minuteActuelle };
  }

  getDate();

  const updateTime = () => {
    const { jourActuel, heureActuelle, minuteActuelle } = getDate();
    dispatch(getDay(jourActuel));
    dispatch(getHour(heureActuelle));
    dispatch(getMinute(minuteActuelle));
  };

  updateTime();

  useEffect(() => {
    const intervalId = setInterval(updateTime, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
};

export default useGetDate;
