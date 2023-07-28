import * as React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { red } from '@mui/material/colors'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Tooltip from '@mui/material/Tooltip'
// @ts-ignore
export default function Products({ item, sendProducts }) {
  const [value, setValue] = React.useState('')

  const handleChange = (event: React.ChangeEventHandler<HTMLInputElement>) => {
    // @ts-ignore
    const target = (event.target as HTMLInputElement).value
    setValue(target)
  }
  const handleClick = (_event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (value !== '' && value >= '1') {
      const productCopy = {...item};
      productCopy.quantity = value;
      // @ts-ignore
      sendProducts({ product: productCopy })
    }
  }
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
            P
          </Avatar>
        }
        title={item.title}
        subheader={'$ ' + item.price}
      />
      <CardMedia
        style={{ height: '520px', width: '350px' }}
        component='img'
        height='194'
        src={item.image}
        alt={item.title}
      />
      <CardContent>
        <Typography variant='body2' color='text.secondary'>
          {item.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {/* @ts-ignore*/}
        <input type='number' min='0' value={value} onChange={handleChange} />
        <Tooltip title='Add to cart'>
          <IconButton aria-label='buy'>
            <ShoppingCartIcon onClick={handleClick} />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  )
}
