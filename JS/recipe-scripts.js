// Shopping List Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize shopping list from localStorage
    let shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];
    
    // Update shopping list display
    function updateShoppingListDisplay() {
        const listContainer = document.getElementById('shoppingListItems');
        if (listContainer) {
            listContainer.innerHTML = '';
            
            if (shoppingList.length === 0) {
                listContainer.innerHTML = '<li class="empty-message">Your shopping list is empty</li>';
                return;
            }
            
            shoppingList.forEach((item, index) => {
                const li = document.createElement('li');
                li.className = 'shopping-list-item';
                li.innerHTML = `
                    <div>
                        <input type="checkbox" class="item-checkbox" id="item-${index}">
                        <label for="item-${index}" class="item-text">${item.text}</label>
                    </div>
                    <button class="item-remove" data-index="${index}">×</button>
                `;
                listContainer.appendChild(li);
            });
            
            // Add event listeners to remove buttons
            document.querySelectorAll('.item-remove').forEach(btn => {
                btn.addEventListener('click', function() {
                    const index = parseInt(this.getAttribute('data-index'));
                    shoppingList.splice(index, 1);
                    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
                    updateShoppingListDisplay();
                    updateIngredientHighlights();
                });
            });
        }
    }
    
    // Add ingredient to shopping list
    function addToShoppingList(text) {
        if (!shoppingList.some(item => item.text === text)) {
            shoppingList.push({ text, checked: false });
            localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
            updateShoppingListDisplay();
            return true;
        }
        return false;
    }
    
    // Clear shopping list
    function clearShoppingList() {
        shoppingList = [];
        localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
        updateShoppingListDisplay();
        updateIngredientHighlights();
    }
    
    // Print shopping list
    function printShoppingList() {
        window.print();
    }
    
    // Update ingredient highlights on recipe pages
    function updateIngredientHighlights() {
        document.querySelectorAll('.ingredients li').forEach(li => {
            const text = li.textContent.trim();
            if (shoppingList.some(item => item.text === text)) {
                li.classList.add('added-to-list');
            } else {
                li.classList.remove('added-to-list');
            }
        });
    }
    
    // Add click handlers for ingredients
    document.querySelectorAll('.ingredients li').forEach(li => {
        li.addEventListener('click', function() {
            const text = this.textContent.trim();
            if (addToShoppingList(text)) {
                this.classList.add('added-to-list');
                // Show a temporary notification
                const notification = document.createElement('div');
                notification.className = 'add-notification';
                notification.textContent = 'Added to shopping list';
                this.appendChild(notification);
                setTimeout(() => {
                    notification.remove();
                }, 2000);
            }
        });
    });
    
    // Add event listeners for shopping list buttons
    const printBtn = document.getElementById('printList');
    const clearBtn = document.getElementById('clearList');
    
    if (printBtn) printBtn.addEventListener('click', printShoppingList);
    if (clearBtn) clearBtn.addEventListener('click', clearShoppingList);
    
    // Initialize displays
    updateShoppingListDisplay();
    updateIngredientHighlights();
    
    // Rest of your existing recipe scripts...
    // Bookmark functionality
    const bookmarkBtn = document.getElementById('bookmarkBtn');
    const bookmarkIcon = document.getElementById('bookmarkIcon');
    let isBookmarked = false;

    if (bookmarkBtn) {
        bookmarkBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (!isLoggedIn) {
                showSignIn();
                return;
            }
            
            isBookmarked = !isBookmarked;
            bookmarkIcon.textContent = isBookmarked ? 'bookmark_added' : 'bookmark_add';
        });
    }

    // Rating system
    const ratingStars = document.querySelectorAll('.rating-star');
    if (ratingStars) {
        ratingStars.forEach(star => {
            star.addEventListener('click', function() {
                if (!isLoggedIn) {
                    showSignIn();
                    return;
                }
                const rating = this.getAttribute('data-rating');
                // Submit rating to your backend
            });
        });
    }
});

function showSignIn() {
    alert("Please sign in to use this feature.");
    // In a real implementation, you would show a sign-in modal
}
