import { getAnalytics } from "firebase/analytics";
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import Login from "./components/Auth/Login";
import { Layout } from "./components/Layouts";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "./style/style.css";

const firebaseConfig = {
  apiKey: "AIzaSyBbEJBILCsmyC1ln5xVZ2ifQAX7F7iizQs",
  authDomain: "onboarding-example-8c233.firebaseapp.com",
  projectId: "onboarding-example-8c233",
  storageBucket: "onboarding-example-8c233.appspot.com",
  messagingSenderId: "247454591287",
  appId: "1:247454591287:web:0090fa547542f8e20052b2"
};

const app = initializeApp(firebaseConfig);

export const firestoreDB = getFirestore(app);
function App() {
  getAnalytics();
  return (
    <Layout>
      <Login />
    </Layout>
  );
}

export default App;
