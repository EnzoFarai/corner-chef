function initShoppingList() {
    const shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];
    const listContainer = document.getElementById('shopping-list-items');
    const emptyMessage = document.getElementById('empty-message');
    
    function renderList() {
        listContainer.innerHTML = '';
        
        if (shoppingList.length === 0) {
            emptyMessage.style.display = 'block';
            return;
        }
        
        emptyMessage.style.display = 'none';
        
        shoppingList.forEach((item, index) => {
            const li = document.createElement('li');
            li.className = 'shopping-item';
            
            li.innerHTML = `
                <span>${item}</span>
                <button class="remove-item" data-index="${index}">×</button>
            `;
            
            listContainer.appendChild(li);
        });
        
        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                shoppingList.splice(index, 1);
                localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
                renderList();
            });
        });
    }
    
    // Function to add items from recipe pages
    window.addToShoppingList = function(ingredient) {
        if (!checkAuth()) return false;
        
        if (!shoppingList.includes(ingredient)) {
            shoppingList.push(ingredient);
            localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
            renderList();
            return true;
        }
        return false;
    }
    
    function checkAuth() {
        const user = JSON.parse(localStorage.getItem('cornerChefUser'));
        if (!user?.isLoggedIn) {
            showAuthModal('login');
            return false;
        }
        return true;
    }
    
    renderList();
}
