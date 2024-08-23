import React, { useRef } from 'react'
import "./Categories.css"
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
const Categories = () => {
    const scrollContainerRef = useRef(null)

    const scrollLeft = () => {
        scrollContainerRef.current.scrollBy({
            left: -200,
            behavior: "smooth"
        })
    }

    const scrollRight = () =>{
         scrollContainerRef.current.scrollBy({
            left: 200,
            behavior: "smooth"
         })
    }
    return (
        <div className='h-[50px] px-20 flex items-center gap-3 justify-center border-b-red-200 border-b-2 '>
           <div className="button w-[50px] h-[40px] flex items-center justify-center rounded-full cursor-pointer bg-slate-200 hover:bg-slate-300 ">
           <FaChevronLeft onClick={scrollLeft} className='' />
           </div>
            <div ref={scrollContainerRef} className='scroll-container flex items-center gap-2 overflow-x-auto'> 
            <Link to=''>Gaming</Link >
            <Link to=''>Hollywood</Link >
            <Link to=''>Bollywood</Link >
            <Link to=''>News </Link >
            <Link to=''>Sports</Link >
            <Link to=''>Cricket</Link >
            <Link to=''>Football</Link >
            <Link to=''>Crypto</Link >
            <Link to=''>Gaming</Link >
            <Link to=''>Cooing</Link >
            <Link to=''>Dances</Link >
            <Link to=''>Poetry</Link >
            <Link to=''>Kids</Link >
            <Link to=''>Cartoons</Link >
            <Link to=''>Anime</Link >
            <Link to=''>BasketBall</Link >
            <Link to=''>Education</Link >
            <Link to=''>Science</Link >
            <Link to=''>Technology</Link >
            <Link to=''>BlockBusters</Link >
            <Link to=''>TOprated</Link >
            <Link to=''>plus</Link >
            <Link to=''>Programming</Link >
            <Link to=''>Tournaments</Link >
            <Link to=''>Singing</Link >
            <Link to=''>Actions</Link >
            </div>
            <div className="button w-[50px] h-[40px] cursor-pointer flex justify-center items-center ml-auto rounded-full bg-slate-200 hover:bg-slate-300">
           <FaChevronRight onClick={scrollRight} className='' />
           </div>

        </div>
    )
}

export default Categories