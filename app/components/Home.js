import React from 'react';
import { connect } from 'react-redux'
import Hero from './Hero';
import Column from './Column';
import Header from './Header';
import fetch from 'isomorphic-fetch'


if(process.env.BROWSER)
  require('./Home.scss');

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: {},
      loading: true
    };
  }

  componentWillMount(){
    this.fetchPokemon();
  }

  fetchPokemon(name){
    const self = this;
    var pokeID;
    if(!name){
      pokeID = Math.ceil(Math.random()*251);
    }
    else pokeID = name;
    fetch("https://pokeapi.co/api/v2/pokemon/"+pokeID, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json'},
    }).then((response) => {
      if (response.ok) {
        response.json().then(function (data) {
          self.setState({pokemon: data, loading: false});
        })
      }
      else{
        console.log("Pokemon could not be loaded. Refresh the page.");
      }
    });
  }

  render() {
    let pokemon = {};
    let pokeSprite = "";
    let pokeName = "";
    let pokeHeight = "";
    let pokeWeight = "";
    if(!this.state.loading){
      pokemon = this.state.pokemon;
      pokeSprite = this.state.pokemon.sprites.front_default || "";
      pokeName = (this.state.pokemon.name.charAt(0).toUpperCase() + this.state.pokemon.name.slice(1)) || "";
      pokeHeight = this.state.pokemon.height/10 || "";
      pokeWeight = this.state.pokemon.weight/10 || "";
    }
    //console.log(pokemon.sprites.front_default);
    return (
      <div className="home-wrapper">
        <Header size="medium" color="light" title="Welcome" subtitle="To the crib"/>
        <div className="section gray">
          <div className="columns">
            {
              !this.state.loading ?
              <Column color="red">
                <figure className="image is-100x100">
                  <img src={pokeSprite} height="100" width="100"/>
                </figure>
                <span><b>{pokeName}</b></span>
                <span><b>Height:</b>  {pokeHeight} <b>m</b></span>
                <span><b>Weight:</b>  {pokeWeight} <b>kg</b></span>
              </Column>
              :
              <Column color="red" height="smallh"/>
            }
            <Column color="blue" height="smallh">
              This is some text
            </Column>
            <Column color="green" height="smallh">
              This is some text
            </Column>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  };
};

export default connect(mapStateToProps)(Home);
