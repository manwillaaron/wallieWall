
import React, { useState } from 'react';
import { v4 as randomString } from 'uuid';
import Dropzone from 'react-dropzone';
import { GridLoader } from 'react-spinners';
import { getUser } from '../Dux/authReducer';
import { connect } from 'react-redux';
import axios from 'axios';

function MyDropzone(props) {
  const [isUploading, setIsUploading] = useState(0);
  const [url, setUrl] = useState(0);



  const getSignedRequest = ([file]) => {
    setIsUploading(true)
    const fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`;

    axios.get('/api/signs3', {
      params: {
        'file-name': fileName,
        'file-type': file.type,
      },
    })
      .then(res => {

        const { signedRequest, url } = res.data;
        uploadFile(file, signedRequest, url);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const uploadFile = (file, signedRequest, url) => {
    console.log('hit0')
    const options = {
      headers: {
        'Content-Type': file.type,
      },
    };

    console.log(signedRequest);
    console.log(file);
    console.log(url)

    axios.put(signedRequest, file, options)
      .then(res => {
        console.log('hit1')
        setIsUploading(false)
        setUrl(url)
      })
      .catch(err => {
        console.log('hit2')
        console.log(err)
        setIsUploading(false)
        if (err.res.status === 403) {
          alert(
            `Your request for a signed URL failed with a status 403. Double check the CORS configuration and bucket policy in the README. You also will want to double check your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your .env and ensure that they are the same as the ones that you created in the IAM dashboard. You may need to generate new keys{
              err.stack
            }`
          );
        } else {
          alert(`ERROR: ${err.status}, ${err.stack}`);
        }
      });
  };

  // const pushWallpaper = () => {
  //   const {id} = props.aR.w_user.id
  //   axios.put(`/api/wallpaper/${id}`, url)
  //   .then(() => {

  //   })
  //   .catch(err => console.log(err));
  // }

  console.log(url)
  return (
    <div className="dropzone">

      <h1>Upload</h1>
      <img src={url} alt="" width="250px" />
      <Dropzone
        onDropAccepted={getSignedRequest}
        style={{
          width: 200,
          height: 200,
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 28,
        }}
        accept="image/*"
        multiple={false}>
        {isUploading ? <GridLoader /> : <p>Drop File or Click Here</p>}
        {/* <button onClick={pushWallpaper}>SUBMIT</button> */}
      </Dropzone>
    </div>
  );

}


const mapStateToProps = (reduxState) => {
  return {
    aR: reduxState.authReducer,
    uR: reduxState.userReducer
  }
}


export default connect(mapStateToProps, { getUser })(MyDropzone);

