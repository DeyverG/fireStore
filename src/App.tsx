import './App.css'
import viteLogo from '/vite.svg'
import { db } from './config/firebase';
import reactLogo from './assets/react.svg'
import { ChangeEvent, useEffect, useState } from 'react'
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot } from "firebase/firestore";

interface User {
  id: string;
  name: string;
}
function App() {
  const [nameUser, setNameUser] = useState<string>("")
  const [users, setUsers] = useState<User[]>([])

  // Funcion que maneja el cambio de nombre
  const handleName = (event: ChangeEvent<HTMLInputElement>) => {
    setNameUser(event.target.value)
  }

  // Funcion que agrega un usuario a la base de datos y limpia el input
  const addUserFireStore = async () => {
    try {
      await addDoc(collection(db, "users"), {
        name: nameUser,
      });
      setNameUser("");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  // Funcion que obtiene los usuarios de la base de datos, mantiene la conexion por medio de un snapshot y actualiza el estado de los usuarios
  const streamUsers = () => {
    const query = collection(db, "users");
    const unsubscribe = onSnapshot(query, (querySnapshot) => {
      const users: User[] = [];
      querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, name: doc.data().name })
      });
      setUsers(users)
    });

    return { unsubscribe }
  }

  // Funcion que elimina un usuario de la base de datos
  const deleteUser = async (id: string) => {
    try {
      await deleteDoc(doc(db, "users", id));
    } catch (error) {
      console.error("Error delete document: ", error);
    }
  }

  // Hook que se ejecuta cuando se monta el componente para mantener la conexion con la base de datos
  // y cierra la conexion cuando se desmonta el componente
  useEffect(() => {
    const Users = streamUsers()
    return () => Users.unsubscribe()
  }, [])

  return (
    <div className="App">
      <div>
        <img src={viteLogo} className="logo" alt="Vite logo" />
        <img src={reactLogo} className="logo react" alt="React logo" />
      </div>
      <div>
        <p>Nombre</p>
        <input type="text" style={{ margin: "20px" }} value={nameUser} onChange={(e) => handleName(e)} />

        <button onClick={addUserFireStore} disabled={!nameUser}>Agregar</button>
      </div>

      <div>
        {users.map((user) => (
          <div key={user.id} className="flex">
            <p style={{ marginRight: "10px" }}>{user.name}</p>
            <p className='onclick' onClick={() => deleteUser(user.id)}>Delete</p>
          </div>
        ))}
      </div>

    </div>
  )
}

export default App
