import React from 'react';
import MuiButton from '../../shared/components/Button';
import MuiTable from '../../shared/components/Table';
import { useDispatch, useSelector } from "react-redux";
import { deletePost , startEditingPost } from './postSlice';
import { getPostList } from './postSlice';
import { useEffect } from "react";
import {  toast } from 'react-toastify';
import { Link } from 'react-router-dom';
const Post = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const promise = dispatch(getPostList());
        return () => {
          promise.abort();
        };
      }, [dispatch]);
    
     const initialRows = useSelector((state) => state?.post?.postList);
     const handleStartDelete = (id)=> {
      try {
          dispatch(deletePost(id))
          toast.error("Xóa thành công");
      } catch (error) {
          console.log(error)
      }
  }

  const handleStartEditing = (id) => {
    try {
      dispatch(startEditingPost(id))
    } catch (error) {
      console.log(error)
    }
  
 };
     const columns = [
        { field: 'id', headerName: 'ID', width: 200 },
        { field: 'author', headerName: ' Author', width: 200, editable: true },
        { field: 'users', headerName: ' Users', width: 200, editable: true },
        {
            field: 'edit', 
            headerName: 'Edit', 
            width: 300,
            renderCell: (params) => ( 
              <Link className="update" to ={`/posts/edit/:${params.id}`} >
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
   
    return (
        <MuiTable rows={initialRows} columns={columns} />
    );
};

export default Post;