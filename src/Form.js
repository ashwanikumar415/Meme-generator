import React from 'react'

export const Form = (props) => {
    return (
        <form className="meme-form" onSubmit = {props.generate}>
        <input 
            type = "text"
                name ="topText" 
                value = {props.topText}
                placeholder = "topText"
                onChange = {props.handleChange}/>
        <input 
            type = "text" 
                name ="bottomText" 
                value = {props.bottomText}
                placeholder = "bottomText"
                onChange = {props.handleChange}/>
        <button> Generate</button>
    </form>        
    )
}