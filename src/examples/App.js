import React, { Component } from "react";
import { DropZone } from "../lib";
import moment from 'moment'


class App extends Component {
  state = {
    jsonResult: null
  };
    convertCvs() {
        let data = this.state.jsonResult
       let filteredResults = []
       let m
        for (var i = 0; i < data.length; i++) {
          
            m = moment(data[i]["DTSTART-DATE"]).format('MM')
            //get all items in that month
            // //get all items that == input day & within the next 7 days
            // console.log(m)
            // console.log(m.day())
           
            if (m === this.state.input) {
                // console.log('here')
                data[i].email = this.state.email
               
                delete data[i].NOTES
                delete data[i].LOCATION
                delete data[i].PRIORITY
                delete data[i].URL
                delete data[i].ATTENDEE
                delete data[i].DUE

                let item = {
                    'Description': data[i].SUMMARY,
                    'Start date': data[i]["DTSTART-DATE"], 
                    'End date': data[i]["DTEND-DATE"], 
                    'Start time': moment(data[i]["START-TIME"], 'h:mm A').format('HH:mm:ss'), 
                    'End time': moment(data[i]["END-TIME"], 'h:mm A').format('HH:mm:ss'),
                    'Email': data[i].email

                }
                filteredResults.push(item)
                
            }
            
          
        }
        
        window.JSONToCSVConvertor(filteredResults, m, true)
    }
    handleChange(e) {
        this.setState({input: e.target.value})
    }
    handleEmailChange(e) {
        this.setState({email: e.target.value})
    }
    handleSubmit(e) {
        e.preventDefault()
  
    }


    render() {
        var dropStyle = {
            margin: '0 auto', 
            position: 'relative',
            width: '200px',
            height: '200px',
            borderWidth: '2px',
            borderColor: 'rgb(102, 102, 102)',
            borderStyle: 'dashed',
            borderRadius: '5px', 
            display: 'table', 
            cursor: 'pointer'
        }

        var containerStyle = {
            marginTop: '200px'
        }

        var formStyle = {
           textAlign: 'center'
        }

        var colStyle = {
            margin: '0 auto',
            textAlign: 'center',
            paddingTop: '100px', 
            paddingBottom: '100px'
        }

        var rowStyle = {
            borderColor: 'black',
            borderStyle: 'solid',
            borderWidth: '5px'
        }

        var styledP ={
            textAlign: 'center',
            verticalAlign: 'middle',
            display: 'table-cell',
            fontWeight: 'bold'
        }
      return (
          <div className="container" style={containerStyle}>
              <h2 style={formStyle}>Tracked Tasks - Filter by Month</h2>
              <div className="row" style={rowStyle}>
                  <div className="col-md-6" style={colStyle}>
                      <h3>Step 1: Input Month (MM) & Email</h3>
                      <br />
                      <form style={formStyle}>
                          <input type="text" onChange={this.handleChange.bind(this)} placeholder="MM"></input>
                          <br />
                          <br />
                          <input type="text" onChange={this.handleEmailChange.bind(this)} placeholder="Email"></input>
                  </form>
              </div>
          
     
                  <div className="col-md-6" style={colStyle}>
                      <h3> Step 2: Select CVS File </h3>
                      <br />
                      <DropZone style={dropStyle}
            getJson={jsonResult => {
                        this.setState({ jsonResult }, () => {
                            this.convertCvs()
                        });
            }}
                      >
                         
                          <p style={styledP}>Add a CSV File</p>
                </DropZone>
                
         
            </div>

           </div>
              </div>

    );
  }
}

export default App;
