export function allReducer(state={},action) {
    switch (action.type) {
        case 'category-add':
            return{
                ...state, 
                categories:[
                    ...state.categories,
                    action.payload.newCategories
                ]
            }

        case 'cat-add':
            let index = state.categories.findIndex(e => e.id == action.payload.newCat.category_id)
            let newArr = state.categories
            console.log("asdgasgfdhgasfd",newArr[index])
            newArr[index].cats.push(action.payload.newCat.cats)
            return{
                ...state
            }

        default:
            return state
    }
}

export function selectAll(state) {
    return state.all
}

export function addNewCategory(newCategories) {
    console.log(newCategories)
    return{
        type:"category-add",
        payload:{
            newCategories:newCategories
        }
    }
}

export function addNewCat(newCat) {
    console.log("newCat",newCat)
    return{
        type:"cat-add",
        payload:{
            newCat:newCat
        }
    }
}