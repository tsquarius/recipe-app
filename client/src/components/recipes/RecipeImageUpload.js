import React, { useState } from "react";
import { storage } from "../../config/firebaseConfig";
import UpdateImage from "./UpdateImage"; // helper component to handle mutation
import { IS_AUTHOR } from "../../graphql/queries";
import { Query } from "react-apollo";

const ImageUpload = props => {
  const { recipeId } = props;

  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const [uploadedImg, setUploadedImg] = useState("");
  const [progress, setProgress] = useState(0);

  const handleAttachImage = e => {
    setImage(e.target.files[0]);
  };

  const handleImageUpload = e => {
    e.preventDefault();
    const uploadTask = storage.ref(`/recipeImages/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        const percentComplete = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(percentComplete);
      },
      error => {
        setMessage(error);
      },
      () => {
        storage
          .ref("recipeImages")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            setUploadedImg(url);
            setMessage("Successfully uploaded image!");
          });
      }
    );
  };

  return (
    <Query query={IS_AUTHOR} variables={{ id: recipeId }}>
      {({ loading, error, data }) => {
        if (loading) return null;
        if (error) return null;

        if (data.isAuthor.hasAccess) {
          return (
            <div className="main-content-row">
              <form onSubmit={handleImageUpload}>
                <input type="file" onChange={handleAttachImage} />
                <button type="submit">Upload</button>
              </form>
              <progress value={progress} max="100" />
              <p>{message}</p>
              {uploadedImg.length > 0 ? (
                <UpdateImage url={uploadedImg} recipeId={recipeId} />
              ) : (
                ""
              )}
            </div>
          );
        } else {
          return null;
        }
      }}
    </Query>
  );
};

export default ImageUpload;
