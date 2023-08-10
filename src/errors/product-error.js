export const generateProductErrorInfo = (product) => {
    return `
      Empty fields please add all the statements
      Your product must have:
          * title: Must be a string. (${product.title})
          * description: Must be a string. (${product.description})
          * price: Must be a Number. (${product.price})
          * thumbnail: Must be a string. (${product.thumbnail})  
          * stock: Must be a Number. (${product.stock}) 
          * category: Must be a string. (${product.category})   
      `;
  };