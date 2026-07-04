import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, updateDoc } from "firebase/firestore";

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

async function fixStatus() {
  console.log("Fixing articles status...");
  try {
    const querySnapshot = await getDocs(collection(db, "articles"));
    for (const document of querySnapshot.docs) {
      const data = document.data();
      if (!data.status) {
        await updateDoc(doc(db, "articles", document.id), {
          status: "published"
        });
        console.log(`Updated status to "published" for: ${data.title}`);
      } else {
        console.log(`Skipped (already has status): ${data.title}`);
      }
    }
    console.log("Fix complete!");
  } catch (err) {
    console.error("Error fixing status:", err);
  }
}

fixStatus();
