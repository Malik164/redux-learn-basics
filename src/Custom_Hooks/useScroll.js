import { useEffect,useState } from "react"
import axios from "axios"
const useScroll=(query,page)=>{
    const [loading,setLoading]=useState(true)
    const [error,setError]=useState(false)
    const [books,setBooks]=useState([])
    const [hasMore,setHasMore]=useState(false)
    // make a sideeffect whenever query or page changes

    useEffect(()=>{
        setBooks([])
    },[query])
    useEffect(()=>{
        // if (query==="") return
        setLoading(true)
        setError(false)
        let source=axios.CancelToken.source()
        
        // fetch the books from url
        axios({
            method:'GET',
            url:'https://openlibrary.org/search.json',
            params:{q:query,page},
            cancelToken:source.token
        }).then(res=>{
            // update the books
            let uniqueBooks=res.data.docs.map(doc=>({
                title:doc.title,
                cover:doc.cover_i
            }))
            uniqueBooks=uniqueBooks.filter((book,index,self)=>{
                return (index===self.findIndex(obj=>obj.title===book.title && obj.cover === book.cover)) && book.cover!==undefined
            })
            let booksArr=[
                ...books,
                ...uniqueBooks 
            ]
            setBooks(booksArr)
            setHasMore(res.data.docs.length>0)
            setLoading(false)
            
            
        }).catch(e=>{
            if (axios.isCancel(e)) return
            setError(e.message)
            // console.log(e.m);
        })
        // make a request on query changes but not on each character typed
        return ()=>{
            // cancel the token
            source.cancel()
        }
        // eslint-disable-next-line 
    },[query,page])
    return {books,error,loading,hasMore}
}
export default useScroll