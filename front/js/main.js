async function fetchkanap () {
    let list_kanap = await fetch("http://localhost:3000/api/products")
    .then((response) => { return response.json();});
    return list_kanap;
}


async function fetchProduct (productId) {
    let  productData = await fetch(`http://localhost:3000/api/products/${productId}`)
    .then((response) => { return response.json();});
    return  productData;
}


let productquantity = JSON.parse(localStorage.getItem("product"));
//console.log(productquantity)

    let test3 = [];
    
    if(productquantity){   
       productquantity.forEach((Quantity) => {
        test3.push(Quantity.quantity)
    })
    let total = `${eval(test3.join("+"))}`;
    let test = document.querySelector("nav")
            let test1 = test.querySelector("ul")
            let test2 = test1.querySelectorAll("li")[1]
            test2.innerText = `Panier ( ${total} )`;
            console.log(test3)     
}