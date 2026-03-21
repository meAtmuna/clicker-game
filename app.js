const biryaniBtn = document.getElementById("biryani-btn");
const biryaniCount = document.getElementById("biryani-count");
const shopContainer = document.getElementById("shop-items");

let totalBiryaniClick = 0;
let itemsOwned = [];

function biryaniClick() {
    const masala = itemsOwned.find(i => i.name === "Masala");
    const multiplier = masala ? masala.amount: 0;

    totalBiryaniClick += 1 * 2 ** multiplier;
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
    document.querySelectorAll(".shop-item").forEach((element) =>{
        element.remove();
    });

    shopItems.forEach(item =>{
        const shopItem = document.createElement("div");
        shopItem.className = "shop-item";
        
        shopItem.innerHTML =`
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <button onclick="buyItem('${item.name}')">
                Buy ${item.cost}
            </button>
        `;
        
        shopContainer.appendChild(shopItem);
    });
}

function buyItem(name) {
    const item = shopItems.find(i => i.name === name);

    if(totalBiryaniClick >= item.cost) {

        totalBiryaniClick -= item.cost;
        biryaniCount.textContent = totalBiryaniClick;

        let amount = 1;
        
        const owned =  itemsOwned.find(i => i.name === name);

        if (owned) {
            owned.amount++;
            amount = owned.amount;
        } else {
            itemsOwned.push({name: name, amount: 1});
        }
        
        item.cost = item.startingCost + item.startingCost * amount ** 2;

        createShopItems();
        
    } else {

        alert("not enough biryani!");
    }
    
}

setInterval(() => {
    const chef = itemsOwned.find(i => i.name === "chef");
    if (chef) {
        for (let i = 0; i < chef.amount; i++) {

            biryaniClick();
        }
    }
}, 1000);

createShopItems();