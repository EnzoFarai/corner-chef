document.addEventListener('DOMContentLoaded', function() {
    // Initialize shopping list
    let shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];
    const listContainer = document.getElementById('shopping-items');
    
    // Render shopping list
    function renderShoppingList() {
        listContainer.innerHTML = '';
        shoppingList.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            listContainer.appendChild(li);
        });
    }
    
    // Add to shopping list buttons
    document.querySelectorAll('.add-to-list').forEach(button => {
        button.addEventListener('click', function() {
            const user = localStorage.getItem('cornerChefUser');
            if (!user) {
                document.getElementById('loginModal').style.display = 'block';
                return;
            }
            
            const ingredient = this.getAttribute('data-ingredient');
            if (!shoppingList.includes(ingredient)) {
                shoppingList.push(ingredient);
                localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
                renderShoppingList();
                
                // Visual feedback
                this.textContent = '✓ Added';
                this.disabled = true;
                setTimeout(() => {
                    this.textContent = 'Add to List';
                    this.disabled = false;
                }, 2000);
            }
        });
    });
    
    // Initial render
    renderShoppingList();
});
