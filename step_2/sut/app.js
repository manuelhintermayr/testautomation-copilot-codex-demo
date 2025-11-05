// TechShop Vue.js Application
const { createApp } = Vue;

// Load products data
let productsData = [];

// Fetch products from JSON file
fetch('products.json')
    .then(response => response.json())
    .then(data => {
        productsData = data;
        initializeApp();
    })
    .catch(error => {
        console.error('Error loading products:', error);
        // Fallback: Initialize app with empty products
        initializeApp();
    });

function initializeApp() {
    createApp({
        data() {
            return {
                currentPage: 'home',
                searchQuery: '',
                deliveryMethod: 'delivery',
                cart: [],
                lastOrder: [],
                lastOrderTotal: 0,
                orderNumber: '',
                isDarkMode: localStorage.getItem('darkMode') === 'true' || false,
                customerInfo: {
                    name: '',
                    email: '',
                    address: ''
                },
                products: productsData
            };
        },
        computed: {
            displayedProducts() {
                if (!this.searchQuery) {
                    return this.products;
                }
                const query = this.searchQuery.toLowerCase();
                return this.products.filter(product => 
                    product.name.toLowerCase().includes(query) || 
                    product.description.toLowerCase().includes(query) ||
                    product.category.toLowerCase().includes(query)
                );
            },
            cartItemCount() {
                return this.cart.reduce((total, item) => total + item.quantity, 0);
            },
            cartTotal() {
                return this.cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
            }
        },
        mounted() {
            this.applyTheme();
        },
        methods: {
            toggleTheme() {
                this.isDarkMode = !this.isDarkMode;
                localStorage.setItem('darkMode', this.isDarkMode);
                this.applyTheme();
            },
            applyTheme() {
                if (this.isDarkMode) {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
            },
            scrollToProducts() {
                document.getElementById('products').scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            },
            performSearch() {
                // Search is reactive through computed property
            },
            clearSearch() {
                this.searchQuery = '';
            },
            addToCart(product) {
                const existingItem = this.cart.find(item => item.product.id === product.id);
                if (existingItem) {
                    existingItem.quantity++;
                } else {
                    this.cart.push({ product, quantity: 1 });
                }
            },
            removeFromCart(productId) {
                this.cart = this.cart.filter(item => item.product.id !== productId);
            },
            incrementQuantity(productId) {
                const item = this.cart.find(item => item.product.id === productId);
                if (item) {
                    item.quantity++;
                }
            },
            decrementQuantity(productId) {
                const item = this.cart.find(item => item.product.id === productId);
                if (item && item.quantity > 1) {
                    item.quantity--;
                }
            },
            placeOrder() {
                if (!this.customerInfo.name || !this.customerInfo.email) {
                    alert('Please fill in your contact information');
                    return;
                }
                if (this.deliveryMethod === 'delivery' && !this.customerInfo.address) {
                    alert('Please provide a delivery address');
                    return;
                }
                
                // Save order details
                this.lastOrder = JSON.parse(JSON.stringify(this.cart));
                this.lastOrderTotal = this.cartTotal;
                this.orderNumber = 'TS-' + Date.now().toString().slice(-8);
                
                // Clear cart
                this.cart = [];
                
                // Show confirmation
                this.currentPage = 'confirmation';
            },
            continueShopping() {
                this.currentPage = 'home';
                this.customerInfo = { name: '', email: '', address: '' };
                this.deliveryMethod = 'delivery';
                this.searchQuery = '';
            }
        }
    }).mount('#app');
}
