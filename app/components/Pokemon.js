import React from 'react';
import { connect } from 'react-redux'
import Column from './Column';

class Pokemon extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      pokemon: {},
      loading: true
    };
  }
  componentDidMount(){
    this.fetchPokemon();
  }

  fetchPokemon(name){
    const self = this;
    var pokeID;
    if(!name){
      pokeID = Math.ceil(Math.random()*251);
    }
    else pokeID = name;
    fetch('/pokemon/'+pokeID, {
      method: 'GET',
    }).then((response) => {
      if (response.ok) {
        response.json().then(function (data) {
          self.setState({pokemon: data, loading: false});
        }).catch(function(error){
          console.log("JSON problems.");
          console.log(error);
        })
      }
      else console.log("Request for Pokemon failed.");
    });
  }

  render(){
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
    return(
      !this.state.loading ?
      <div className="pokemon-wrapper centered">
        <figure className="image is-96x96">
          <img src={pokeSprite} height="96" width="96"/>
        </figure>
        <span><b>{pokeName}</b></span>
        <span><b>Height:</b>  {pokeHeight} <b>m</b></span>
        <span><b>Weight:</b>  {pokeWeight} <b>kg</b></span>
      </div>
      :
      <div className="pokemon-wrapper centered">
        <figure className="image is-96x96">
          <div className="loading"/>
        </figure>
        <span><b>???</b></span>
        <span><b>Height:</b>  ??? <b>m</b></span>
        <span><b>Weight:</b>  ??? <b>kg</b></span>
      </div>
    )
  }
}

export default Pokemon;