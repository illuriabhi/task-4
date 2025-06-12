// Save the original order on page load
const itemsContainer = document.getElementById("items");
const originalItems = Array.from(document.querySelectorAll(".item"));
const categorySelect = document.getElementById("category");
const sortSelect = document.getElementById("sort");

function getPrice(item) {
    const priceText = item.querySelector("p:nth-of-type(2)")?.textContent || "";
    const match = priceText.match(/₹([\d,]+)/);
    return match ? parseInt(match[1].replace(/,/g, "")) : 0;
}

function getRating(item) {
    const ratingText = item.querySelector("p:last-of-type")?.textContent || "";
    const match = ratingText.match(/([0-9.]+)\/5/);
    return match ? parseFloat(match[1]) : 0;
}

function renderItems(items) {
    items.forEach(item => {
        item.style.display = "block";
        itemsContainer.appendChild(item);
    });
}

function filterAndSort() {
    let category = categorySelect.value;
    let sort = sortSelect.value;

    // Filter
    let filtered = originalItems.filter(item =>
        category === "all-categories" ? true : item.dataset.category === category
    );

    // Sort
    if (sort === "price-high") {
        filtered.sort((a, b) => getPrice(b) - getPrice(a));
    } else if (sort === "price-low") {
        filtered.sort((a, b) => getPrice(a) - getPrice(b));
    } else if (sort === "rating") {
        filtered.sort((a, b) => getRating(b) - getRating(a));
    } else if (category === "all-categories") {
        // Shuffle if all-categories and no sort
        filtered = [...filtered].sort(() => Math.random() - 0.5);
    }

    // Hide all first
    originalItems.forEach(item => (item.style.display = "none"));
    renderItems(filtered);
}

categorySelect.addEventListener("change", function () {
    // Reset sort to default when changing category
    sortSelect.value = "sort-by";
    filterAndSort();
});

sortSelect.addEventListener("change", filterAndSort);

// On page load, show all shuffled
window.addEventListener("DOMContentLoaded", function () {
    categorySelect.value = "all-categories";
    sortSelect.value = "sort-by";
    filterAndSort();
});

