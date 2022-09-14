import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  connectFirestoreEmulator,
  enableMultiTabIndexedDbPersistence,
  collection,
  addDoc, getDoc, getDocs
} from 'firebase/firestore'
import {
  getAuth,
  connectAuthEmulator
  // signInWithCredential,
  // EmailAuthProvider
} from 'firebase/auth'
import { } from 'firebase/app-check';
import firebaseConfig from "./config";


const { initializeAppCheck, ReCaptchaV3Provider } = require("firebase/app-check");


const initFirebase = async () => {
  try {
    const app = initializeApp(firebaseConfig())
    const firestore = getFirestore(app)
    const auth = getAuth(app)


	const appCheck = initializeAppCheck(app, {
	  provider: new ReCaptchaV3Provider('6Leue_chAAAAAJMNkml5CPlxOp12y37ovuxR7ZAt'),

	  // Optional argument. If true, the SDK automatically refreshes App Check
	  // tokens as needed.
	  isTokenAutoRefreshEnabled: true
	});


    const projects = await getDocs(collection(firestore, "projects"));
    /*querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });*/

    if (process.env.NODE_ENV !== 'production') {
      connectAuthEmulator(auth, 'http://localhost:9099')
      connectFirestoreEmulator(firestore, 'localhost', 8080)
      enableMultiTabIndexedDbPersistence(firestore)
      /**
       * The following code logins the user automatically to speed up development.
       * For this to work you first need to create a user and then run the command
       * yarn emulator:export, then import the data when starting the emulator
       * yarn firebase emulators:start --only firestore,auth --import=firestore_mock_data
       */
      // signInWithCredential(
      //   auth,
      //   EmailAuthProvider.credential('john@doe.com', '123123')
      // )
    }
  } catch (err) {
    console.error(err)
    return err
  }
}

export default initFirebase
