const recipes = [
  {
    id: "chicken",
    title: "Chicken Curry",
    category: "Local",
    image: "images/chicken-curry.jpg",
    rating: "4.8 ★",
    time: "45 mins",
    servings: "4",
    calories: "350 Cal",
    difficulty: "Medium",
    ingredients: ["500g Chicken", "1 Onion", "2 Tomatoes", "Spices"],
    directions: "Cook onions, add chicken and spices. Simmer until done."
  },
  {
    id: "crepes",
    title: "Crepes with Orange",
    category: "Western",
    image: "images/crepes.jpg",
    rating: "4.5 ★",
    time: "35 mins",
    servings: "3",
    calories: "103 Cal",
    difficulty: "Easy",
    ingredients: ["2 Eggs", "1 Cup flour", "1/2 Cup milk", "Butter"],
    directions: "Mix ingredients and cook in pan. Top with orange and honey."
  },
  {
    id: "burger",
    title: "Cheese Burger",
    category: "Western",
    image: "images/burger.jpeg",
    rating: "4.6 ★",
    time: "25 mins",
    servings: "2",
    calories: "500 Cal",
    difficulty: "Easy",
    ingredients: ["Buns", "Beef patty", "Cheese", "Lettuce"],
    directions: "Grill patty, assemble burger."
  },
  {
    id: "smoothie",
    title: "Berry Smoothie",
    category: "Drinks",
    image: "images/smoothie.jpeg",
    rating: "4.9 ★",
    time: "10 mins",
    servings: "1",
    calories: "180 Cal",
    difficulty: "Easy",
    ingredients: ["Berries", "Yogurt", "Honey"],
    directions: "Blend all ingredients until smooth."
  },
  {
    id: "rice",
    title: "Fried Rice",
    category: "Local",
    image: "images/rice.jpeg",
    rating: "4.7 ★",
    time: "30 mins",
    servings: "3",
    calories: "400 Cal",
    difficulty: "Medium",
    ingredients: ["Rice", "Vegetables", "Soy sauce", "Egg"],
    directions: "Stir fry veggies and rice with egg and sauce."
  },
  {
    id: "cake",
    title: "Chocolate Cake",
    category: "Dessert",
    image: "images/cake.jpeg",
    rating: "4.9 ★",
    time: "1 hr",
    servings: "6",
    calories: "600 Cal",
    difficulty: "Hard",
    ingredients: ["Flour", "Cocoa", "Eggs", "Sugar"],
    directions: "Bake in preheated oven."
  }
];

// Display recipes
function displayRecipes(list) {
  const container = document.getElementById("recipe-list");
  if (!container) return;
  container.innerHTML = "";

  list.forEach(recipe => {
    const card = document.createElement("div");
    card.className = "card";
    card.onclick = () => viewRecipe(recipe.id);
    card.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.title}" />
      <div class="card-info">
        <p>${recipe.title}</p>
        <span class="badge">${recipe.rating}</span>
      </div>
    `;
    container.appendChild(card);
  });
}

// Filter by category
function filterCategory(category) {
  const list = category === 'Popular' ? recipes : recipes.filter(r => r.category === category);
  displayRecipes(list);
  updateCategoryHighlight(category);
}

// Update active category button
function updateCategoryHighlight(category) {
  const buttons = document.querySelectorAll(".categories button");
  buttons.forEach(btn => {
    btn.classList.remove("active");
    if (
      btn.textContent === category ||
      (category === "Popular" && btn.textContent.includes("🔥"))
    ) {
      btn.classList.add("active");
    }
  });
}

// Search filter
const searchInput = document.querySelector(".search");
if (searchInput) {
  searchInput.addEventListener("input", e => {
    const keyword = e.target.value.toLowerCase();
    const filtered = recipes.filter(r =>
      r.title.toLowerCase().includes(keyword)
    );
    displayRecipes(filtered);
  });
}

// View detail
function viewRecipe(id) {
  localStorage.setItem("selectedRecipe", id);
  window.location.href = "recipe.html";
}

// Load recipe detail page
function loadRecipeDetail() {
  const id = localStorage.getItem("selectedRecipe");
  const data = recipes.find(r => r.id === id);
  if (!data) return;

  document.getElementById("recipe-image").src = data.image;
  document.getElementById("recipe-title").textContent = data.title;
  document.getElementById("rating").textContent = data.rating;
  document.getElementById("time").textContent = data.time;
  document.getElementById("servings").textContent = data.servings;
  document.getElementById("calories").textContent = data.calories;
  document.getElementById("difficulty").textContent = data.difficulty;

  const ingredientsEl = document.getElementById("ingredients");
  ingredientsEl.innerHTML = "";
  data.ingredients.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    ingredientsEl.appendChild(li);
  });

  document.getElementById("directions").textContent = data.directions;
}

// Page-specific logic
if (document.getElementById("recipe-list")) {
  filterCategory("Popular");
}
if (document.getElementById("recipe-title")) {
  loadRecipeDetail();
}
