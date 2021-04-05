import React, { Component } from 'react';
 
 
 
import Header from '../../common/header/Header';
 

import "./Home.css";

 

// Creating Home class component to render the home page as per the design
class Home extends Component {


    constructor() {
        super()
        this.state = {
            images: [],
            comments: [],
            profile_picture: "",
            userName: "",
            commentText: "",
            searchOn: false,
            originalImageArr: {},
            isLoggedIn: sessionStorage.getItem("access-token") == null ? false : true,
            accessToken: sessionStorage.getItem("access-token"),
            count: 1,
        };
    }
    
    componentWillMount() {

        }

        
         

 
        onSearchTextChange = (keyword) => { 
            console.log("ss");
         }
      
    render() {
        // Styles are stored in the const classes
       
        return (
            <div>
                {/* Rending the Header and passing three parameter profile_picture,showSearchBox & showProfileIcon based on the value it is shown in the header */}
                <Header  profile_picture={this.state.profile_picture}  showSearchBox={this.state.isLoggedIn ? true : false} showProfileIcon={this.state.isLoggedIn ? true : false} onSearchTextChange={this.onSearchTextChange} showMyAccount = {true} />
                 Home page 
                     

 
                

            </div>


        )


    }


}




export default  (Home);