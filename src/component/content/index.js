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

import PropTypes from 'prop-types'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import CloseIcon from '@mui/icons-material/Close'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  )
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
}

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
  // const [loading, setLoading] = useState(false)
  const [food, setFood] = useState([])
  const [open, setOpen] = React.useState(false)

  const [anchorEl, setAnchorEl] = React.useState(null)
  const opens = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleCloses = () => {
    setAnchorEl(null)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  useEffect(() => {
    fetch('https://run.mocky.io/v3/ec196a02-aaf4-4c91-8f54-21e72f241b68')
      .then((response) => response.json())
      .then((data) => setFood(data))
  }, [])

  const [topping, setTopping] = useState([])

  useEffect(() => {
    fetch('https://run.mocky.io/v3/ec196a02-aaf4-4c91-8f54-21e72f241b68')
      .then((response) => response.json())
      .then((data) => data[0])
      .then((allPizzas) => allPizzas.toppings[0].items)
      .then((data) => setTopping(data))
  }, [])

  return (
    <div>
      {food.map((val, index) => {
        return (
          <div>
            <Card
              sx={{ maxWidth: 345 }}
              style={{ marginTop: '100px' }}
              key={index}
            >
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    {val.isVeg}
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
                  <RemoveIcon onClick={handleClickOpen} />
                </IconButton>
                <IconButton aria-label="share">
                  <AddIcon onClick={handleClickOpen} />
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

            <div>
              <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
              >
                <BootstrapDialogTitle
                  id="customized-dialog-title"
                  onClose={handleClose}
                >
                  Addons
                </BootstrapDialogTitle>
                <DialogContent dividers>
                  <div>
                    <Button
                      id="basic-button"
                      aria-controls="basic-menu"
                      aria-haspopup="true"
                      aria-expanded={opens ? 'true' : undefined}
                      onClick={handleClick}
                    >
                      Size
                    </Button>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={opens}
                      onClose={handleCloses}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                    >
                      <MenuItem onClick={handleCloses}>
                        {val.size.items}
                      </MenuItem>
                      <MenuItem onClick={handleCloses}>Regular</MenuItem>
                      <MenuItem onClick={handleCloses}>Medium</MenuItem>
                      <MenuItem onClick={handleCloses}>Large</MenuItem>
                    </Menu>
                  </div>
                  <div>
                    <Button
                      id="basic-button"
                      aria-controls="basic-menu"
                      aria-haspopup="true"
                      aria-expanded={opens ? 'true' : undefined}
                      onClick={handleClick}
                    >
                      Toppings
                    </Button>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={opens}
                      onClose={handleCloses}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                    >
                      <MenuItem onClick={handleCloses}>Red Pepper</MenuItem>
                      <MenuItem onClick={handleCloses}>Onion</MenuItem>
                      <MenuItem onClick={handleCloses}>Grilled</MenuItem>
                      <MenuItem onClick={handleCloses}>Extra Cheese</MenuItem>
                      <MenuItem onClick={handleCloses}>Black Olive</MenuItem>
                    </Menu>
                  </div>
                </DialogContent>
                <DialogActions>
                  <Button autoFocus onClick={handleClose}>
                    Save changes
                  </Button>
                </DialogActions>
              </BootstrapDialog>
            </div>
            {console.log(topping)}
          </div>
        )
      })}
    </div>
  )
}
