import { firestore } from '../firebase';
import { useEffect } from 'react';

function TestPage() {
    useEffect(() => {
    // bucket이라는 변수로 firestore의 collection인 bucket에 접근
    const bucket = firestore.collection("test");

    // collection의 document인 "bucket_item"을 가져온다.
    bucket.doc("wpe6mtNyREZLfSWH8hA8").get().then((doc) => {

      // document의 데이터를 가져옴
      console.log(doc.data());
      // document의 id를 가져옴
      console.log(doc.id);
    });
  });

  return (
    <div>
      firebase 확인해보기!
    </div>
  );
}

export default TestPage;