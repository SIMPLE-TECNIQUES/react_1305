// import {useState } from 'react'
// const [file, setFile] = useState(null);
// <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
// const uploadPhoto = async () => {
//     if (file) {
//       const storageRef = firebase.storage().ref();
//       const fileRef = storageRef.child(file.name);
//       await fileRef.put(file);
//       const downloadURL = await fileRef.getDownloadURL();
//       return downloadURL;
//     }
//   };
//   <button onClick={uploadPhoto}>Upload Photo</button>
//   const [photoURL, setPhotoURL] = useState(null);

//   const handleUpload = async () => {
//     const url = await uploadPhoto();
//     setPhotoURL(url);
//   };
//   function photoupload(){
//   return (
//     <div>
//       <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
//       <button onClick={handleUpload}>Upload Photo</button>
//       {photoURL && <img src={photoURL} alt="Uploaded photo" />}
//     </div>
//   )
// };
// export  defualt photoupload;
  