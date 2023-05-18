import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { HiOutlineRefresh } from "react-icons/hi";
import { Button } from "@mui/material";
import { isMobile } from "react-device-detect";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import notifications from "../assets/data/notifications.json";

function Rappels(props) {
  const heureActuelle = useSelector((state) => state.whatDate.hour);
  const minuteActuelle = useSelector((state) => state.whatDate.minute);

  const notif = (titre, corps) => {
    if (isMobile) {
      // Notifications push sur téléphone
      const firebaseConfig = {
        apiKey: "AIzaSyBOanAtRkd4hDqassdELdKRapUxqZpLpzE",
        authDomain: "life-manager-61d07.firebaseapp.com",
        databaseURL: "https://life-manager-61d07-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "life-manager-61d07",
        storageBucket: "life-manager-61d07.appspot.com",
        messagingSenderId: "57464699691",
        appId: "1:57464699691:web:bf785d2722f37af597236e",
        measurementId: "G-YV9ZHRL4Z4",
      };
      const app = initializeApp(firebaseConfig);
      const messaging = getMessaging(app);

      getToken(messaging)
        .then((token) => {
          const notificationPayload = {
            notification: {
              title: "Titre de la notification",
              body: "Corps de la notification",
            },
            token: token,
          };

          // Envoie de la notification
          messaging
            .send(notificationPayload)
            .then(() => {
              console.log("Notification envoyée avec succès");
            })
            .catch((error) => {
              console.error("Erreur lors de l'envoi de la notification:", error);
            });
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération du token:", error);
        });
    } else {
      // Utiliser la notification push pour les utilisateurs PC
      if (!window.Notification) {
        window.alert("Les notifications ne sont pas prises en charge sur ce navigateur.");
        return;
      }

      Notification.requestPermission()
        .then(permission => showNotification(permission, titre, corps))
        .catch((error) => {
          console.log("Erreur lors de la demande d'autorisation de notification:", error);
        });
    }
  };

  const showNotification = (permission, titre, corps) => {
    if (permission !== "granted") return;

    const notification = new Notification(titre, {
      body: corps,
    });

    notification.onclick = () => {
      console.log("aller ciao");
    };

    notification.onerror = (event) => {
      console.error("Erreur lors de la création de la notification:", event.target.error);
    };
  };

  setInterval(() => {
    props.getDate();
  }, 1000);

  useEffect(() => {
    const currentNotification = notifications.find((notif) => notif.hour === heureActuelle && notif.minute === minuteActuelle);
    if (currentNotification) notif(currentNotification.title, currentNotification.body);
  }, [minuteActuelle]);

  return (
    <div className='reminders'>
      <h1>
        Il est {heureActuelle} : {minuteActuelle}
      </h1>
      <Button
        variant='contained'
        onClick={notif}
      >
        Test
      </Button>
    </div>
  );
}

export default Rappels;
