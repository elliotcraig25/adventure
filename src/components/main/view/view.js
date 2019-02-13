import React from 'react';
import axios from 'axios';
import './view.css';

class ViewComponents extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            categories: ['popular', 'very popular']
        };
    };
    getCategoryItems = ()=>{
        this.state.categories.forEach(ele=>{
            axios.post(`/getcategories`, {ele})
        })
    }
    abc = ()=>{
        axios.get(`/test`).then(
            res=>{
                console.log(res)
            }
        )
    }
    render(){
        this.getCategoryItems()
        return (
            <div>
                View Component
            </div>
        )
    };
};

export default ViewComponents;