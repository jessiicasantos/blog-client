import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { EditNoteOutlined } from '@mui/icons-material';

export function EditPost() {
  const [data, setData] = useState(null);
  const { postId } = useParams();
  const navigate = useNavigate();

  // async/await
  async function fetchData() {
      try {
        let response = await axios.get(
          `http://localhost:5000/posts/${postId}`
        );
          
        let dataResponse = await response.data;
        // console.log(dataResponse);

        setData(dataResponse);
      } catch (err) {
        console.error('Errrroooo!!! ', err);
      }
  }

  useEffect(() => {
    fetchData()
  }, []);

  const handlePatchSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    console.log(data);
    
    try {
      let response = await axios.patch(`http://localhost:5000/posts/${postId}`, {
        title: data.get('title'),
        img: "https://images.unsplash.com/photo-1693323818873-bcf90d64b1fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60", // data.get('img'),
        author: data.get('author'),
        content: data.get('content'),
      });

      let dataResponse = await response.data;

      console.log(dataResponse);
      
      console.log(response?.status);

      if(response?.status === 200) {
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
        {data &&
          <Box component="form" method="post" onSubmit={handlePatchSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              autoComplete="title"
              defaultValue={data.Title}
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
            defaultValue={data.Author}
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
              defaultValue={data.Content}
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
        }
        </Box>
      </Container>
  );
}

export default EditPost;