import {FaEllipsisH} from 'react-icons/fa'
import {AiOutlineHeart,AiOutlineComment} from 'react-icons/ai'
import {BiPaperPlane} from 'react-icons/bi'
import {BsBookmarks} from 'react-icons/bs'
// import Avatar from "@material-ui/core/Avatar"
import './Post.css'
import { useEffect, useState } from 'react'
import { db } from '../../firebase'
import { doc, collection, onSnapshot,addDoc,serverTimestamp,query,orderBy, updateDoc, where, getDocs } from "firebase/firestore";


// const userComments = ["hello", "hai"]


export default function Post({postID,username,ImageURL,comment}) {
    const[userComments,setuserComments]=useState([]);
    const[userComment,setuserComment]=useState('');
    useEffect(() => {
        let unsubscribe;
        let results = [];

        const collectionRef = collection(db, "post");
        const fieldToQuery = "postId";
        const valueToQuery = postID;
        const q = query(collectionRef, where(fieldToQuery, "==", valueToQuery));

        getDocs(q)
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data()}`);
            });
        })
            .catch((error) => {
                console.error("Error getting documents: ", error);
        });
        if (postID) {
          const postRef = doc(db, "post", postID);
          const commentsRef = query(
            collection(postRef, "comment"),
            orderBy("timestamp", "asc")
          );
          unsubscribe = onSnapshot(commentsRef, (snapshot) => {
            setuserComments(snapshot.docs.map((doc) => doc.data()));
            snapshot.docs.map((doc) => {
                results.push({...doc.data(), id: doc.id})
                console.log(doc.data())
            })
            // results.push(snapshot.docs.map((doc) => {doc.data(), doc.id}))
            console.log(results)
 
        });
        }
        return () => {
          unsubscribe && unsubscribe();
        };
      }, [postID]);

      const postComment = (event) => {
        event.preventDefault();
        addDoc(collection(doc(db, "post", postID), "comment"), {
          text: userComment,
          username: "Unknown",
          timestamp: serverTimestamp()
        })
        setuserComment("");
        // let results = []
        // results.push({username: "Unknown", text: userComment})
        // setuserComments([...userComments, ...results])
        // console.log(userComments)
        // setuserComment("")
      };

      
    return ( 
        <div className="post">
                    <div className="post_title">
                        <div className="post_left">
                            <div className="profile">
                                {/* <Avatar className="Profile_pic" alt='Profile' /> */}
                            </div>
                            <div className="name">
                                <b>{username}</b>
                            </div>
                        </div>
                        <div className="post_right">
                            <div className="ellip">
                                <FaEllipsisH/>
                            </div>
                        </div>
                    </div>
                    <div class="image">
                        <img src={ImageURL} alt="img1" />
                    </div>
                    <div className="post_footer">
                        <div className="icons">
                            <div className="post_left">
                                {/* <div class="comment">
                                    <AiOutlineHeart/>
                                    <AiOutlineComment/>
                                    <BiPaperPlane/>
                                </div> */}
                            </div>
                            {/* <div className="post_right">
                                <div class="save"><BsBookmarks/></div>
                            </div> */}
                        </div>
                        <div className="details">
                            <div className="comments">{comment}</div>
                        </div>
                        <div className="post_comments">
                        {   
                            userComments.map((comment) => (
                                <p>
                                    <strong>{comment.username}</strong> {comment.text}
                                </p>
                        ))}
                        </div>

                        <div className="write mild">
                            <div className="left_side">
                                <input type="text" placeholder="Add a comment...."  value={userComment} onChange={(e)=>setuserComment(e.target.value)}/>
                            </div>
                            <div className="right_side">
                                <button disabled={!userComment} type='submit' onClick={postComment}>Post</button>
                            </div>
                        </div>
                    </div>
                </div>
     );
}