import React from 'react'

export default function SearchComponent(props) {
  return (
    <input
      type="search"
      className="color-text p-4 w-80 py-2 mt-2 px-3 border-2 rounded-md border-gray-400 outline-none focus:border-green-800"
      placeholder="Buscar..."
      onChange={props.onChange}
    />
  )
}
  