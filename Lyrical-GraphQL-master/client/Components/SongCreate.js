import React, {Component} from "react";
import gql from "graphql-tag";
import {graphql} from "react-apollo";
import { Link, hashHistory } from "react-router";

class SongCreate extends Component{
    constructor(props){
        super(props);

        this.state = {title: ''};
    }

    onSubmit(event){
        event.preventDefault();
        this.props.mutate({
            variables: {
                title: this.state.title
            },
            refetchQueries: [{query: query}]
        }).then(() => hashHistory.push('/'));
    }


    render(){
        return(
            <div>
                <Link to="/">Back</Link>
                <h3>Create an Announcement</h3>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <label>Announcement Title: </label>
                    <input onChange={event => this.setState({title: event.target.value})}
                    value={this.state.title}/>
                </form>
            </div>
        );
    }
}

const query = gql`
    {
        songs{
            id
            title
        }
    }
`;

const mutation = gql`
    mutation AddSong($title: String){
        addSong(title: $title){
            title
        }
    }
`;

export default graphql(mutation)(SongCreate);