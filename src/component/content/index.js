import * as React from 'react'
import { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { red } from '@mui/material/colors'
import ShoppingCartRounded from '@mui/icons-material/ShoppingCartRounded'
// import ShareIcon from '@mui/icons-material/Share'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
// import MoreVertIcon from '@mui/icons-material/MoreVert'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import Button from '@mui/material/Button'

const ExpandMore = styled((props) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))

export default function Content() {
  const [expanded, setExpanded] = React.useState(false)
  const [loading, setLoading] = useState(false)
  const [food, setFood] = useState([])
  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  useEffect(() => {
    fetch('https://run.mocky.io/v3/ec196a02-aaf4-4c91-8f54-21e72f241b68')
      .then((response) => response.json())
      .then((data) => setFood(data))
  }, [])

  return (
    <div>
      {food.map((val, index) => {
        return (
          <div>
            <Card sx={{ maxWidth: 345 }} style={{ marginTop: '100px' }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    R
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    {/* <MoreVertIcon /> */}
                  </IconButton>
                }
                title={val.name}
              />
              <CardMedia
                component="img"
                height="194"
                src={val.img_url}
                alt="Paella dish"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {val.description}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <RemoveIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <AddIcon />
                </IconButton>
                {/* <IconButton> */}
                <Button
                  variant="text"
                  style={{ color: 'gray' }}
                  startIcon={<ShoppingCartRounded />}
                >
                  Add to Cart
                </Button>
                {/* </IconButton> */}
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph>Details</Typography>
                  <Typography paragraph>Rating Stars: {val.rating}</Typography>
                  <Typography paragraph>Price: {val.price}</Typography>
                </CardContent>
              </Collapse>
            </Card>
          </div>
        )
      })}
    </div>
  )
}
