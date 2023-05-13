import {useState} from 'react'
import { db } from '../../firebase';
import { addDoc,collection,serverTimestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable,getDownloadURL } from "firebase/storage";
import Compressor from 'compressorjs';
import './ImageUploader.css'
import { storage } from '../../firebase';

const ImageUploader = () => {
    const[image,setImage]=useState(null);
    const[progress,setProgress]=useState(0);
    const[caption,setCaption]=useState('');
    const [uploading, setUploading] = useState(false);
    
    const handleChange = (e) => {
        if (e.target.files[0]) {
          new Compressor(e.target.files[0], {
            quality: 0.8, 
            success: (compressedImage) => {
              setImage(compressedImage);
            },
            error: (error) => {
              console.log(error);
              alert(error);
            },
          });
        }
      };
  const handleUpload = () => {
    if (!image) {
        console.log("No image selected");
        return;
      }
    setUploading(true);
    const storageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image, {
        chunkSize: 1 * 1024 * 1024 // 1MB chunks
      });

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          addDoc(collection(db, "post"), {
            timestamp: serverTimestamp(),
            comment: caption,
            ImageURL: url,
            username: "Nitheesh",
            postId: Math.random(),
            id: collection(db, "post").id
          });
          setProgress(0);
          setCaption("");
          setImage(null);
          setUploading(false);
        });
      }
    );
  };
    
    return ( 
        <div className="ImageUploader">
            <h2>POST</h2>
            <hr />
            <input type="file" onChange={handleChange} className='choosefile' />
            <label for="choosefile" className='choosefile-label'></label>
            <label htmlFor=""></label>
            <input type="text" placeholder="Add caption.." value={caption} onChange={event => setCaption(event.target.value)}/>
            <progress value={progress} max="100"/>
            <button onClick={handleUpload} disabled={uploading} className='upload'>{uploading ? 'Uploading...' : 'Upload'}</button>
        </div>
     );
}
 
export default ImageUploader;