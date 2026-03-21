const biryaniBtn = document.getElementById("biryani-btn");
const biryaniCount = document.getElementById("biryani-count");
const shopContainer = document.getElementById("shop-items");

let totalBiryaniClick = 0;

function biryaniClick() {
    totalBiryaniClick++;
    biryaniCount.textContent = totalBiryaniClick;
}

biryaniBtn.addEventListener("click", function () {
    biryaniClick();
});

const shopItems= [
    {
        name:"chef",
        description: "chefs cook biryani for you",
        cost: 10,
        startingCost: 10,
    },
    {
        name: "Masala",
        description: "Double your biryani per click",
        cost: 50,
        startingCost: 50,
    },
]

function createShopItems() {
    shopItems.forEach(item =>{
        const shopItem = document.createElement("div");
        
        shopItem.innerHTML =`
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <button>${item.cost}</button>
        `;
        
        shopContainer.appendChild(shopItem);
    });
}

createShopItems();