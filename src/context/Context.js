import React from 'react'

const Context = React.createContext({
  search: '',
  searchList: [],
  loading: true,
  currentPage: 1,
})
export default Context
