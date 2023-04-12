import firebase from "firebase/compat/app"
import 'firebase/compat/firestore'
import "firebase/storage"

const firebaseConfig = {
      ////nuribom1 (8x15yz)
      //// https://console.firebase.google.com/u/0/project/nuribom-4c069/storage/nuribom-4c069.appspot.com/files
      // apiKey: "AIzaSyBjeaokZF6zdShzUoCTEZFKywFclco2eqY",
      // authDomain: "nuribom-4c069.firebaseapp.com",
      // projectId: "nuribom-4c069",
      // storageBucket: "nuribom-4c069.appspot.com",
      // messagingSenderId: "400107717522",
      // appId: "1:400107717522:web:2764ec90f295805eb3b74b",


      //// nurinuri (0815.keem)
      //// https://console.firebase.google.com/u/1/project/nurinuri-e1b85/storage/nurinuri-e1b85.appspot.com/files
      // apiKey: "AIzaSyDhLk3H5ECQVi-0g3_raguQ4kBASEiTzdk",
      // authDomain: "nurinuri-e1b85.firebaseapp.com",
      // projectId: "nurinuri-e1b85",
      // storageBucket: "nurinuri-e1b85.appspot.com",
      // messagingSenderId: "955713427806",
      // appId: "1:955713427806:web:39d4f9c478500137ded7cf"


      ////nurinuri2 (punc3drama)
      //// https://console.firebase.google.com/u/3/project/nurinuri2-db2fa/storage/nurinuri2-db2fa.appspot.com/files
      // apiKey: "AIzaSyAyCh8BI49wYdIjZzfA5EvAIS4PVe9LJIU",
      // authDomain: "nurinuri2-db2fa.firebaseapp.com",
      // projectId: "nurinuri2-db2fa",
      // storageBucket: "nurinuri2-db2fa.appspot.com",
      // messagingSenderId: "731920165465",
      // appId: "1:731920165465:web:1f228738114bd66f379f48"


      ////nurinuri3 (001.001jay)
      //// https://console.firebase.google.com/u/4/project/nurinuri3-480f1/storage/nurinuri3-480f1.appspot.com/files
      apiKey: "AIzaSyA5-ekDXTfm1VrBmvx0WJMZn4W2kW52WmM",
      authDomain: "nurinuri3-480f1.firebaseapp.com",
      projectId: "nurinuri3-480f1",
      storageBucket: "nurinuri3-480f1.appspot.com",
      messagingSenderId: "459358812599",
      appId: "1:459358812599:web:6e6e86bad6116fe15cd032"


      ////nurinuri4 (001.002jay)
      //// 
      // apiKey: "AIzaSyB5WK8cl6lXRR865VSVn_l-drApxWUmink",
      // authDomain: "nurinuri4-69628.firebaseapp.com",
      // projectId: "nurinuri4-69628",
      // storageBucket: "nurinuri4-69628.appspot.com",
      // messagingSenderId: "570755784766",
      // appId: "1:570755784766:web:2e46459f6d1131c23d316f"

      };

// firebaseConfig 정보로 firebase 시작
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
// export const storage = firebase.storage();