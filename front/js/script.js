kanapDisplay();

//récupération de la liste des article
async function fetchkanap () {
    let list_kanap = await fetch("http://localhost:3000/api/products")
    .then((response) => { return response.json();})
    .catch (function(error){
        return error;
    });
    return list_kanap
}

// Répartition des données de l'API dans le DOM
async function kanapDisplay () { 
    let list_kanap = await fetchkanap ();
    console.table(list_kanap);


for (let kanap of list_kanap){
    // Insertion de l'élément "a"
    const link = document.createElement ("a")
    link.href =`product.html?id=${kanap._id}`;
    document.getElementById("items").appendChild(link)
    
    // Insertion de l'élément "article"
    const article = document.createElement ("article")
    link.appendChild(article)
    
    // Insertion de l'image
    const img = document.createElement("img");
    img.src = `${kanap.imageUrl}`;
    img.alt = `${kanap.altTxt}`;
    article.appendChild(img)
    
    // Insertion du titre "h3"
    const h3 = document.createElement ("h3")
    h3.setAttribute("class", "productName")
    h3.innerText = `${kanap.name}`;
    article.appendChild(h3)
    
    // Insertion de la description "p"
    const p = document.createElement ("p")
    p.setAttribute("class", "productDescription")
    p.innerText = `${kanap.description}`;
    article.appendChild(p)
          
    }
};

