import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
// import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { CardMedia } from '@mui/material';

const SinglePage = () => {
  const [data, setData] = useState(null);
  const { postId } = useParams();
    
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

  return (
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          {data && 
            <Container maxWidth="sm">
                <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
                >
                  {data.Title}
                </Typography>
                <CardMedia
                  component="div"
                  sx={{
                    // 16:9
                    pt: '56.25%',
                    mb: 3,
                  }}
                  image={data.ImageUrl}
                />
                <Typography variant="h5" align="center" color="text.secondary" paragraph>
                  {data.Content}
                </Typography>
                <Typography
                component="h6"
                variant="h6"
                align="center"
                color="text.primary"
                gutterBottom
                >
                  Author: {data.Author}
                </Typography>
                <Stack
                    sx={{ pt: 4 }}
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                >
                </Stack>
            </Container>
          }
        </Box>
  );
}

export default SinglePage;