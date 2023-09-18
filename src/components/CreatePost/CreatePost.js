import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link, useNavigate } from 'react-router-dom';
import { EditNoteOutlined } from '@mui/icons-material';
import axios from 'axios';

export function CreatePost() {
  const navigate = useNavigate();

  const handlePostSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    console.log(data);
    
    try {
      let response = await axios.post('http://localhost:5000/posts', {
        title: data.get('title'),
        img: "https://images.unsplash.com/photo-1693323818873-bcf90d64b1fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60", // data.get('img'),
        author: data.get('author'),
        content: data.get('content'),
      });

      let dataResponse = await response.data;

      console.log(dataResponse);
      
      console.log(response?.status);
      if(response?.status === 201) {
        return navigate('/posts');
      }

      return dataResponse;
    } catch (error) {
      console.error(`Errooo!!! \n`, error);
    }
  }

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <EditNoteOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            New Post
          </Typography>
          <Box component="form" method="post" onSubmit={handlePostSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              autoComplete="title"
              autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="author"
            label="author"
            name="author"
            autoComplete="author"
            autoFocus
          />
            <TextField
              margin="normal"
              fullWidth
              name="content"
              id="content outlined-multiline-static"
              label="content"
              multiline
              rows={4}
              autoComplete="current-text"
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, mr: 2 }}
            >
              Save
            </Button>
            <Button
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="error"
              component={Link}
              to="../posts"
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Container>
  );
}

export default CreatePost;