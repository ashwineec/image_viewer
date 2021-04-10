import React, { Component } from 'react';
 
 
 
import Header from '../../common/header/Header';
import Posts from '../posts/Posts';

import "./Home.css";
 
 

// Creating Home class component to render the home page as per the design
class Home extends Component {


    constructor() {
        super()
        this.state = {
                isLoggedIn: sessionStorage.getItem("access-token") == null ? false : true,
                posts: [],
                
        };
    }
    
  

    UNSAFE_componentWillMount() {
        let accessToken = sessionStorage.getItem("access-token");
        let api = `https://graph.instagram.com/me/media?fields=id,caption&access_token=${accessToken}/`;

        let that = this;
        let data = null;
        let xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({ posts: JSON.parse(this.responseText).data });
            }
            that.setState({ posts: that.state.posts })
            console.log(that.state.posts);
        });
        xhr.open("GET", api);
        xhr.send(data);

        }

 
      
     

    render() {
        // Styles are stored in the const classes
        let posts= this.state.posts;
   


        return (
            <div>
                {/* Rending the Header and passing three parameter profile_picture,showSearchBox & showProfileIcon based on the value it is shown in the header */}
                <Header  profile_picture={this.state.profile_picture}  showSearchBox={this.state.isLoggedIn ? true : false} showProfileIcon={this.state.isLoggedIn ? true : false} onSearchTextChange={this.onSearchTextChange} showMyAccount = {true} />
              
                <Posts posts={posts} home="true" />
     
                     

 
                

            </div>


        )

    }
     


}




export default  (Home);