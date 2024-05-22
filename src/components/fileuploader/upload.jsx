// Filename - App.js

import axios from "axios";
import './upload.css'
import React, { Component } from "react";

class App extends Component {
	state = {
		// Initially, no file is selected
		selectedFile: null,
	};

	// On file select (from the pop up)
	onFileChange = (event) => {
		// Update the state
		this.setState({
			selectedFile: event.target.files[0],
		});
    const formData = new FormData();

		// Update the formData object
		formData.append(
			"myFile",
			this.state.selectedFile,
			this.state.selectedFile.name
		);

		// Details of the uploaded file
		console.log(this.state.selectedFile);

		// Request made to the backend api
		// Send formData object
		axios.post("api/uploadfile", formData);
	};



	fileData = () => {
		if (this.state.selectedFile) {
			return (
				<div className="uploadContainer">
					<h2>File Details:</h2>
					<p>
						File Name:{" "}
						{this.state.selectedFile.name}
					</p>

					<p>
						File Type:{" "}
						{this.state.selectedFile.type}
					</p>

					<p>
						Last Modified:{" "}
						{this.state.selectedFile.lastModifiedDate.toDateString()}
					</p>
				</div>
			);
		} else {
			return (
				<div>
					<br />
					
				</div>
			);
		}
	};

	render() {
		return (
			<div className="uploaderinput">
				
				
				<div >
					<input
						type="file"
						onChange={this.onFileChange}
					/>
					
				</div>
				{this.fileData()}
			</div>
		);
	}
}

export default App;
