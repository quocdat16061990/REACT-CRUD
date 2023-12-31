import React, { useEffect } from "react";
import MuiInput from "../../shared/components/Input";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUser, updateUser } from "./usersSlice";
import MuiButton from "../../shared/components/Button";
import { useSelector } from "react-redux/es/hooks/useSelector";
import {  toast } from 'react-toastify';
const UserForm = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const editingUser = useSelector((state) => state?.user?.editingUser);

  
  const isEditMode = Boolean(editingUser);

  const { handleSubmit, control, formState: { errors }, reset } = useForm({
    defaultValues: isEditMode ? editingUser : {}, 
  });

  useEffect(() => {
    if (isEditMode) {
      
      reset(editingUser);
    }
  }, [isEditMode, editingUser, reset]);

  const onSubmit = (data) => {
    if (isEditMode) {
      dispatch(updateUser({ userId: editingUser.id, body: data }));
      toast.warn("Cập nhật thành công");
    } else {
     
      dispatch(createUser(data));
      toast.success("Thêm thành công");
    }
    navigate("/users");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        rules={{
          required: "Name is required",
          minLength: {
            value: 5,
            message: "Name must be at least 5 characters",
          },
          maxLength: {
            value: 15,
            message: "Name must not exceed 15 characters",
          },
        }}
        render={({ field }) => (
          <div>
            <MuiInput
              name="name"
              label="Name"
              placeholder="Enter your name"
              sx={{
                width: '100%',
                paddingTop: '20px',
                paddingBottom: '20px',
              }}
              {...field}
            />
            {errors.name && (
              <p style={{ color: 'red' }}>
                {errors.name.message}
              </p>
            )}
          </div>
        )}
      />
      <Controller
        name="email"
        control={control}
        rules={{
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address",
          },
        }}
        render={({ field }) => (
          <div>
            <MuiInput
              name="email"
              label="Email"
              placeholder="Enter your email"
              sx={{
                width: '100%',
                paddingTop: '20px',
                paddingBottom: '20px',
              }}
              {...field}
            />
            {errors.email && (
              <p style={{ color: 'red', margin: 0 }}>
                {errors.email.message}
              </p>
            )}
          </div>
        )}
      />
      <br></br>
      <MuiButton type="submit" variant="contained" color="success" sx={{
        width: '100%',
        paddingTop: '20px',
        paddingBottom: '20px',
      }}>
        {isEditMode ? "Update User" : "Add User"}
      </MuiButton>
    </form>
  );
};

export default UserForm;