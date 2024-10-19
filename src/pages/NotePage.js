import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'
// import notes from '../assets/data'

const NotePage = ({match, history}) => {
  let noteId = match.params.id;

  let [note, setNote] = useState(null)

  useEffect(() => {
    getNote()
  }, [noteId]) // dependance on noteId. That is, update everytime noteId state changes

  let getNote = async () => {
    if(noteId === 'new') return // if we are making a new note
    let response = await fetch(`http://localhost:3001/notes/${noteId}`)
    let data = await response.json()
    setNote(data)
  }

  let createNote = async () => {
    await fetch(`http://localhost:3001/notes/`, {
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({...note, 'updated': new Date()}) 
    })
  } 

  let updateNote = async () => {
    await fetch(`http://localhost:3001/notes/${noteId}`, {
      method:'PUT',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({...note, 'updated': new Date()}) // basically appending the current date to the json object (limitation of our backend)
    })
  }

  let deleteNote = async () => {
    await fetch(`http://localhost:3001/notes/${noteId}`, {
      method:'DELETE',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(note)
    })
    history.push('/')
  }

  let handleSubmit = () => {
    if(noteId !== 'new' && !note.body){
      deleteNote()
    } else if (noteId !== 'new') {
      updateNote()
    } else if (noteId === 'new' && note !== null) {
      createNote()
    }
    history.push('/')
  }
  

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <Link to="/">
            <ArrowLeft onClick={handleSubmit}/>
          </Link>
        </h3>
        {noteId !== 'new' ? (
        <button onClick={deleteNote}>Delete</button>

        ) : (
          <button onClick={handleSubmit}>Done</button>
        )}
      </div>

      {/* /... is the spread operator/ */}
      <textarea onChange={(e) => {setNote({...note, 'body':e.target.value})}} value={note?.body}></textarea>
    </div>
  )
}

export default NotePage