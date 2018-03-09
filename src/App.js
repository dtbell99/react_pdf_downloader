import React, { Component } from 'react';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      requestedFile: "customer-is-sometimes-right.pdf"
    }
  }

  updateState = (evt) => {
    console.log("updateState: " + evt.target.name + " : " + evt.target.value)
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  getFile = async () => {
    var request = new Request("/fileservice", {
      method: 'POST',
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ "requestedFile": this.state.requestedFile })
    })
    try {
      const payload = await fetch(request)
      const blob = await (payload.blob())
      var blobData = new Blob([blob], { type: "application/octet-stream" })
      //IE CODE
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blobData);
        return;
      }
      const data = window.URL.createObjectURL(blobData);
      var link = document.createElement('a');
      link.href = data;
      link.download = this.state.requestedFile
      link.click();
      setTimeout(function () {
        // FIREFOX CODE
        window.URL.revokeObjectURL(data)
      }, 100)
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <div className="App">
        <select onChange={(evt) => this.updateState(evt)} name="requestedFile">
          <option value="customer-is-sometimes-right.pdf">Customer is sometimes right</option>
          <option value="cat_scan.pdf">Cat scan</option>
        </select>
        <a href="#download" onClick={this.getFile}>Download File</a>
        <br /><br />

      </div>
    );
  }
}

export default App;