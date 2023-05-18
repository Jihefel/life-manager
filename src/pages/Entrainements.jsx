import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Entrainements() {

    const jourActuel = useSelector(state => state.whatDate.today)

    const [workoutOfTheDay, setWorkoutOfTheDay] = useState(null);

    useEffect(() => {
        switch (jourActuel) {
            case "mardi":
                setWorkoutOfTheDay(`Développé couché avec barre, prise large 8,8,8
                Tirage à la poulie, prise serrée (assis) 10,10,10
                Élévation latérale d'un bras à la poulle (courbé) 12,12,12
                Tirage poitrine à la poulie, prise large (assis) 8,8,8
                Développé epaule avec barre (debout) 8,8,8
                Flexion biceps avec barre (debout) 8,8,8
                Extension triceps à la poulie, prise main au-dessus (debout) 8,8,8
                Lever jambe, en Appui sur les Bras 3x12`)
                break;
            case "jeudi":
                setWorkoutOfTheDay(`
                Flexion jambe avec machine (incliné) 8,8,8
                Fente avec haltères  8,8,8
                Extension jambes avec machine (assis) 12,12,12
                Flexion jambe avec machine (assis) 8,8,8
                Extension mollet avec machine (debout) 15,15,15
                Roulette barre (à genoux) 3x10 `)
            break;
            case "samedi":
                setWorkoutOfTheDay(`Développé couché avec deux haltères (incliné) 8,8,8
                Tirage avec machine (assis) 8,8,8
                Élévation avant d'un seul bras à la poulie (debout) 13,13,13
                Extension triceps unilatérale à la poulie haute avec poignée (debout) 8,8,8
                Squats orteils avec machine Smith (debout) 8,8,8
                Flexion biceps Zottman avec haltères (debout) 8,8,8
                Planks `)
            break;
            default:
                setWorkoutOfTheDay("Pas d'entraînement aujourd'hui")
                break;
        }
    }, []);


    return (
        <>
        <h1>Entrainements</h1>
        <pre>{workoutOfTheDay}</pre>
        </>
     );
}

export default Entrainements;