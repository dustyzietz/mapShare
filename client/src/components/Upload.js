import React, { useState } from 'react';
import axios from 'axios';
import $ from 'jquery';

const Upload = ({setPlayer, player}) => {

	// constructor( props ) {
  // super( props );
  // this.state = {
  //  selectedFile: null,
  //  selectedFiles: null,
  //  imageArray: [],
  // }
  // }
  const [selectedFile, setSelectedFile] = useState()
  const [selectedFiles, setSelectedFiles] = useState()
  const [imageArray, setImageArray] = useState([])
  
	
	const singleFileChangedHandler = ( event ) => {
   setSelectedFile(event.target.files[0]) 
	};
	
	const singleFileUploadHandler = ( event ) => {
  const data = new FormData();// If file selected
		if ( selectedFile ) {data.append( 'profileImage', selectedFile, selectedFile.name );
		axios.post( '/upload/img-upload', data, {
    headers: {
     'accept': 'application/json',
     'Accept-Language': 'en-US,en;q=0.8',
     'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
    }
   })
    .then( ( response ) => {if ( 200 === response.status ) {
      // If file size is larger than expected.
      if( response.data.error ) {
       if ( 'LIMIT_FILE_SIZE' === response.data.error.code ) {
        this.ocShowAlert( 'Max size: 2MB', 'red' );
       } else {
        console.log( response.data );// If not the given file type
        this.ocShowAlert( response.data.error, 'red' );
       }
      } else {
       // Success
       let fileName = response.data;
       console.log( 'fileData', fileName );
       // DUSTY show fileName.location
       setImageArray([fileName.location, ...imageArray])
       setPlayer({ ...player, url: fileName.location });
       ocShowAlert( 'File Uploaded', '#3089cf' );
      }
     }
    }).catch( ( error ) => {
    // If another error
    this.ocShowAlert( error, 'red' );
   });
  } else {
   // if file not selected throw error
   this.ocShowAlert( 'Please upload file', 'red' );
		}};
		
	//	ShowAlert Function
 const ocShowAlert = ( message, background = '#3089cf' ) => {
  let alertContainer = document.querySelector( '#oc-alert-container' ),
   alertEl = document.createElement( 'div' ),
   textNode = document.createTextNode( message );
  alertEl.setAttribute( 'class', 'oc-alert-pop-up' );
  $( alertEl ).css( 'background', background );
  alertEl.appendChild( textNode );
  alertContainer.appendChild( alertEl );
  setTimeout( function () {
   $( alertEl ).fadeOut( 'slow' );
   $( alertEl ).remove();
  }, 3000 );
 };

		return(
			
		 <div className="container">
     {/* For Alert box*/}
     <div id="oc-alert-container"></div>{/* Single File Upload*/}
     <div className="card border-light mb-3 mt-5" style={{ boxShadow: '0 5px 10px 2px rgba(195,192,192,.5)' }}>
      <div className="card-header">
       <h3 style={{ color: '#555', marginLeft: '12px' }}>Single Image Upload</h3>
       <p className="text-muted" style={{ marginLeft: '12px' }}>Upload Size: 250px x 250px ( Max 2MB )</p>
      </div>
      <div className="card-body">
       <p className="card-text">Please upload an image for your profile</p>
       <input type="file" onChange={singleFileChangedHandler}/>
       <div className="mt-5">
        <button className="btn btn-info" onClick={singleFileUploadHandler}>Upload!</button>
       </div>
      </div>
      {/* <img src="https://dustyimages.s3.amazonaws.com/geodinium-1597988227048.jpg" alt=""/>
      {imageArray.map((image, i) => {
        return (
          console.log(image)
         // <img src={image[i]} alt="" />
        )
      })} */}
						</div>
						</div>
		);
	}

export default Upload;