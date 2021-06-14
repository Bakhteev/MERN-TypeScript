import React, { useState } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import AdminSidebar from '../../components/adminSidebar/AdminSidebar'
import AdminRouting from './adminRouting'

export const AdminPage: React.FC = () => {
  const { page } = useParams<{ page: string }>()
  return (
    <>
      <AdminSidebar />
      <AdminRouting page={page || ''} />
    </>
  )
}
