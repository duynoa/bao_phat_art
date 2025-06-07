import React from 'react'
import Carousel from './Carousel'
import Aboutus from './Aboutus'
import Service from './Service'
import Partner from './Partner'
import Feedback from './Feedback'
import Products from './Products'

const HomePage = () => {
  return (
    <div className='h-full w-full py-3 xl:py-10 flex flex-col gap-6 xl:gap-20 bg-white'>
      <Carousel />
      <Aboutus />
      <Service />
      <Feedback />
      <Products />
      <Partner />
    </div>
  )
}

export default HomePage
