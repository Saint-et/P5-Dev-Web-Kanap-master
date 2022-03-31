 /*___________________  recuperation de l'ID de commande dans l'adresse  _________________*/
 const orderId = window.location.search.split("?").join("");
//console.log(orderId);

let order = orderId.split("id=").join("")
//console.log(order);

 /*___________________  affichage de l'ID de commande dans la page  _________________*/

let orderdisplay = document.getElementById("orderId");
orderdisplay.innerText = (order);
