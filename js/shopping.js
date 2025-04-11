document.addEventListener('DOMContentLoaded', function() {
    const list = JSON.parse(localStorage.getItem('shoppingList')) || [];
    const listElement = document.getElementById('shopping-items');
    
    function renderList() {
        listElement.innerHTML = '';
        list.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            listElement.appendChild(li);
        });
    }
    
    document.querySelectorAll('.add-to-list').forEach(button => {
        button.addEventListener('click', function() {
            if (!checkLogin()) return;
            const ingredient = this.getAttribute('data-ingredient');
            if (!list.includes(ingredient)) {
                list.push(ingredient);
                localStorage.setItem('shoppingList', JSON.stringify(list));
                renderList();
            }
        });
    });
    
    renderList();
});
