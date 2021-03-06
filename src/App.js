import React, { Component } from 'react';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/Navigation/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/Navigation/ImageLinkForm';
import Logo from './components/Navigation/Logo/Logo';
import Rank from './components/Navigation/Rank/Rank';


const app = new Clarifai.App({
  apiKey: '5f327fa892ef4a5fad1fde8372be6823'
 });

const particlesOptions = {
  particles: {
    number: {
      value: 70,
      density: {
        enable: true,
        value_area: 400
      }
    }
  }
}


class App extends Component {
  constructor(){
    super();
    this.state = {
      input:'',
      imageUrl: '',
      box: {},
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.response.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height -(clarifaiFace.bottom_row * height),
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});

    app.models
      .predict(
        Clarifai.GENERAL_MODEL, 
        this.state.input
        )
        .then( response => this.displayFaceBox(this.calculateFaceLocation(response)))
        .catch(err => console.log('err'));
    }

  render() {
    return (
      <div>
        <Particles className='particles'
          params ={particlesOptions}
        />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;
