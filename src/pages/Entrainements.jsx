import { useSelector } from "react-redux";
import { isMobile } from "react-device-detect";

function Entrainements() {
  const workoutOfTheDay = useSelector((state) => state.workouts.workoutOfTheDay);

  return (
    <div className='container'>
      {workoutOfTheDay ? (
        <>
          <figure>
            <figcaption className="fw-bold">{workoutOfTheDay.nom}</figcaption>
            <img
              src={workoutOfTheDay.img}
              alt='entrainement du jour'
              className={`pt-3 ${isMobile ? "w-full" : "w-50 flex mx-auto"}`}
            />
          </figure>
        </>
      ) : (
        <p className='text-xl'>Pas d'entraînement aujourd&apos;hui. Repose toi bien !</p>
      )}
    </div>
  );
}

export default Entrainements;
