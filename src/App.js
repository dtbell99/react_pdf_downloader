import React, { Component } from 'react';

class App extends Component {

  getPDF = () => {
    var request = new Request("/pdfservice", {
      method: 'GET',
      headers: {
        "content-type": "application/pdf",
      }
    })
    try {
      const payload = await fetch(request)
      const blob = await(payload.blob())
      var blobData = new Blob([blob], { type: "application/pdf" })
      //IE CODE
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blobData);
        return;
      }
      const data = window.URL.createObjectURL(blobData);
      var link = document.createElement('a');
      link.href = data;
      link.download = "test.pdf"
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
        <a href="#download" onClick={this.getPDF}>Download PDF</a>
      </div>
    );
  }
}

export default App;