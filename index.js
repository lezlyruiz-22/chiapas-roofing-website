// array of reviews
const REVIEWS = [
    "Perfect company!",
    "Loved the prices!",
    "Family oriented company with its customer's needs prioritized."
];

// let means a value might change
let reviewNum = 0;

document.getElementById("review-btn").addEventListener("click", (e) => {
    alert(REVIEWS[reviewNum]);
    reviewNum = (reviewNum + 1) % REVIEWS.length;
})

// read the page with the DOM

// counts the number of rows <tr> inside the body <tbody> of the table with id job-costs
const jobCount = document.querySelectorAll("#job-costs tbody tr").length;
// write that number back to title (back ticks not single quotes)
document.getElementById("job-cost-title").innerText = `${jobCount} Estimation Step Instructions`;