const initialState = {
    topText : "",
    bottomText : "",
    allMemes: [],
    memeImgSrc: "http://i.imgflip.com/1bij.jpg"    
}
export const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'GENERATE_RANDOM_MEME':
            console.log("GENERATE_RANDOM_MEME:",action.value)
            return {
                ...state,
                memeImgSrc: action.value
            }
            
        case 'INITIATE_MEMES':
            console.log("INITIATE_MEMES:",action.value.allMemes)
            const newArr = [].concat(action.value.allMemes) 
            return {
                ...state,
                allMemes: newArr
            }
        case 'INPUT_CHANGE':
            console.log("INPUT_CHANGE:",action.value.name)
            const {name, value} = action.value
            return {
                ...state,
                [name]: value
            }            
    }
    return state;
} 