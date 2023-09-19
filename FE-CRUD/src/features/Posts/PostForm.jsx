import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost, updatePost } from './postSlice';
import { getUserList } from "../Users/usersSlice";
import MuiInput from "../../shared/components/Input";
import CustomSelect from "../../shared/components/Select/MuiSelect";
import MuiButton from "../../shared/components/Button";
import { toast } from 'react-toastify';
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import './index.css'
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const PostForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const editingPost = useSelector((state) => state?.post?.editingPost);

  const isEditMode = Boolean(editingPost);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: isEditMode ? editingPost : {},
  });

  useEffect(() => {
    dispatch(getUserList());
  }, [dispatch]);

  useEffect(() => {
    if (isEditMode) {
      reset(editingPost);
      setSelectedNames(editingPost.users || []); 
    } else {
      reset({});
      setSelectedNames([]); 
    }
  }, [isEditMode, editingPost, reset]);

  const userList = useSelector(state => state.user.userList);

  const [selectedNames, setSelectedNames] = useState([]);

  const onSubmit = data => {
    if (isEditMode) {
      dispatch(updatePost({ postId: editingPost.id, body: data, users: selectedNames }));
      toast.warn("Cập nhật thành công");
    } else {
      dispatch(createPost(data));
      toast.success("Thêm thành công");
    }
    navigate("/posts");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="author"
        control={control}
        rules={{
          required: "Author is required",
          minLength: {
            value: 5,
            message: "Author must be at least 5 characters",
          },
          maxLength: {
            value: 15,
            message: "Author must not exceed 15 characters",
          },
        }}
        render={({ field }) => (
          <div>
            <MuiInput
              name="author"
              label="Author"
              placeholder="Enter your author"
              sx={{
                width: '100%',
                padding: '20px 0',
              }}
              {...field}
            />
            {errors.author && (
              <p style={{ color: 'red' }}>
                {errors.author.message}
              </p>
            )}
          </div>
        )}
      />
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Users</InputLabel>
        <Controller
          name="users"
          control={control}
          defaultValue={selectedNames}
          style= {{
            width:'100%'
          }}
          multiple
          render={({ field }) => (
            <Select
              {...field}
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
              style={{
                width: '100%',
                paddingLeft: '20px',
                paddingTop: '20px',
                paddingBottom: '20px',
                marginBottom: '11px',
                borderRadius: '10px',
                border: '1px solid #00B4AA',
              }}
            >
              {userList.map((user) => (
                <MenuItem key={user.id} value={user.name}>
                  <Checkbox className="green-checkbox" checked={selectedNames.indexOf(user.name) > -1} />
                  <ListItemText primary={user.name} />
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>
      <br />
      <MuiButton type="submit" variant="contained" color="success" sx={{
        width: '100%',
        padding: '20px 0',
        marginTop: '11px'
      }}>
        {isEditMode ? "Update Post" : "Add Post"}
      </MuiButton>
    </form>
  );
};

export default PostForm;