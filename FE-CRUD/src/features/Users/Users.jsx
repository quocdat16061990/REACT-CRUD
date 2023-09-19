import React from 'react';
import MuiButton from '../../shared/components/Button';
import MuiTable from '../../shared/components/Table';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteUser, getUserList, startEditingUser } from './usersSlice';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
const Users = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const promise = dispatch(getUserList());
    return () => {
      promise.abort();
    };
  }, [dispatch]);
  const columns = [
    { field: 'id', headerName: 'ID', width: 200 },
    { field: 'name', headerName: ' Name', width: 200, editable: true },
    { field: 'email', headerName: ' Email', width: 200, editable: true },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 300,
      renderCell: (params) => (
        <Link className="update" to ={`/users/edit/:${params.id}`} >
          <MuiButton
            color="warning"
            variant="contained"
            sx={{
              width: '100%',
            }}
            onClick={() => handleStartEditing(params.id)}
          >
            Edit
          </MuiButton>
        </Link>
       
      ),
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 300,
      renderCell: (params) => (

        <MuiButton
          color="error"
          variant="contained"
          sx={{
            width: '50%',
          }}
          onClick={() => handleStartDelete(params.id)}
        >
          Delete
        </MuiButton>
      ),
    },
  ]

  const handleStartDelete = (id) => {
    try {
      dispatch(deleteUser(id))
      toast.error("Xóa thành công");
    } catch (error) {
      console.log(error)
    }
  }

  const handleStartEditing = (id) => {
    dispatch(startEditingUser(id))
  };

  const initialRows = useSelector((state) => state.user.userList);
  return (
    <MuiTable rows={initialRows} columns={columns} />
  );
};

export default Users;