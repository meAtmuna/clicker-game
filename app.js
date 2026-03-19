const biryaniBtn = document.getElementById("biryani-btn");
const biryaniCount = document.getElementById("biryani-count");

let totalBiryaniClick = 0;

function biryaniClick() {
    totalBiryaniClick++;
    biryaniCount.textContent = totalBiryaniClick;
}

biryaniBtn.addEventListener("click", function () {
    biryaniClick();
});