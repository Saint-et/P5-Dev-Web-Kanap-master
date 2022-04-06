 // Confirmation de la commande 
 function main(){
    let link = window.location.href;
let url = new URL(link);
let idProduct = url.searchParams.get("id");
   const idNode = document.getElementById("orderId");
   idNode.innerText = idProduct;
   localStorage.clear();
}

main();