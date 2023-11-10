import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import './styles.css';

export default function HomePage() {

    const [planetList, setPlanetList] = useState([]);
    const [myPlanetList, setMyPlanetList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedPlanet, setSelectedPlanet] = useState(null);


    useEffect(() => {
        async function fetchPlanetNames() {
          try {
            const response = await axios.get('http://localhost:3000/planets');
            const planetData = response.data.results;
            const planetNames = planetData.map((planet) => planet.name);            
            setPlanetList(planetNames);
          } catch (error) {
            console.error('Erro ao buscar planetas:', error);
          }
        }
    
        fetchPlanetNames();
      }, []);


      const handleAddPlanet = async () => {
        if (selectedPlanet) {
          try {
            const planetName = planetList[selectedPlanet];

            // Realize uma busca pelo planeta no endpoint usando o nome selecionado
            const response = await axios.get('http://localhost:3000/planets/name?name='+planetName);
      
            if (response.data.length > 0) {
              const newPlanetData = response.data[0];

              //resgato o ID do parâmetro URL
              const segments = newPlanetData.url.split("/");
              const planetId = segments[segments.length - 2];
      
              const newPlanet = {
                id: planetId,
                name: newPlanetData.name,
                climate: newPlanetData.climate,
                terrain: newPlanetData.terrain,
              };
      
              setMyPlanetList([...myPlanetList, newPlanet]);
              setShowModal(false);
              alert('Planeta adicionado com sucesso!');
            } else {
                alert('Planeta não encontrado!');
            }
          } catch (error) {
            console.error('Erro ao buscar o planeta:', error);
          }
        }
      };
      
      const handleRemovePlanet = (planetId) => {
        const updatedPlanetList = myPlanetList.filter((planet) => planet.id !== planetId);
        setMyPlanetList(updatedPlanetList);
      };

      const handleSearchById = async () => {
        const idInput = document.querySelector('input[placeholder="Digite o ID do planeta"]');
        const planetId = idInput.value;
        console.log("planetId: " + planetId);
      
        try {
          const response = await axios.get(`http://localhost:3000/planets/id/${planetId}`);
      
          if (response.data) {
            const newPlanetData = response.data;
            
            const newPlanet = {
              id: planetId,
              name: newPlanetData.name,
              climate: newPlanetData.climate,
              terrain: newPlanetData.terrain,
            };
      
            setMyPlanetList([...myPlanetList, newPlanet]);
            setShowModal(false);
            alert('Planeta ' + newPlanetData.name + ' localizado e adicionado com sucesso!');
          } else {
            alert('Planeta não encontrado!');
          }
        } catch (error) {
            alert('Planeta não encontrado!');
        }
      };
      
      const handleSearchByName = async () => {
        const nameInput = document.querySelector('input[placeholder="Digite o nome do planeta"]');
        const planetName = nameInput.value;
      
        try {
          const response = await axios.get(`http://localhost:3000/planets/name?name=${planetName}`);
      
          if (response.data.length > 0) {
            const newPlanetData = response.data[0];
      
            //resgato o ID do parâmetro URL
            const segments = newPlanetData.url.split("/");
            const planetId = segments[segments.length - 2];
      
            const newPlanet = {
              id: planetId,
              name: newPlanetData.name,
              climate: newPlanetData.climate,
              terrain: newPlanetData.terrain,
            };
      
            setMyPlanetList([...myPlanetList, newPlanet]);
            setShowModal(false);
            alert('Planeta localizado e adicionado com sucesso!');
          } else {
            alert('Planeta não encontrado!');
          }
        } catch (error) {
            alert('Planeta não encontrado!');
        }
      };
      
    
      return (
        <div className="container">
          <span>
            <button className='add-button' onClick={() => setShowModal(true)}>Adicionar Planeta</button>
          </span>
          <h1>Lista de Planetas Cadastrados</h1>
    
          <div className="planet-list">
            {myPlanetList.map((planet) => (
              <div className="planet-card" key={planet.id}>
                <h2>{planet.name}</h2>
                <p>ID: {planet.id}</p>
                <p>Clima: {planet.climate}</p>
                <p>Terreno: {planet.terrain}</p>
                <button onClick={() => handleRemovePlanet(planet.id)} className="remove-button">Remover</button>
              </div>
            ))}
          </div>
    
          {showModal && (
            <div className="modal">
              <div className="modal-content">
                <h2>Adicionar Planeta</h2>
                <select className='planet-selection' onChange={(e) => setSelectedPlanet(JSON.parse(e.target.value))}>
                  <option value="">Selecione um planeta</option>
                  {planetList.map((planetName, index) => (
                    <option key={index} value={index}>
                      {planetName}
                    </option>
                  ))}
                </select>
                <button onClick={handleAddPlanet}>Confirmar</button>
                <button onClick={() => setShowModal(false)}>Cancelar</button>
                
                <div className="search-fields">
        <input type="text" placeholder="Digite o ID do planeta" />
        <button onClick={handleSearchById}>Buscar por ID e adicionar</button>

        <input type="text" placeholder="Digite o nome do planeta" />
        <button onClick={handleSearchByName}>Buscar por Nome e adicionar</button>
      </div>
    </div>
  </div>
)}

        </div>
      );
    }