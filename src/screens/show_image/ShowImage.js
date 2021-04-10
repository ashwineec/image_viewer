import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
 
import Card from '@material-ui/core/Card';
 
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
 
import './ShowImage.css';
 

const styles = theme => ({

    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9

    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    avatar: {
        border: 'black solid 2px',
    },
});
class ShowImage extends Component {

    constructor() {
        super();
        this.state = {
            likes: 4,
            isLiked: false,
            comments: [],
            comment: "",
            postDetails: {},
            timestamp: "",
            hashtag: ""
        }
    }

    likeHandler = () => {
        let numLikes = this.state.likes;
        if (this.state.isLiked) {
            this.setState({ likes: numLikes - 1 });
            this.setState({ isLiked: false });
        } else {
            this.setState({ likes: numLikes + 1 });
            this.setState({ isLiked: true });
        }
    }

    inputCommentHandler = (e) => {
        let newComment = e.target.value;
        this.setState({ comment: newComment });
    }

    addCommentHandler = () => {

        let newComments = this.state.comments;
        if (this.state.comment !== "") {
            newComments.push(this.state.comment);
            this.setState({ comments: newComments });
            this.setState({ comment: "" });
        } else {
            return;
        }
    }
    randomFunc = () => {
        var x = Math.floor((Math.random() * 10) + 2);
        return x;
    }
    componentWillMount() {
        let randomLikes = this.randomFunc();
        this.setState({ likes: randomLikes });

        let data = null;
        let xhr = new XMLHttpRequest();
        let that = this;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({ postDetails: JSON.parse(this.responseText), timestamp: that.state.postDetails.timestamp })
                console.log("postDetails", JSON.parse(this.responseText));
            }
        })

        let accesstoken = sessionStorage.getItem("access-token");
        let api = `https://graph.instagram.com/${this.props.post.id}?fields=id,media_type,media_url,username,timestamp&access_token=${accesstoken}`;
        xhr.open("GET", api);
        xhr.send(data);
    }

    subStrAfterChars = (str, char, pos) => {
        if (pos === 'b')
            return str.substring(str.indexOf(char) + 1);
        else if (pos === 'a')
            return str.substring(0, str.indexOf(char));
        else
            return str;
    }



    render() {
        const { classes } = this.props;
        return (
            <Card className="post">
                

                <CardContent className="content">
                    <div className="post-img">
                        <CardMedia

                            className={classes.media}
                            image={this.state.postDetails.media_url}
                         
                        />

                    </div>
                     
                     
                </CardContent>

            </Card>
        );
    }

}

 

export default withStyles(styles)(ShowImage);