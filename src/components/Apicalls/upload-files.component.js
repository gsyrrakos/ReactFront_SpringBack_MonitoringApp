import React, { Component } from "react";
import UploadService from "../Apicalls/upload-files.service";
import { Form } from 'react-bootstrap';

const STYLES = ['btn--primary', 'btn--outline', 'btn--test'];

const SIZES = ['btn--medium', 'btn--large'];
export default class UploadFiles extends Component {
  constructor(props) {
    super(props);
    this.selectFile = this.selectFile.bind(this);
    this.upload = this.upload.bind(this);

    this.state = {
      selectedFiles: undefined,
      currentFile: undefined,
      progress: 0,
      message: "",
      

      fileInfos: [],
    };
  }

  

  componentDidMount() {

    this.interval = setInterval(() => {
      
   
    UploadService.getFiles().then((response) => {
      this.setState({
        fileInfos: response.data,
      });
    }); 
  },5000);
  }

  selectFile(event) {
    this.setState({
      selectedFiles: event.target.files,
    });
  }

  upload() {
    let currentFile = this.state.selectedFiles[0];

    this.setState({
      progress: 0,
      currentFile: currentFile,
    });

    UploadService.upload(currentFile, (event) => {
      this.setState({
        progress: Math.round((100 * event.loaded) / event.total),
      });
    })
      .then((response) => {
        this.setState({
          message: response.data.message,
        });
        return UploadService.getFiles();
      })
      .then((files) => {
        this.setState({
          fileInfos: files.data,
        });
      })
      .catch(() => {
        this.setState({
          progress: 0,
          message: "Could not upload the file!",
          currentFile: undefined,
        });
      });

    this.setState({
      selectedFiles: undefined,
    });
  }

  render() {
    
    const {
      selectedFiles,
      
      message,
     
    } = this.state;
   
  
    return (
      <div>
        

        <label className="btn">
          <input type="file" onChange={this.selectFile} />
        </label>
        
        


        <button
          className="btn btn-success"
          disabled={!selectedFiles}
          onClick={this.upload}
        >
          Upload
        </button>

        

        <div className="alert alert-light" role="alert">
        <h1>{message}</h1> 
        </div>

      </div>
    );
  }
}

/*
        <div className="card">
          <div className="card-header">List of Files</div>
          <ul className="list-group list-group-flush">
            {fileInfos &&
              fileInfos.map((file, index) => (
                <li className="list-group-item" key={index}>
                  <a href={file.url}>{file.demand}</a>
                </li>
              ))}
          </ul>
        </div>
        */