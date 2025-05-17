fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(data => data.forEach(element => {
    console.log(element.category);
    
  }));