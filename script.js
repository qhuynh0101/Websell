document.addEventListener("DOMContentLoaded", () => {
    // --- MODULES ---
    const Preloader = (() => {
        const preloaderEl = document.getElementById('preloader');
        const hide = () => {
            if (!preloaderEl) return;
            preloaderEl.style.opacity = '0';
            setTimeout(() => {
                preloaderEl.style.display = 'none';
            }, 500);
        };
        return { hide };
    })();

    const Language = (() => {
        const translations = {
            en: { search_placeholder: "Search for products...", lang_button: "Language", account_button: "Account", cart_button: "Cart", login: "Login", register: "Register", my_account: "My Account", sell_product: "Sell a Product", logout: "Logout", welcome_title: "Welcome to E-Commerce!", welcome_subtitle: "Your one-stop shop for everything you need.", promo_title: "Summer Sale Spectacle!", promo_subtitle: "Up to 50% off on thousands of items. Don't miss out!", shop_now: "Shop Now", featured_categories: "Featured Categories", category_electronics: "Electronics", category_fashion: "Fashion", category_home: "Home Goods", category_books: "Books", featured_products: "Featured Products", quick_view: "Quick View", add_to_cart: "Add to Cart", your_cart: "Your Shopping Cart", cart_empty: "Your cart is empty.", continue_shopping: "Continue Shopping", order_summary: "Order Summary", subtotal: "Subtotal", checkout: "Proceed to Checkout", remove_item: "Remove", item_added_to_cart: "Item added to cart!", product_desc_placeholder: "A fantastic product that you will surely love. High quality and built to last.", chat_header: "Customer Support", chat_greeting: "Hello! How can we help you today?", chat_placeholder: "Type your message...", footer_about: "Your one-stop shop for everything you need.", footer_useful_links: "Useful Links", footer_about_us: "About Us", footer_privacy: "Privacy Policy", footer_terms: "Terms & Conditions", footer_contact: "Contact", footer_social: "Follow Us", all_products: "All Products", },
            vi: { search_placeholder: "Tìm kiếm sản phẩm...", lang_button: "Ngôn ngữ", account_button: "Tài khoản", cart_button: "Giỏ hàng", login: "Đăng nhập", register: "Đăng ký", my_account: "Tài khoản của tôi", sell_product: "Bán sản phẩm", logout: "Đăng xuất", welcome_title: "Chào mừng đến với E-Commerce!", welcome_subtitle: "Nơi mua sắm lý tưởng cho mọi nhu cầu của bạn.", promo_title: "Đại Tiệc Giảm Giá Mùa Hè!", promo_subtitle: "Giảm giá tới 50% cho hàng ngàn sản phẩm. Đừng bỏ lỡ!", shop_now: "Mua Ngay", featured_categories: "Danh mục nổi bật", category_electronics: "Điện tử", category_fashion: "Thời trang", category_home: "Đồ gia dụng", category_books: "Sách", featured_products: "Sản phẩm nổi bật", quick_view: "Xem Nhanh", add_to_cart: "Thêm vào giỏ", your_cart: "Giỏ hàng của bạn", cart_empty: "Giỏ hàng của bạn đang trống.", continue_shopping: "Tiếp tục mua sắm", order_summary: "Tóm tắt đơn hàng", subtotal: "Tạm tính", checkout: "Tiến hành thanh toán", remove_item: "Xóa", item_added_to_cart: "Đã thêm sản phẩm vào giỏ hàng!", product_desc_placeholder: "Một sản phẩm tuyệt vời mà bạn chắc chắn sẽ yêu thích. Chất lượng cao và bền bỉ.", chat_header: "Hỗ trợ khách hàng", chat_greeting: "Xin chào! Chúng tôi có thể giúp gì cho bạn?", chat_placeholder: "Nhập tin nhắn của bạn...", footer_about: "Nơi mua sắm lý tưởng cho mọi nhu cầu của bạn.", footer_useful_links: "Liên kết hữu ích", footer_about_us: "Về chúng tôi", footer_privacy: "Chính sách bảo mật", footer_terms: "Điều khoản sử dụng", footer_contact: "Liên hệ", footer_social: "Theo dõi chúng tôi", all_products: "Tất cả sản phẩm", },
            zh: { search_placeholder: "搜索产品...", lang_button: "语言", account_button: "账户", cart_button: "购物车", login: "登录", register: "注册", my_account: "我的账户", sell_product: "销售产品", logout: "登出", welcome_title: "欢迎来到电子商务！", welcome_subtitle: "您所有需求的一站式商店。", promo_title: "夏季特卖盛会！", promo_subtitle: "数千种商品高达五折优惠。不要错过！", shop_now: "立即购买", featured_categories: "特色分类", category_electronics: "电子产品", category_fashion: "时尚", category_home: "家居用品", category_books: "图书", featured_products: "特色产品", quick_view: "快速查看", add_to_cart: "添加到购物车", your_cart: "您的购物车", cart_empty: "您的购物车是空的。", continue_shopping: "继续购物", order_summary: "订单摘要", subtotal: "小计", checkout: "去结算", remove_item: "移除", item_added_to_cart: "商品已添加到购物车！", product_desc_placeholder: "一款您肯定会喜欢的绝佳产品。高品质，经久耐用。", chat_header: "客户支持", chat_greeting: "你好！我们今天能为您提供什么帮助？", chat_placeholder: "输入您的消息...", footer_about: "您所有需求的一站式商店。", footer_useful_links: "有用链接", footer_about_us: "关于我们", footer_privacy: "隐私政策", footer_terms: "条款与条件", footer_contact: "联系我们", footer_social: "关注我们", all_products: "所有产品", }
        };
        const setLanguage = (lang) => { localStorage.setItem('language', lang); _applyTranslations(lang); };
        const _applyTranslations = (lang) => {
            if (!translations[lang]) lang = 'en';
            document.querySelectorAll('[data-translate]').forEach(el => { const key = el.dataset.translate; if (translations[lang][key]) el.innerText = translations[lang][key]; });
            document.querySelectorAll('[data-translate-placeholder]').forEach(el => { const key = el.dataset.translatePlaceholder; if (translations[lang][key]) el.placeholder = translations[lang][key]; });
            document.documentElement.lang = lang;
        };
        const init = () => { const savedLang = localStorage.getItem('language') || 'en'; setLanguage(savedLang); };
        const get = (key) => { const lang = localStorage.getItem('language') || 'en'; return translations[lang][key] || key; };
        return { setLanguage, init, get };
    })();
    
    const Products = (() => {
        const productData = [
            { id: 1, name: { en: 'Pro Smartphone', vi: 'Điện Thoại Pro', zh: '专业智能手机' }, price: 599.99, image: 'https://placehold.co/400x400/a78bfa/ffffff?text=Phone' },
            { id: 2, name: { en: 'Ultrabook Laptop', vi: 'Laptop Ultrabook', zh: '超极本' }, price: 1299.00, image: 'https://placehold.co/400x400/60a5fa/ffffff?text=Laptop' },
            { id: 3, name: { en: 'Wireless Headphones', vi: 'Tai Nghe Không Dây', zh: '无线耳机' }, price: 149.50, image: 'https://placehold.co/400x400/4ade80/ffffff?text=Headphones' },
            { id: 4, name: { en: 'Smartwatch X9', vi: 'Đồng Hồ Thông Minh X9', zh: '智能手表 X9' }, price: 299.99, image: 'https://placehold.co/400x400/fbbf24/ffffff?text=Watch' },
            { id: 5, name: { en: '4K Smart TV', vi: 'Smart TV 4K', zh: '4K智能电视' }, price: 899.00, image: 'https://placehold.co/400x400/f87171/ffffff?text=TV' },
            { id: 6, name: { en: 'Gaming Keyboard', vi: 'Bàn Phím Cơ', zh: '游戏键盘' }, price: 79.99, image: 'https://placehold.co/400x400/c084fc/ffffff?text=Keyboard' },
            { id: 7, name: { en: 'Running Shoes', vi: 'Giày Chạy Bộ', zh: '跑鞋' }, price: 89.99, image: 'https://placehold.co/400x400/34d399/ffffff?text=Shoes' },
            { id: 8, name: { en: 'Power Blender', vi: 'Máy Xay Sinh Tố', zh: '强力搅拌机' }, price: 59.99, image: 'https://placehold.co/400x400/9ca3af/ffffff?text=Blender' },
        ];
        const getById = (id) => productData.find(p => p.id === id);
        const getAll = () => productData;
        return { getById, getAll };
    })();
    
    const Cart = (() => {
        let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const save = () => { localStorage.setItem('cart', JSON.stringify(cartItems)); _render(); _updateCount(); };
        const add = (productId, quantity = 1) => { const existingItem = cartItems.find(item => item.id === productId); if (existingItem) existingItem.quantity += quantity; else cartItems.push({ id: productId, quantity }); save(); Toasts.show(Language.get('item_added_to_cart'), 'success'); };
        const remove = (productId) => { cartItems = cartItems.filter(item => item.id !== productId); save(); };
        const _updateCount = () => { const count = cartItems.reduce((sum, item) => sum + item.quantity, 0); document.getElementById('cart-count').innerText = count; };
        const _render = () => {
            const cartContentEl = document.getElementById('cart-content');
            if (!cartContentEl) return;
            if (cartItems.length === 0) {
                cartContentEl.innerHTML = `<div class="cart-empty-message"><i class="fas fa-shopping-cart text-5xl text-gray-300 mb-4"></i><p class="text-xl font-semibold text-gray-700">${Language.get('cart_empty')}</p><button class="mt-6 bg-indigo-600 text-white py-2 px-5 rounded-lg font-semibold button-hover-effect" onclick="showPage('productListingsPage')">${Language.get('continue_shopping')}</button></div>`;
                return;
            }
            let subtotal = 0;
            const lang = localStorage.getItem('language') || 'en';
            const itemsHtml = cartItems.map(item => {
                const product = Products.getById(item.id);
                if (!product) return '';
                const itemTotal = product.price * item.quantity;
                subtotal += itemTotal;
                return `<div class="flex items-center border-b border-gray-200 pb-4 mb-4"><img src="${product.image}" alt="${product.name[lang]}" class="w-24 h-24 object-cover rounded-lg mr-4"><div class="flex-grow"><h3 class="font-semibold text-lg text-gray-800">${product.name[lang]}</h3><p class="text-gray-600">$${product.price.toFixed(2)}</p><div class="flex items-center mt-2"><p class="text-gray-600">Qty: ${item.quantity}</p><button class="ml-4 text-red-500 hover:text-red-700 transition" onclick="Cart.remove(${item.id})"><i class="fas fa-trash-alt mr-1"></i> <span>${Language.get('remove_item')}</span></button></div></div><p class="font-bold text-lg text-indigo-600">$${itemTotal.toFixed(2)}</p></div>`;
            }).join('');
            cartContentEl.innerHTML = `<div class="flex flex-col lg:flex-row gap-8"><div class="lg:w-2/3">${itemsHtml}</div><div class="lg:w-1/3"><div class="bg-gray-50 p-6 rounded-lg shadow-inner sticky top-28"><h3 class="text-xl font-semibold text-gray-800 mb-4">${Language.get('order_summary')}</h3><div class="flex justify-between mb-4"><p class="text-gray-700">${Language.get('subtotal')}:</p><p class="font-medium text-gray-800">$${subtotal.toFixed(2)}</p></div><button class="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold mt-4 button-hover-effect">${Language.get('checkout')}</button></div></div></div>`;
        };
        const init = () => { _updateCount(); if (document.getElementById('cartPage')?.classList.contains('active')) _render(); };
        return { add, remove, init, render: _render };
    })();
    
    // --- CORRECTED UI CONTROLLER ---
    const UIController = (() => {
        const accountBtn = document.getElementById('accountBtn');
        const accountDropdown = document.getElementById('accountDropdown');
        const languageBtn = document.getElementById('languageBtn');
        const languageDropdown = document.getElementById('languageDropdown');

        const toggleDropdown = (dropdownToToggle, otherDropdown) => {
            if (!dropdownToToggle.classList.contains('active')) {
                otherDropdown?.classList.remove('active');
            }
            dropdownToToggle.classList.toggle('active');
        };

        accountBtn?.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleDropdown(accountDropdown, languageDropdown);
        });

        languageBtn?.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleDropdown(languageDropdown, accountDropdown);
        });

        document.addEventListener('click', () => {
            accountDropdown?.classList.remove('active');
            languageDropdown?.classList.remove('active');
        });

        accountDropdown?.addEventListener('click', (e) => e.stopPropagation());
        languageDropdown?.addEventListener('click', (e) => e.stopPropagation());

        const chatButton = document.getElementById('chatButton');
        const chatBox = document.getElementById('chatBox');
        chatButton?.addEventListener('click', (e) => {
            e.stopPropagation();
            chatBox.style.display = 'flex';
            chatButton.style.animation = 'none';
        });
        document.getElementById('closeChat')?.addEventListener('click', () => {
            chatBox.style.display = 'none';
            chatButton.style.animation = 'pulse 2.5s infinite';
        });

        window.toggleMobileSearch = () => document.getElementById('mobileSearchInput')?.classList.toggle('hidden');
    })();

    const Toasts = (() => {
        const showToast = (message, type = 'info') => {
            const container = document.getElementById('toast-container');
            if (!container) return;
            const toast = document.createElement('div');
            toast.className = `toast ${type}`;
            const icons = { success: 'fas fa-check-circle', error: 'fas fa-times-circle', info: 'fas fa-info-circle' };
            toast.innerHTML = `<i class="toast-icon ${icons[type]}"></i><span>${message}</span>`;
            container.appendChild(toast);
        };
        return { show: showToast };
    })();
    
    const QuickView = (() => {
        const modal = document.getElementById('quick-view-modal');
        const contentEl = document.getElementById('quick-view-content');
        const open = (productId) => {
            const product = Products.getById(productId);
            if (!product || !modal || !contentEl) return;
            const lang = localStorage.getItem('language') || 'en';
            contentEl.innerHTML = `<div class="md:w-1/2"><img src="${product.image.replace('400x400', '600x600')}" alt="${product.name[lang]}" class="w-full h-auto rounded-lg shadow-lg"></div><div class="md:w-1/2 flex flex-col"><h2 class="text-3xl font-bold text-gray-900 mb-2">${product.name[lang]}</h2><p class="text-2xl font-bold text-indigo-600 mb-4">$${product.price.toFixed(2)}</p><p class="text-gray-600 mb-6">${Language.get('product_desc_placeholder')}</p><div class="mt-auto"><button class="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 button-hover-effect" onclick="Cart.add(${product.id})"><i class="fas fa-shopping-cart mr-2"></i> ${Language.get('add_to_cart')}</button></div></div>`;
            modal.classList.add('active');
        };
        const close = () => modal?.classList.remove('active');
        document.getElementById('close-quick-view')?.addEventListener('click', close);
        modal?.addEventListener('click', (e) => { if (e.target === modal) close(); });
        return { open };
    })();

    const Animations = (() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
        }, { threshold: 0.1 });
        const init = () => document.querySelectorAll('[data-observe]').forEach(el => observer.observe(el));
        return { init };
    })();

    window.showPage = (pageId) => {
        document.querySelectorAll('.page-section').forEach(section => section.classList.remove('active'));
        const page = document.getElementById(pageId);
        if (page) {
            page.classList.add('active');
            Animations.init(); 
            if (pageId === 'cartPage') Cart.render();
        }
        window.scrollTo(0, 0);
    };

    window.setLanguage = (lang) => { Language.setLanguage(lang); renderAllProducts(); if (document.getElementById('cartPage')?.classList.contains('active')) Cart.render(); };
    window.Cart = Cart;
    window.QuickView = QuickView;
    window.showToast = Toasts.show;

    function renderAllProducts() {
        const featuredGrid = document.getElementById('featured-products-grid');
        const allGrid = document.getElementById('all-products-grid');
        if(!featuredGrid && !allGrid) return;

        const lang = localStorage.getItem('language') || 'en';
        const products = Products.getAll();
        const featuredHtml = products.slice(0, 4).map((product, index) => createProductCard(product, lang, index)).join('');
        const allHtml = products.map((product, index) => createProductCard(product, lang, index)).join('');
        
        if (featuredGrid) featuredGrid.innerHTML = featuredHtml;
        if (allGrid) allGrid.innerHTML = allHtml;
    }
    
    function createProductCard(product, lang, index) {
        return `<div data-observe class="bg-white rounded-lg shadow-md overflow-hidden card-hover-effect" style="transition-delay: ${index * 50}ms;">
            <div class="relative group">
                <img src="${product.image}" alt="${product.name[lang]}" class="w-full h-64 object-cover">
                <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                    <button class="text-white bg-indigo-600 px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300" onclick="QuickView.open(${product.id})">
                        ${Language.get('quick_view')}
                    </button>
                </div>
            </div>
            <div class="p-4 flex flex-col h-full">
                <h4 class="font-semibold text-lg mb-2 truncate">${product.name[lang]}</h4>
                <div class="flex-grow"></div>
                <p class="text-xl font-bold text-indigo-600 mb-4">$${product.price.toFixed(2)}</p>
                <button class="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 flex items-center justify-center button-hover-effect" onclick="Cart.add(${product.id})">
                    <i class="fas fa-shopping-cart mr-2"></i> ${Language.get('add_to_cart')}
                </button>
            </div>
        </div>`;
    }

    function initApp() {
        try {
            Language.init();
            renderAllProducts();
            Cart.init();
            Animations.init(); 
            showPage('homepage');
        } catch (error) {
            console.error("Application initialization error:", error);
        } finally {
            Preloader.hide();
        }
    }
    
    initApp();
});
