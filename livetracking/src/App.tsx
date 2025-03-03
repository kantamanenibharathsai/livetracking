
import './App.css';
import DeviceLocation from './components/DeviceLocation';
import LiveTracking from './components/LiveTracking';
import Maps from './components/maps/Maps';
import { getToken ,} from "firebase/messaging";
import { useEffect } from 'react';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { messaging } from './firebase/firebaseConfig';
import Message from './components/Message';



function App() {
  async function requestPermission() {
    //requesting permission using Notification API
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: 'BNfSZVJdI-r-K-dbE41TAbzbvAf47g_RlXH7oK4MA9Gd8eQYmvtW0cU0OR53SSxKMdajVaCyX4-8C1ITYlXdhn8',
      });

      //We can send token to server
      console.log("Token generated : ", token);
    } else if (permission === "denied") {
      //notifications are blocked
      alert("You denied for the notification");
    }
  }
  const onMessage =  (messaging:any, payload:any) => {
    toast(<Message notification={payload.notification} />);
  };

  useEffect(() => {
    requestPermission();
  }, []);
  return (
    <>
    {/* <Maps/> */}
  <LiveTracking/>
  <DeviceLocation/>
  <ToastContainer />
  </>
  
  );
}

export default App;
