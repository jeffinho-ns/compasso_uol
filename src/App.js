import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from './components/Button';
import Input from './components/Input';


function App(){
  /* 
    Estados 
  */
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState("")
  const [searchedUser, setSearchedUser] = useState([])

  /* 
    Armazena valor digitado no input
  */
  const handleChange = (e) => {
  
    setNewUser(e.target.value)
    console.log(newUser)
  }

  /*
    Verifica se valor digitado confere com name do usuário GIT
  */
  const reposUser = async () => {
    const reposFiltered = users.filter(repo => repo.name === newUser)
    setSearchedUser(reposFiltered)


  }

  const starredUser = async() => {
    const starredFiltered = users.filter(repo => repo.name === newUser)
    setSearchedUser(starredFiltered)
  }

  useEffect(() => {
    if(!newUser) {
      return 
    }

    async function getUsers() {
      const { data } = await axios.get(`https://api.github.com/users/${newUser}/repos`)
      setUsers( data )
      console.log(data)
    }
    getUsers()
  }, [newUser])


return(
<div className="App">
  <div className="container-input">
    <Input 
      type="text"
      onChange={ handleChange }
    />
  </div>
  <div className="container-list">
    <ul>
      {
        searchedUser.map(user => (
          <li key={ user.id }>
            <p>Id: { user.id }</p>
            <p>Name: {user.name }</p>
            <p>Forks: { user.forks }</p>
          </li>
        )
      )}
    </ul>
    
    <Button title="repos" onClick={ () => reposUser()} />
    <Button  title="starred" onClick={ () => starredUser()} />
    
  </div>
</div>
);
}

export default App