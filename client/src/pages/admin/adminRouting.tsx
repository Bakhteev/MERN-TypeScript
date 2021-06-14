import React from 'react'
import { CreateFilm } from './adminPages/createFilm/createFilm'
import UsersTable from './adminPages/usersTable/usersTable'

interface AdminRoutingProps {
  page: string
}

const AdminRouting: React.FC<AdminRoutingProps> = ({ page }) => {
  switch (page) {
    case 'createFilm':
      return <CreateFilm />
    case 'createCategory':
      return <CreateFilm />
    case 'createGenre':
      return <CreateFilm />
    case 'userTable':
      return <UsersTable />
    default:
      return <UsersTable />
  }
}

export default AdminRouting
