export interface InterfaceOrders {
  _id: string
  createDate: Date
  status: string
  client: string
  shippingAddress: string
  shippingPromise: Date
  items: Array<InterfaceItems>
}

export interface InterfaceItems {
  product : {
  id: string
  title: string
  description: string
  url: string
  price: number
  quantity: number
  image: string
  }
  
}
export interface InterfaceCartProducts {
  product: InterfaceItems
}
export interface InterfaceStatusButtonFilter {
  onStatusChange: (newType: string) => void
}
