import React, { Component } from 'react';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      requestedPdf: "customer-is-sometimes-right.pdf"
    }
  }

  updateState = (evt) => {
    console.log("updateState: " + evt.target.name + " : " + evt.target.value)
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  getPDF = async () => {
    console.log("get pdf")
    var requestedPdf = this.state.requestedPdf
    var request = new Request("/pdfservice", {
      method: 'POST',
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ "requestedPdf": requestedPdf })
    })
    try {
      const payload = await fetch(request)
      const blob = await (payload.blob())
      var blobData = new Blob([blob], { type: "application/pdf" })
      //IE CODE
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blobData);
        return;
      }
      const data = window.URL.createObjectURL(blobData);
      var link = document.createElement('a');
      link.href = data;
      link.download = requestedPdf
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
        <select onChange={(evt) => this.updateState(evt)} name="requestedPdf">
          <option value="customer-is-sometimes-right.pdf">Customer is sometimes right</option>
          <option value="cat_scan.pdf">Cat scan</option>
        </select>
        <a href="#download" onClick={this.getPDF}>Download PDF</a>
        <br /><br />
        <i>PDF files came from: http://www.pdffun.com</i>
      </div>
    );
  }
}

export default App;