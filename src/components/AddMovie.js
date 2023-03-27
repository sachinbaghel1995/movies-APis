import { useRef } from "react"
import classes from './AddMovie.module.css'
const AddMovie=(props)=>{
const title=useRef()
const openingText=useRef()
const releaseDate=useRef()
const onSubmitHandler=(event)=>{
event.preventDefault()
    const movie={
        title:title.current.value,
        openingText:openingText.current.value,
        releaseDate:releaseDate.current.value
    }
    props.onAddMovie(movie)
}


return (
    <form onSubmit={onSubmitHandler}>
    <label htmlFor="title">Title</label>
    <input type="text" name="title" id="title" ref={title}/>
    <label htmlFor="openingtext">Opening Text</label>
    <input type="text" name="openingtext" id="openingtext" className={classes.openingtext} ref={openingText}/>
    <label htmlFor="releasedate">Release Date</label>
    <input type="date" name="releasedate" id="releasedate" className={classes.releasedate} ref={releaseDate}/>
    <div>
    <button type="submit">Add Movie</button>
    </div>
    </form>
)
}
export default AddMovie