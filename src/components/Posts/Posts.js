import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export default function Posts() {
  const [data, setData] = useState(null);
    
  // async/await
  async function fetchData() {
      try {
          let response = await axios.get(
          'http://localhost:5000/posts'
          );
          
          let dataResponse = await response.data;
          // console.log(response);
        
          setData(dataResponse);
      } catch (err) {
          console.error('Errrroooo!!! ', err);
      }
  }

  useEffect(() => {
    fetchData()
  }, []);

    // async/await
    async function deleteData(id) {
      try {
        let response = await axios.delete(
          `http://localhost:5000/posts/${id}`
        );
          
        let dataResponse = await response.data;
        // console.log(dataResponse);
        console.log(response?.status);
        if(response?.status === 200) {
          return window.location = '/posts';
        }

        return dataResponse;
      } catch (err) {
        console.error('Errrroooo!!! ', err);
      }
    }

  return (
    <>
        {/* Hero unit */}
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Button className='new-post' variant="contained" sx={{mb: 2}} component={Link} to="./create-post">New Post <AddIcon /></Button>
          <Grid container spacing={4}>
            {data && data.map((card, ind) => (
              <Grid item key={`card-${ind}`} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image={card.ImageUrl}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Id: {card.Id} <br/> {card.Title}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="h6">
                      Author: {card.Author}
                    </Typography>
                    <Typography>
                      {card.Content}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" variant="contained" component={Link} to={`./${card.Id}`}>View</Button>
                    <Button component={Link} to={`./${card.Id}/edit-post/`}>Edit</Button>
                    <Button onClick={() => deleteData(card.Id)}>Delete</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
    </>
  );
}