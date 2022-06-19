import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from "react-redux"
import { selectAll, addNewCategory, addNewCat } from "../features/all/allSlice"
import axios from 'axios';

export const Home = () => {
    const dispatch = useDispatch()
    const [limit,setLimit] =useState(10)
    const state = useSelector(selectAll)
    const [categories, setCategories] = useState();
    const [cats,setCats] = useState()
    
    useEffect(() => {
        let unMounted = false;
        const onLoad = async() =>{
        axios.get(`https://api.thecatapi.com/v1/categories`)
            .then(res => {
                if(!unMounted){
                const categories = res.data;
                categories.map((category)=>{
                    dispatch(addNewCategory({ 
                        id:category.id,
                        name:category.name,
                        cats:[]
                    }))
                })
                setCategories({ categories });
            }
            })
        }
        onLoad()
        return()=>{
            unMounted = true;
        }
    }, []);
    
    const LoadCats = (category_id) => {
        document.querySelector(".more_btn").style.display = "block";
        if(state.categories[state.categories.findIndex(e => e.id == category_id)].cats.length==0){
            axios.get(`https://api.thecatapi.com/v1/images/search?limit=`+limit+`&page=1&category_ids=` + category_id)
            .then(res => {
                setCats(res.data);
                dispatch(addNewCat({ 
                    category_id:category_id,             
                    cats:res.data,
                }))   
            })
        }
        else{
            let index = state.categories[state.categories.findIndex(e => e.id == category_id)]
            setCats(index.cats[0]);
            let i = index.cats.length
            while(i>1){
                index.cats.pop()
                i--
            }
        }
    }

    const MoreCats = () => {
        // setLimit(limit + 10)
        let category_id = cats[0].categories[0].id
        axios.get(`https://api.thecatapi.com/v1/images/search?limit=`+limit+`&page=1&category_ids=` + category_id)
        .then(res => {
            setCats(res.data);
            dispatch(addNewCat({ 
                category_id:category_id,             
                cats:res.data,
            }))   
        })
    }
    // console.log(state)
    return(
        <div className="main">
            <label htmlFor="categories">Choose a Category</label>
            <select name="categories" id="categories" defaultValue={'DEFAULT'} onChange={(e)=>{LoadCats(e.target.value)}}>
                <option value="DEFAULT" disabled >Categories</option>
                {
                    categories?
                        categories.categories.map((category)=>{
                            return(
                                <option value={category.id} key={category.id} >{category.name}</option>
                            )
                        })
                    :''
                }
            </select>
            <div>
                {
                    cats?
                        state.categories[state.categories.findIndex(e => e.id == cats[0].categories[0].id)].cats.map((cat)=>{
                            return(cat.map((el)=>{
                                return(
                                    <div key={el.id}>
                                        <img src={el.url}/>
                                    </div>
                                )
                            }))
                        })
                    :''
                }
            
            </div>

            <button className="more_btn" onClick={() => MoreCats()}>More</button>
        </div>
    )
}