// importar useState y useEffect
import { useState, useEffect } from "react";

const Api = () => {
  //crear estado para obtener toda la información(duplicar)
  const [pokemonesTotales, setPokemonesTotales] = useState([]);

  /* crear estado donde guardo información de la api para más adelante mostrarla de forma dinámica */
  const [pokemonesFiltrados, setPokemonesFiltrados] = useState([]); //guardar array ya procesado

  //crear una variable para guardar lo que escriba en el input en un estado
  const [value, setValue] = useState("");

  /* crear una variable para guardar el select en un estado para engancharlo más adelante */
  const [orden, setOrden] = useState("ascender");

  /* crear useEffect informacionApiPoke y se ejecuta cuando el componente cargue por primera vez pasando un array vacío */
  useEffect(() => {
    getInfoApiPoke();
  }, []);

  //crear useEffect para filtrar la información de la api
  useEffect(() => {
    filterPokemones();
  }, [value]);

  //crear useEffect para ordenar la información de la api
  useEffect(() => {
    sortInformacion();
  }, [orden]);

  //crear función para conectarme a la api
  const getInfoApiPoke = async () => {
    const url = "https://pokeapi.co/api/v2/pokemon";

    /* hacer petición con fetch para que nos de una respuesta a la url señalada anteriormente */
    const respuesta = await fetch(url);

    // Transformar la respuesta a json
    const json = await respuesta.json();

    const pokemonesOrdenados = json.results.sort((a, b) => a.name.localeCompare(b.name));
    setPokemonesTotales(pokemonesOrdenados);
    setPokemonesFiltrados(pokemonesOrdenados);
  };

  /* crear función filterPokemones que filtra a los pokemones por nombre en base al valor del input */
  const filterPokemones = () => {
    //Guardar el value del input con toLowerCase
    const buscar = value.toLowerCase();
    //guardo los pokemones filtrados con el método filter sobre pokemonesTotales que es el array de pokemones y desde ahi retorno solo los pokemones cuyo nombre incluya lo que hay en la constante buscar
    const filtrar = pokemonesTotales.filter((pokemon) => {
      return pokemon.name.toLowerCase().includes(buscar);
    });
    setPokemonesFiltrados(filtrar);
  };

  //crear funcion sortInformacion
  const sortInformacion = () => {
    const pokemonesAOrdenar = [...pokemonesFiltrados]
     let pokemonesOrdenados = []
    if (orden === "ascender") {
      //funcion localeCompare permite comparar string para ver si son iguales
      pokemonesOrdenados = pokemonesAOrdenar.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      pokemonesOrdenados = pokemonesAOrdenar.sort((a, b) => b.name.localeCompare(a.name));
    }

    setPokemonesFiltrados(pokemonesOrdenados)
  };

  // retornar el html
  return (
    <main className="contenedor">
      
      <div className="pokemones">
        <h2>Lista de Pokemones</h2>
        <article className="campoInput">
          <input type="text" className="nombrePokemones"
            placeholder="Buscar el nombre de un pokemon"
            onChange={(e) => setValue(e.target.value)}
          />

          <select onChange={(e) => setOrden(e.target.value)}>
            <option value="ascender">Orden Ascendente</option>
            <option value="descender">Orden Descendente</option>
          </select>
        </article>
        <ul>
            
        {/* Recorrer del array de pokemones para imprimir resultados */}
        {/* método.map recibe dos parámetros el primero el elemento que estoy recorriendo en este caso pokemon y el indice que permite mostrar el número de la posición del elemento */}
          {pokemonesFiltrados.map((pokemon, indice) => {
            return (
              <div key={indice}>
                <li>{pokemon.name}</li>
              </div>
            );
          })}
        </ul>
      </div>
    </main>
  );
};

export default Api;
