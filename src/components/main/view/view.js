import React from 'react';
import axios from 'axios';
import './view.css';
import CategoryContainer from './viewComponents/categoryContainers/categoryContainer';

class ViewComponents extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            categories: ['popular', 'very popular', 'trending', 'your adventures', 'featured', 'very very popular', 'fantasy', 'sci-fi'],
            categoryReturn: []
        };
    };
    componentDidMount(){
        this.state.categories.forEach((ele)=>{
            axios.post(`/getcategories`, {ele})
                .then(res=>{
                    // console.log(res.data)
                    this.setState({
                        categoryReturn: [...this.state.categoryReturn, res.data]
                    })
                }).catch(err=>{
                    console.log(err);
                });
        });
    };
    createCategories = ()=>{
        let category = this.state.categoryReturn.map((ele, i)=>{
            return (
                    <CategoryContainer thumbNailInfo={ele} />
            )
        })
        return category
    }
    render(){
        // console.log(this.state.categoryReturn)
        return (
            <div className='categories_a'>
                {this.createCategories()}
            </div>
        )
    };
};

export default ViewComponents;