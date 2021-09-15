import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap'
import Rating from '../components/Rating'
import products from '../products'
import axios from 'axios'


// props.match - id produktu

function ProductScreen({ match }) {
  // props.match to {id} z path="/product/:id"
  // const product = products.find(p => p._id == match.params.id) //listowanie z fakowych danych

  // inicjalizacja danych
  const [product, setProduct] = useState([])

  // useEffect uruchamiany za każdym razem gdy zmienia sie stan komponentu/ update danych
  useEffect(() => {
    async function fetchProduct() { // opakowanie w fucknji, zeby zapytanie było asynchroniczne
      const { data } = await axios.get(`/api/products/${match.params.id}`)
      setProduct(data)
    }

    fetchProduct()
  }, [])


  return (
    <div>
      <Link to='/' className='btn btn-light my-3'>Go back</Link>
      <Row>
        {/* Pierwsza kolumna - obrazek od lewej */}
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>

        {/* druga kolumna od lewej */}
        <Col md={3}>
          {/* variant flush - nie ma obramowań wokół kolumny po prawej */}
          <ListGroup variant="flush">
            {/* nazwa produkrtu */}
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>

            {/* recenjze - gwiazdki komponent*/}
            <ListGroup.Item>
              <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
            </ListGroup.Item>

            {/* cena produktu */}
            <ListGroup.Item>
              Price: ${product.price}
            </ListGroup.Item>


            {/* opis */}
            <ListGroup.Item>
              Description: {product.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>


        {/* trzecia kolumna od lewej */}
        <Col md={3}>
          {/* takie podsumowanie z ceną po prawej i ilością szttuk w magazynie */}
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Price: </Col>
                  <Col><strong>${product.price}</strong></Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  {/* infdormacja czy produkt jest w magazynie */}
                  <Col>
                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                {/* przycisk dodaj do koszyka jeśli produkt jest dostepny w magazynie, inaczej przyck nieaktywny */}
                <Button className='btn-block' disabled={product.countInStock === 0} type='button'>Add To Cart</Button>
              </ListGroup.Item>

            </ListGroup>
          </Card>
        </Col>

      </Row>
    </div>
  )
}

export default ProductScreen
