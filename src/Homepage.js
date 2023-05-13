import React from "react";
import "./Homepage.css";
import Sidenav from "./navigation/Sidenav";
import ImageUploader from "./timeline/Post/ImageUploader";
import Post from "./timeline/Post/Post";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebase.js"
import { useState } from "react";
import { useEffect } from "react";
import { userSlice
 } from "./features/userSlice";

function Homepage() {
  const [imageUrl, setImageUrl] = useState("")
  const [posts, setPosts] =  useState([])
  const collectionRef = collection(db, "post");
  const q = query(collectionRef, where("username", "==", "Nitheesh"));

  console.log(userSlice)


  useEffect(() => {
    let results = [];
    getDocs(collectionRef).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is the data of the document
        results.push({...doc.data(), id: doc.id})
        console.log(doc.id, " => ", doc.data());
      });
    }).catch((error) => {
      console.error("Error getting documents: ", error);
    });
    setPosts(results)
  }, [])


  console.log(posts)



  getDocs(q).then((querySnapshot) => {
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      console.log("Document data:", doc.data().ImageURL);
      setImageUrl(doc.data().ImageURL)
    } else {
      console.log("No matching documents!");
    }
  }).catch((error) => {
    console.error("Error getting documents:", error);
  });

  return (
    <div className="homepage">
      <div className="homepage__navWraper">
        <Sidenav />
      </div>
      <div className="homepage__timeline">
        {/* <Timeline /> */}
        <ImageUploader />
        { posts && posts.map(p => (
          <Post ImageURL={p.ImageURL} postID={p.id} />
        )) }
        
      </div>
    </div>
  );
}

export default Homepage;
