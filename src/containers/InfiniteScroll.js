import { useCallback, useRef, useState } from "react";
import useScroll from "../Custom_Hooks/useScroll";

const InfiniteScroll = props => {
    const [value, setValue] = useState("")
    const [page, setPage] = useState(1)
    const inputChangeHandler = ({ target: { value } }) => {
        setValue(value)
        // whenever quert changes reset the page
        setPage(1)

    };
   
    const {books,error,loading,hasMore} = useScroll(value, page)
    
    // fetch more books automatically if user reaches the last book
    const observer = useRef()
    const lastElmRef = useCallback(node => {
        // so if this is previous last book then reset it to the next one
        if (loading) return
        if (observer.current) {
            observer.current.disconnect()
        }
        observer.current = new IntersectionObserver(entries => {
            // get the current target
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => (prevPage + 1))
            }
        })
        if (node) {
            observer.current.observe(node)
        }
    }, [loading, hasMore])

    return (
        <div className="container my-2 text-center" >
            <h5 className="text-info display-3 p-2 w-75 mx-auto rounded">Find Any Book!</h5>
            <div className="mb-4">
                <input type="text" value={value} onChange={inputChangeHandler} className="form-control shadow-lg" name="search" id="search" placeholder="find here...." />
            </div>


            {
                books.length !== 0 && <div className="response">
                    <div className="row">
                        {books.map((book, i) => {
                            // if it is the last book
                            if (books.length - 1 === i) {
                                return (<div className="card col-md-2 col-sm-4 col-6 rounded-sm" key={book.cover} ref={lastElmRef}>
                                    <div className="card-content  w-100 ">
                                        <img loading="lazy" src={`https://covers.openlibrary.org/b/id/${book.cover}-L.jpg`} alt={book.title} className="book-cover" />
                                    </div>
                                    <div className="card-footer">{book.title}</div>
                                </div>)
                            }
                            return (
                                <div className="card col-md-2 col-sm-4 col-6 rounded-sm" key={book.cover}>
                                    <div className="card-content  w-100 ">
                                        <img loading="lazy" src={`https://covers.openlibrary.org/b/id/${book.cover}-L.jpg`} alt={book.title} className="book-cover" />
                                    </div>
                                    <div className="card-footer">{book.title}</div>
                                </div>
                            )
                        })}
                    </div>
                    {loading && <div className="spinner-border text-info m-2" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>}
                    {!loading && books.length===0 && <div>
                        <h1>No Books Found!</h1>
                    </div>}
                    {error && <div className="alert alert-danger w-75 mx-auto">
                        {error}
                    </div>}
                </div>
            }

        </div>
    )
}

export default InfiniteScroll

/**
 * 
 */