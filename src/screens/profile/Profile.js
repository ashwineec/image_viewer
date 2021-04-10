import React, { Component } from 'react';
import Header from '../../common/header/Header';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
 
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Modal from 'react-modal';
import FormHelperText from '@material-ui/core/FormHelperText';
import './Profile.css';
import { Typography } from '@material-ui/core';
import ListImages from '../list_images/ListImages';

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            fullName: "Ashwinee Chandankar",
            tempName: "",
            tempNameReq: "displayNone",
            isModalOpen: false,
            posts: [],
            isLoggedIn: sessionStorage.getItem("access-token") == null ? false : true
        }
    }

    fullNameChangeHandler = (e) => {
        this.setState({ tempName: e.target.value });
    }

    editFullNameClickHandler = () => {
        if (this.state.tempName === "") {
            this.setState({ tempNameReq: "displayBlock" });
            return;
        }
        var temp = this.state.tempName;
        this.setState({ fullName: temp });
        this.setState({ tempName: '' });
        this.setState({ isModalOpen: false });
    }

    handleOpen = () => {
        this.setState({ isModalOpen: true });
        console.log(this.state.isModalOpen + "   --- Check modal is open");
    }

    handleClose = () => {
        this.setState({ tempNameReq: "displayNone" });
        this.setState({ isModalOpen: false });
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
        let posts= this.state.posts;
        return (
            <div>
                <Header  profile_picture={this.state.profile_picture}  showSearchBox={this.state.isLoggedIn ? true : false} showProfileIcon={this.state.isLoggedIn ? true : false} onSearchTextChange={this.onSearchTextChange} showMyAccount = {true} />
               
                <div className="profile-page">
                    <div className="info-section">
                        <div className="user-icon-circle">
                            <IconButton aria-label="user-icon" aria-haspopup="true" >
                                <img src="https://www.mystudy.icu/wp-content/uploads/2019/12/365073.jpg" alt="user" className="profile-icon"></img>
                            </IconButton>
                        </div>
                        <div className="info ">
                            <div className="insta-handle info-divs"><span className="insta-handle-name" >swarali1234</span></div>
                            <div className="user-info-sec info-divs">
                                <ul>
                                    <li className="li-info">Posts: 3</li>
                                    <li className="li-info">Follows: 4</li>
                                    <li className="li-info">Followed By: 2</li>
                                </ul>
                            </div>
                            <div className="ful-name info-divs">
                                <span className="full-name">
                                    {this.state.fullName}
                                </span>
                                <Button variant="fab" color="secondary" className="edit-btn" onClick={this.handleOpen}>
                                    <Fab color="secondary" aria-label="edit">
                                        <EditIcon />
                                    </Fab>
                                </Button>
                                <Modal
                                    ariaHideApp={false}
                                    isOpen={this.state.isModalOpen}
                                    contentLabel="EditFullName"
                                    onRequestClose={this.handleClose}
                                    className="edit-modal"
                                >
                                    <Typography variant="h5" component="h2" style={{ paddingBottom: '10px' }}>Edit</Typography>

                                    <FormControl required >
                                        <InputLabel htmlFor="fullName" >Full Name</InputLabel>
                                        <Input id="fullName" type="text" onChange={this.fullNameChangeHandler} />
                                        <FormHelperText className={this.state.tempNameReq}><span style={{ color: 'red' }} >required</span>
                                        </FormHelperText>
                                    </FormControl>
                                    <br />
                                    <br />
                                    <Button variant="contained" color="primary" onClick={this.editFullNameClickHandler} style={{ marginTop: '10px' }}>
                                        UPDATE
                                    </Button>
                                </Modal>
                            </div>
                        </div>
                    </div>
                    
                    <ListImages posts={posts} home="true" />

               




             
                </div>
            </div>
        );
    }
}

export default Profile;