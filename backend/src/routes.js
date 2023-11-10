const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const routes = express.Router();

routes.use(bodyParser.json());


//Rota para resgatar a lista de planetas da API
routes.get('/planets', (req, res) => {
  
    axios.get('https://swapi.dev/api/planets/')
      .then(response => {
        const planets = response.data;
        
        res.json(planets);
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar a lista de planetas!' });
      });
  });

  // Rota para buscar um planeta pelo nome
  //http://localhost:3000/planets/name?name=<nome_do_planeta>
routes.get('/planets/name', (req, res) => {
    const planetName = req.query.name;
  
    
    axios.get(`https://swapi.dev/api/planets/?search=${planetName}`)
      .then(response => {
        const planets = response.data.results;
        if (planets.length > 0) {
          res.json(planets);
        } else {
          res.status(404).json({ error: 'Planeta não encontrado' });
        }
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar o planeta pelo nome' });
      });
  });
  
  // Rota para buscar um planeta pelo ID
  //http://localhost:3000/planets/id/<id_do_planeta>
  routes.get('/planets/id/:id', (req, res) => {
    const planetId = req.params.id;
  
    axios.get(`https://swapi.dev/api/planets/${planetId}/`)
      .then(response => {
        const planet = response.data;
        res.json(planet);
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar o planeta pelo ID' });
      });
  });
  

module.exports = routes;