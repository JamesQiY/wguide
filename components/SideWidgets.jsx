import React from 'react'
import { UpdateWidget, CategoriesWidget, PostWidget, } from './widgets'

const SideWidgets = (props) => {
  return (
    <div className="col-span-1 lg:col-span-4">
    <div className="relative lg:sticky top-8">
      {props.children}
      <UpdateWidget />
      <PostWidget />
      <CategoriesWidget />
    </div>
  </div>
  )
}

export default SideWidgets
