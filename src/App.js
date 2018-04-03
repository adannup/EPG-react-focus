import React, { Component } from 'react';
import './spatial-navigation.js';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      inicio: 1,
      items: 8,
      itemByRow: 4,
      channels: [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
      ],
      nextFocus: 0,
    }

    this.onWillmoveFocus = this.onWillmoveFocus.bind(this);
    this.forceFocus = this.forceFocus.bind(this);
  }

  componentDidUpdate() {
    console.log('Recibio actuaizaciones');
    const element = document.getElementById(`test-${this.state.nextFocus.toString()}`);
    if(element) {
      element.blur();
      console.log(element);
      element.focus();
    }
  }

  onWillmoveFocus(e) {
    console.log(e);
    if(e.detail.direction === 'down' && (parseInt(e.target.attributes["data-counter"].value) <=8)  && (parseInt(e.target.attributes["data-counter"].value) >=5)) {
      console.log(parseInt(e.target.attributes["data-counter"].value));
      console.log('Hacia abajo');
      console.log('Se ejecuta el forceFocus');
      const elementSumado = parseInt(e.target.attributes["data-counter"].value) + this.state.itemByRow;
      console.log('Elemento sumado:', elementSumado); // este hay que ejecutarlo por que no se ejecuta el focus
      this.setState({
        channels: [
          [5, 6, 7, 8],
          [9, 10, 11, 12],
        ],
        nextFocus: elementSumado,
      })
    }

    if(e.detail.direction === 'up' && (parseInt(e.target.attributes["data-counter"].value) <=8)  && (parseInt(e.target.attributes["data-counter"].value) >=5)) {
      console.log(parseInt(e.target.attributes["data-counter"].value));
      console.log('Hacia abajo');
      this.setState({
        channels: [
          [1, 2, 3, 4],
          [5, 6, 7, 8],
        ],
      })
    }
  }

  forceFocus(event) {
    console.log('Se ejecuta el forceFocus');
    const elementSumado = parseInt(event.target.attributes["data-counter"].value) + this.state.itemByRow;
    console.log('Elemento sumado:', elementSumado); // este hay que ejecutarlo por que no se ejecuta el focus
    this.setState({
      nextFocus: elementSumado,
    }); // en esta parte se renderiza nuevamente, hay que evitar esta renderizaion con shouldComponent
    // const element = document.getElementById(`test-${elementSumado.toString()}`);
    // console.log(element);
  }

  createGrid() {

  }

  componentDidMount() {
    window.SpatialNavigation.clear();
    window.SpatialNavigation.init();

    // Define navigable elements (anchors and elements with "focusable" class).
    window.SpatialNavigation.add({
      selector: 'a, .focusable',
      rememberSource: true,
      enterTo: 'last-focused',
    });

    // Make the *currently existing* navigable elements focusable.
    window.SpatialNavigation.makeFocusable();

    // Focus the first navigable element.
    window.SpatialNavigation.focus("#test-3");
    window.addEventListener("sn:willmove", this.onWillmoveFocus);
  }

  onHandleFocus(e) {
    console.log('On focused:', e.target);
  }

  render() {
    const channels = this.state.channels.map(channel => (
      channel.map((c, index) => (
        <div key={index} className="focusable" onFocus={this.onHandleFocus} id={`test-${c}`} data-counter={c}>Test {c}</div>
      ))
    ))
    return (
      <div className="App">
        {channels}
      </div>
    );
  }
}

export default App;
