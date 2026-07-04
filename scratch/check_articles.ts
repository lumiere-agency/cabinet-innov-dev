import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAxEiKb_3IP3OML7jDVZvzvhFDh8Co5w5E",
  authDomain: "site-innovdev.firebaseapp.com",
  projectId: "site-innovdev",
  storageBucket: "site-innovdev.firebasestorage.app",
  messagingSenderId: "303604620710",
  appId: "1:303604620710:web:6f9119bd16e2685e840367",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function check() {
  const snap = await getDocs(collection(db, "articles"));
  console.log(`Found ${snap.size} articles.`);
  snap.docs.forEach(doc => {
    const data = doc.data();
    console.log(`- [${doc.id}] ${data.title} (Content length: ${data.content?.length || 0})`);
  });
}
check();
