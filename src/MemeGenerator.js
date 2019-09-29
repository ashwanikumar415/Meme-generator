import React from "react"
import {Form} from './Form'
import {connect} from 'react-redux'

class MemeGenerator extends React.Component {
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
        console.log("handleChange")
        const {name, value} = event.target
        this.props.onInputChange(event.target)
    }
    generate(event) {
        event.preventDefault()
        const randomNumber = Math.floor(Math.random() * this.props.allMemes.length)
        const randomImageUrl = this.props.allMemes[randomNumber].url
        console.log("c & url:"+randomNumber, randomImageUrl)
        //this.setState({memeImgSrc : randomImageUrl})
        this.props.generateRandomMEME(randomImageUrl)

    }

    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
        .then((response) => response.json())
        .then((response) => {
            const {memes} = response.data;
            console.log("allImage response:"+JSON.stringify(memes))
            //this.setState({allMemes: memes})
            this.props.initiateMemes({allMemes: memes})
        })
        .catch((e) => console.log("error to request :"+e))
    }
    render() {
        return (
            <div>
                <Form 
                    generate = {this.generate}
                    topText = {this.props.topText}
                    bottomText = {this.props.bottomText}
                    handleChange = {this.handleChange} />
                <div className = "meme">
                    <img  src = {this.props.memeImgSrc} alt ="NO Image Found"/>
                    <h1 className = "top">{this.props.topText}</h1>
                    <h2 className = "bottom">{this.props.bottomText}</h2>
                </div>
            </div>
        )
    }
}
const mapsStateToProps = (state) => {
    return {
        topText: state.topText,
        bottomText: state.bottomText,
        memeImgSrc: state.memeImgSrc,
        allMemes : state.allMemes
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        initiateMemes : (allMemes) => dispatch({type: 'INITIATE_MEMES', value: allMemes}),
        onInputChange: (eventTargetObj) => dispatch({type: 'INPUT_CHANGE', value: eventTargetObj}),
        generateRandomMEME: (url) => dispatch({type: 'GENERATE_RANDOM_MEME', value:url})

    }
}

export default connect(mapsStateToProps, mapDispatchToProps)(MemeGenerator)