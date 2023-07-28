import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ClearIcon from '@mui/icons-material/Clear';
import Tooltip from '@mui/material/Tooltip';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

//@ts-ignore
export default function StickyCart({products, clearCart, buy} ) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
        <Typography sx={{ fontSize: 22 }} color="text.secondary" gutterBottom>
          Cart
        </Typography>
        <ShoppingCartIcon />
        </Box>
      
        {
            products.map((item: { product: { title: string, quantity: number }; } )=>{
                return  <><Box sx={{display: 'flex'}}>
                <Typography component="div">
                 Product: 
                </Typography>
                <Typography color="text.secondary">
                  {item.product.title}
                </Typography>
                </Box>
                <Box sx={{display: 'flex'}}>
                <Typography component="div">
                 Quantity: 
                </Typography>
                <Typography color="text.secondary">
                  {item.product.quantity}
                </Typography>
                </Box>
                <Divider />
                </>
            })
        }
       

      </CardContent>
      {products.length>=1 && <CardActions>
      <Tooltip title='Buy products'>
          <Button size="small" color="success" onClick={()=>{
            buy(products)
          }}>Buy</Button>
        </Tooltip>
        <Tooltip title='Clear cart'>
          <Button size="small" color="error" onClick={()=>{
            clearCart()
          }}><ClearIcon/></Button>
        </Tooltip>
      </CardActions>}
      
    </Card>
  );
}
