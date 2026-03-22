const biryaniBtn = document.getElementById("biryani-btn");
const biryaniCount = document.getElementById("biryani-count");
const shopContainer = document.getElementById("shop-items");
const statsContainer = document.getElementById("stats-items");

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
        name:"Chef",
        description: "Chefs cook biryani for you",
        cost: 25,
        startingCost: 25,
        image: "images/chef.jpg",
    },
    {
        name: "Masala",
        description: "Double your biryani per click",
        cost: 150,
        startingCost: 150,
        image: "images/biryaniMasala.jpg",
    },
    {
        name: "Deg",
        description: "English: Cook huge amounts of biryani automatically with this giant deg / Pakistani: Is bari deg ke sath khud ba khud bohat zyada biryani banao",
        cost: 12500,
        startingCost: 12500,
        image: "images/biryaniDeg.webp",
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
            <div class="shop-img-name">
                <img src="${item.image}" width="50">
                <h3>${item.name}</h3>
            </div>
            <p>${item.description}</p>
            <button onclick="buyItem('${item.name}')">
                Buy ${item.cost}
            </button>
        `;
        
        shopContainer.appendChild(shopItem);
    });
}

function createStatsItems() {
    document.querySelectorAll(".stats-item").forEach((element) => {
        element.remove();
    });

    if (itemsOwned.length > 0) {

        itemsOwned.forEach(item => {
            const shopItem = shopItems.find(i => i.name === item.name)
            const statsItem = document.createElement("div");
            statsItem.className = "stats-item";
            
            statsItem.innerHTML = `
                <img src="${shopItem.image}" width="50">
                <h3>${item.name} </h3>
                <p>${item.amount}</p>
            `;

            statsContainer.appendChild(statsItem);
        })
    } else{
        const statsItem = document.createElement("div");
        statsItem.className = "stats-item";

        statsItem.innerHTML = `
                <p>No Item Yet</p>
            `;

        statsContainer.appendChild(statsItem);
    }
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
        createStatsItems();
        
    } else {

        alert("not enough biryani!");
    }
    
}

setInterval(() => {
    const chef = itemsOwned.find(i => i.name === "Chef");
    const deg = itemsOwned.find(i => i.name === "Deg");
    if (chef) {
        for (let i = 0; i < chef.amount; i++) {

            biryaniClick();
        }
    }

    if (deg) {
        totalBiryaniClick += deg.amount * 50;
        biryaniCount.textContent = totalBiryaniClick;
    }
}, 1000);

function saveGame() {
    localStorage.setItem("biryani" , totalBiryaniClick);
    localStorage.setItem("items", JSON.stringify(itemsOwned));
    localStorage.setItem("shop", JSON.stringify(shopItems));
}

function loadGame() {
    const savedBiryani = localStorage.getItem("biryani");
    const savedItems = localStorage.getItem("items");
    const savedShop = localStorage.getItem("shop");

    if (savedBiryani) {
        totalBiryaniClick = Number(savedBiryani);
    }
    if (savedItems) {
        itemsOwned = JSON.parse(savedItems);
    }
    if (savedShop) {
        const savedShopItems = JSON.parse(savedShop);
        savedShopItems.forEach(savedItem =>{
            const item = shopItems.find(i => i.name === savedItem.name);
            if (item) {
                item.cost = savedItem.cost;
            }
        })
    }

    biryaniCount.textContent = totalBiryaniClick;
}

function resetGame() {
    localStorage.clear();
    location.reload();
}

loadGame();
setInterval(saveGame, 1000);
createShopItems();
createStatsItems();