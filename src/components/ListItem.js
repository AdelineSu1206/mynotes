import React from 'react'
import { Link } from "react-router-dom"

//make time more readable
let getTime = (note) => {
    return new Date(note.updated).toLocaleDateString()
}
let getTitle = (note) => {
    // split by new lines to just get the first line
    // split will make a list of lines and pull the one with index 0
    const title = note.body.split('\n')[0]
    if (title.length > 45){
        return title.slice(0,45)
    }
    return title
}
let getContent = (note) => {
    // get all the content after the title
    let title = getTitle(note)
    let content = note.body.replaceAll('\n', '') // remove newlines
    content = content.replaceAll(title, '')

    if(content.length > 45) {
        return content.slice(0,45) + '...'
    } else {
        return content
    }
}

const ListItem = ({note}) => {
    return (
        <Link to={`/note/${note.id}`}>
            <div className="notes-list-item">
                <h3>{getTitle(note)}</h3>
                <p><span>{getTime(note)}</span>{getContent(note)}</p>
            </div>
        </Link>
    )
}

export default ListItem