import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, orderBy, limit } from "firebase/firestore";

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

async function test() {
  const q = query(collection(db, "articles"), orderBy("createdAt", "desc"), limit(1));
  const snap = await getDocs(q);
  snap.docs.forEach(doc => {
    console.log("ID:", doc.id);
    console.log("Title:", doc.data().title);
    console.log("Content Length:", doc.data().content?.length);
  });
}
test();
