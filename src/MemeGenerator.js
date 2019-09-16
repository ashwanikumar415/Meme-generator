import React from "react"

export class MemeGenerator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topText : "",
            bottomText : "",
            allMemes: [],
            memeImgSrc: "http://i.imgflip.com/1bij.jpg"
        }
    this.handleChange = this.handleChange.bind(this)
    this.generate = this.generate.bind(this)
    }
    handleChange(event) {
        const {name, value} = event.target
        this.setState({[name] : value})
    }
    generate(event) {
        event.preventDefault()
        const randomNumber = Math.floor(Math.random() * this.state.allMemes.length)
        const randomImageUrl = this.state.allMemes[randomNumber].url
        console.log("randomnumber & url:"+randomNumber, randomImageUrl)
        this.setState({memeImgSrc : randomImageUrl})

    }

    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
        .then((response) => response.json())
        .then((response) => {
            const {memes} = response.data;
            console.log("allImage response:"+JSON.stringify(memes))
            this.setState({allMemes: memes})
        })
        .catch((e) => console.log("error to request :"+e))
    }
    render() {
        return (
            <div>
                <form className="meme-form" onSubmit = {this.generate}>
                    <input 
                        type = "text"
                            name ="topText" 
                            value = {this.state.topText}
                            placeholder = "topText"
                            onChange = {this.handleChange}/>
                    <input 
                        type = "text" 
                            name ="bottomText" 
                            value = {this.state.bottomText}
                            placeholder = "bottomText"
                            onChange = {this.handleChange}/>
                    <button> Generate</button>
                </form>
                <div className = "meme">
                    <img  src = {this.state.memeImgSrc} alt ="NO Image Found"/>
                    <h1 className = "top">{this.state.topText}</h1>
                    <h2 className = "bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
}