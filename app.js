        // Конфигурация Firebase (замените на свою)
        const firebaseConfig = {
            apiKey: "AIzaSyA1ZqxUUGBe3MPs_K8s0AFMarxNs17eq4w",
            authDomain: "message-95efa.firebaseapp.com",
            databaseURL: "https://message-95efa-default-rtdb.firebaseio.com",
            projectId: "message-95efa",
            storageBucket: "message-95efa.appspot.com",
            messagingSenderId: "490184598431",
            appId: "1:490184598431:web:77fb508fc5b8d2224b93aa",
            measurementId: "G-RLW63SGFXE"
        };

        // Инициализация Firebase
        firebase.initializeApp(firebaseConfig);
        const auth = firebase.auth();
        const database = firebase.database();
        const storage = firebase.storage();

        // DOM элементы
        const authScreen = document.getElementById('auth-screen');
        const messengerContainer = document.getElementById('messenger-container');
        const loginForm = document.getElementById('login-form');
        const registerForm = document.getElementById('register-form');
        const showRegister = document.getElementById('show-register');
        const showLogin = document.getElementById('show-login');
        const loginButton = document.getElementById('login-button');
        const registerButton = document.getElementById('register-button');
        const settingsModal = document.getElementById('settings-modal');
        const settingsButton = document.getElementById('settings-button');
        const closeModal = document.querySelector('.close-modal');
        const uploadAvatar = document.getElementById('upload-avatar');
        const removeAvatar = document.getElementById('remove-avatar');
        const avatarInput = document.getElementById('avatar-input');
        const saveProfileButton = document.getElementById('save-profile');
        const messageInput = document.getElementById('message-input');
        const sendButton = document.getElementById('send-button');
        const messagesContainer = document.getElementById('messages-container');
        const notification = document.getElementById('notification');
        const sidebar = document.getElementById('sidebar');
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const backButton = document.getElementById('back-button');
        const loadingMessages = document.getElementById('loading-messages');
        const chatMenuButton = document.getElementById('chat-menu-button');
        const chatMenu = document.getElementById('chat-menu');
        const emojiButton = document.getElementById('emoji-button');
        const emojiPicker = document.getElementById('emoji-picker');
        const emojiContainer = document.getElementById('emoji-container');
        const closeEmojiPicker = document.querySelector('.close-emoji-picker');
        const attachmentButton = document.getElementById('attachment-button');
        const attachmentMenu = document.getElementById('attachment-menu');
        const editUsername = document.getElementById('edit-username');
        const usernameCheck = document.getElementById('username-check');
        const usernameCheckText = document.getElementById('username-check-text');
        const editUsernameError = document.getElementById('edit-username-error');
        const callContainer = document.getElementById('call-container');
        const remoteVideo = document.getElementById('remote-video');
        const localVideo = document.getElementById('local-video');
        const callTitle = document.getElementById('call-title');
        const callStatus = document.getElementById('call-status');
        const muteButton = document.getElementById('mute-button');
        const videoToggle = document.getElementById('video-toggle');
        const screenShareButton = document.getElementById('screen-share');
        const endCallButton = document.getElementById('end-call');
        const voiceCallButton = document.getElementById('voice-call-button');
        const videoCallButton = document.getElementById('video-call-button');
        
        const chatInfoModal = document.getElementById('chat-info-modal');
        const chatMembersList = document.getElementById('chat-members');
        const chatMediaGrid = document.getElementById('chat-media');
        
        const chatSearchModal = document.getElementById('chat-search-modal');
        const chatSearchInput = document.getElementById('chat-search-input');
        const chatSearchResults = document.getElementById('chat-search-results');
        
        const chatNotificationsModal = document.getElementById('chat-notifications-modal');
        const notificationSetting = document.getElementById('notification-setting');
        const notificationSound = document.getElementById('notification-sound');
        
        const clearHistoryModal = document.getElementById('clear-history-modal');
        const confirmClearButton = document.getElementById('confirm-clear');
        const cancelClearButton = document.getElementById('cancel-clear');
        
        const fileUploadModal = document.getElementById('file-upload-modal');
        const uploadPhotoOption = document.getElementById('upload-photo');
        const uploadVideoOption = document.getElementById('upload-video');
        const uploadFileOption = document.getElementById('upload-file');
        const sendLocationOption = document.getElementById('send-location');
        const sendContactOption = document.getElementById('send-contact');
        const screenShareOption = document.getElementById('screen-share-option');
        const photoInputModal = document.getElementById('photo-input-modal');
        const videoInput = document.getElementById('video-input');
        const fileInputModal = document.getElementById('file-input-modal');
        
        const userSearchModal = document.getElementById('user-search-modal');
        const userSearchInput = document.getElementById('user-search-input');
        const userSearchResults = document.getElementById('user-search-results');
        
        const messageMenu = document.getElementById('message-menu');
        const deleteMessageButton = document.getElementById('delete-message');
        const deleteForEveryoneButton = document.getElementById('delete-for-everyone');
        const replyMessageButton = document.getElementById('reply-message');
        const forwardMessageButton = document.getElementById('forward-message');
        
        const logoutButton = document.getElementById('logout-button');
        const deleteAccountButton = document.getElementById('delete-account-button');
        const deleteAccountModal = document.getElementById('delete-account-modal');
        const confirmDeleteButton = document.getElementById('confirm-delete');
        const cancelDeleteButton = document.getElementById('cancel-delete');
        
        const accountButton = document.getElementById('account-button');
        const accountsMenu = document.getElementById('accounts-menu');
        const addAccountButton = document.getElementById('add-account');

        // Текущий пользователь и состояние приложения
        let currentUser = null;
        let currentChatId = 'general'; // ID текущего чата
        let isMobileView = window.innerWidth <= 768;
        let messagesListener = null;
        let localStream = null;
        let remoteStream = null;
        let peerConnection = null;
        let currentCall = null;
        let isMuted = false;
        let isVideoOff = false;
        let isScreenSharing = false;
        let selectedMessageId = null;
        let accounts = [];
        let currentAccountIndex = 0;

        // Инициализация приложения
        function init() {
            // Анимация элементов при загрузке
            animateElements();

            // Переключение между формами входа и регистрации
            showRegister.addEventListener('click', () => {
                loginForm.classList.add('hidden');
                registerForm.classList.remove('hidden');
                animateElements();
            });
            
            showLogin.addEventListener('click', () => {
                registerForm.classList.add('hidden');
                loginForm.classList.remove('hidden');
                animateElements();
            });
            
            // Обработчики кнопок
            loginButton.addEventListener('click', loginUser);
            registerButton.addEventListener('click', registerUser);
            settingsButton.addEventListener('click', openSettings);
            closeModal.addEventListener('click', closeSettings);
            uploadAvatar.addEventListener('click', () => avatarInput.click());
            removeAvatar.addEventListener('click', removeUserAvatar);
            avatarInput.addEventListener('change', uploadUserAvatar);
            saveProfileButton.addEventListener('click', saveProfile);
            sendButton.addEventListener('click', sendMessage);
            
            // Отправка сообщения по Enter
            messageInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                }
            });

            // Мобильное меню
            mobileMenuButton.addEventListener('click', toggleSidebar);
            backButton.addEventListener('click', toggleSidebar);

            // Закрытие модального окна при клике вне его
            settingsModal.addEventListener('click', (e) => {
                if (e.target === settingsModal) {
                    closeSettings();
                }
            });

            // Обработчики для меню чата, эмодзи и вложений
            chatMenuButton.addEventListener('click', toggleChatMenu);
            emojiButton.addEventListener('click', toggleEmojiPicker);
            closeEmojiPicker.addEventListener('click', toggleEmojiPicker);
            attachmentButton.addEventListener('click', toggleAttachmentMenu);
            
            // Закрытие меню при клике вне его
            document.addEventListener('click', (e) => {
                if (!chatMenu.contains(e.target) && e.target !== chatMenuButton) {
                    chatMenu.classList.remove('visible');
                }
                if (!emojiPicker.contains(e.target) && e.target !== emojiButton) {
                    emojiPicker.classList.remove('visible');
                }
                if (!attachmentMenu.contains(e.target) && e.target !== attachmentButton) {
                    attachmentMenu.classList.remove('visible');
                }
                if (!accountsMenu.contains(e.target) && e.target !== accountButton) {
                    accountsMenu.classList.remove('visible');
                }
            });

            // Проверка юзернейма при вводе
            editUsername.addEventListener('input', checkUsernameAvailability);
            
            // Инициализация эмодзи-пикера
            initEmojiPicker();

            // Обработчик изменения размера окна
            window.addEventListener('resize', handleResize);

            // Проверка состояния аутентификации
            auth.onAuthStateChanged(user => {
                if (user) {
                    currentUser = user;
                    loadUserProfile();
                    authScreen.classList.add('hidden');
                    messengerContainer.classList.remove('hidden');
                    loadChats();
                    loadMessages();
                    showNotification('Вы успешно вошли в систему', 'success');
                    
                    // Загружаем список аккаунтов
                    loadAccounts();
                } else {
                    currentUser = null;
                    authScreen.classList.remove('hidden');
                    messengerContainer.classList.add('hidden');
                    
                    // Останавливаем слушатель сообщений при выходе
                    if (messagesListener) {
                        messagesListener();
                        messagesListener = null;
                    }
                }
            });

            // Инициализация Service Worker для PWA
            if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                    navigator.serviceWorker.register('/sw.js').then(registration => {
                        console.log('ServiceWorker registration successful');
                    }).catch(err => {
                        console.log('ServiceWorker registration failed: ', err);
                    });
                });
            }

            // Добавляем новые обработчики для меню чата
            document.getElementById('chat-info-button').addEventListener('click', openChatInfo);
            document.getElementById('chat-search-button').addEventListener('click', openChatSearch);
            document.getElementById('chat-notifications-button').addEventListener('click', openChatNotifications);
            document.getElementById('clear-history-button').addEventListener('click', openClearHistory);
                    
            // Обработчики для звонков
            voiceCallButton.addEventListener('click', () => startCall(false));
            videoCallButton.addEventListener('click', () => startCall(true));
            muteButton.addEventListener('click', toggleMute);
            videoToggle.addEventListener('click', toggleVideo);
            screenShareButton.addEventListener('click', toggleScreenShare);
            endCallButton.addEventListener('click', endCall);
            
            // Обработчики для подтверждения очистки истории
            confirmClearButton.addEventListener('click', clearChatHistory);
            cancelClearButton.addEventListener('click', () => clearHistoryModal.classList.add('hidden'));
            
            // Обработчики для отправки файлов
            uploadPhotoOption.addEventListener('click', () => photoInputModal.click());
            uploadVideoOption.addEventListener('click', () => videoInput.click());
            uploadFileOption.addEventListener('click', () => fileInputModal.click());
            sendLocationOption.addEventListener('click', sendLocation);
            sendContactOption.addEventListener('click', sendContact);
            screenShareOption.addEventListener('click', startScreenShare);

            photoInputModal.addEventListener('change', handlePhotoUpload);
            videoInput.addEventListener('change', handleVideoUpload);
            fileInputModal.addEventListener('change', handleFileUpload);
            
            // Обработчики для поиска пользователей
            userSearchInput.addEventListener('input', searchUsers);
            
            // Обработчики для меню сообщений
            deleteMessageButton.addEventListener('click', deleteMessage);
            deleteForEveryoneButton.addEventListener('click', deleteMessageForEveryone);
            replyMessageButton.addEventListener('click', replyToMessage);
            forwardMessageButton.addEventListener('click', forwardMessage);
            
            // Обработчик клика по сообщению для контекстного меню
            messagesContainer.addEventListener('contextmenu', (e) => {
                const messageElement = e.target.closest('.message');
                if (messageElement) {
                    e.preventDefault();
                    showMessageMenu(messageElement, e.clientX, e.clientY);
                }
            });
            
            // Обработчики для управления аккаунтами
            logoutButton.addEventListener('click', logoutUser);
            deleteAccountButton.addEventListener('click', () => {
                deleteAccountModal.classList.remove('hidden');
                setTimeout(() => {
                    deleteAccountModal.classList.add('visible');
                }, 10);
            });
            
            confirmDeleteButton.addEventListener('click', deleteAccount);
            cancelDeleteButton.addEventListener('click', () => {
                deleteAccountModal.classList.remove('visible');
                setTimeout(() => {
                    deleteAccountModal.classList.add('hidden');
                }, 300);
            });
            
            accountButton.addEventListener('click', toggleAccountsMenu);
            addAccountButton.addEventListener('click', addAccount);
        }

        // Анимация элементов при загрузке
        function animateElements() {
            const elements = document.querySelectorAll('[data-animate]');
            elements.forEach(el => {
                setTimeout(() => {
                    el.classList.add('animate');
                }, 100);
            });
        }

        // Обработка изменения размера окна
        function handleResize() {
            isMobileView = window.innerWidth <= 768;
            if (!isMobileView && sidebar.classList.contains('visible')) {
                sidebar.classList.remove('visible');
            }
        }

        // Переключение боковой панели на мобильных устройствах
        function toggleSidebar() {
            if (isMobileView) {
                sidebar.classList.toggle('visible');
            }
        }

        // Переключение меню чата
        function toggleChatMenu(e) {
            e.stopPropagation();
            chatMenu.classList.toggle('visible');
            emojiPicker.classList.remove('visible');
            attachmentMenu.classList.remove('visible');
        }

        // Переключение эмодзи-пикера
        function toggleEmojiPicker(e) {
            e.stopPropagation();
            emojiPicker.classList.toggle('visible');
            chatMenu.classList.remove('visible');
            attachmentMenu.classList.remove('visible');
        }

        // Переключение меню вложений
        function toggleAttachmentMenu(e) {
            e.stopPropagation();
            attachmentMenu.classList.toggle('visible');
            chatMenu.classList.remove('visible');
            emojiPicker.classList.remove('visible');
        }

        // Переключение меню аккаунтов
        function toggleAccountsMenu(e) {
            e.stopPropagation();
            accountsMenu.classList.toggle('visible');
        }

        // Инициализация эмодзи-пикера
        function initEmojiPicker() {
            const emojis = {
                smileys: ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣', '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗', '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😬', '🙄', '😯', '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐', '🥴', '🤢', '🤮', '🤧', '😷', '🤒', '🤕', '🤑', '🤠'],
                animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐽', '🐸', '🐵', '🙈', '🙉', '🙊', '🐒', '🐔', '🐧', '🐦', '🐤', '🐣', '🐥', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', '🐝', '🐛', '🦋', '🐌', '🐞', '🐜', '🦟', '🦗', '🕷', '🦂', '🐢', '🐍', '🦎', '🦖', '🦕', '🐙', '🦑', '🦐', '🦞', '🦀', '🐡', '🐠', '🐟', '🐬', '🐳', '🐋', '🦈', '🐊', '🐅', '🐆', '🦓', '🦍', '🦧', '🐘', '🦛', '🦏', '🐪', '🐫', '🦒', '🦘', '🐃', '🐂', '🐄', '🐎', '🐖', '🐏', '🐑', '🦙', '🐐', '🦌', '🐕', '🐩', '🦮', '🐕‍🦺', '🐈', '🐓', '🦃', '🦚', '🦜', '🦢', '🦩', '🕊', '🐇', '🦝', '🦨', '🦡', '🦦', '🦥', '🐁', '🐀', '🐿', '🦔'],
                food: ['🍏', '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦', '🥬', '🥒', '🌶', '🫑', '🌽', '🥕', '🫒', '🧄', '🧅', '🥔', '🍠', '🥐', '🥯', '🍞', '🥖', '🥨', '🧀', '🥚', '🍳', '🧈', '🥞', '🧇', '🥓', '🥩', '🍗', '🍖', '🦴', '🌭', '🍔', '🍟', '🍕', '🫓', '🥪', '🥙', '🧆', '🌮', '🌯', '🫔', '🥗', '🥘', '🫕', '🥫', '🍝', '🍜', '🍲', '🍛', '🍣', '🍱', '🥟', '🦪', '🍤', '🍙', '🍚', '🍘', '🍥', '🥠', '🥮', '🍢', '🍡', '🍧', '🍨', '🍦', '🥧', '🧁', '🍰', '🎂', '🍮', '🍭', '🍬', '🍫', '🍿', '🍩', '🍪', '🌰', '🥜', '🍯'],
                activities: ['⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉', '🥏', '🎱', '🪀', '🏓', '🏸', '🏒', '🏑', '🥍', '🏏', '🪃', '🥅', '⛳', '🪁', '🏹', '🎣', '🤿', '🥊', '🥋', '🎽', '🛹', '🛼', '🛷', '⛸', '🥌', '🎯', '🪂', '🏋️', '🤼', '🤸', '⛹️', '🤺', '🤾', '🏌️', '🏇', '🧘', '🏄', '🏊', '🤽', '🚣', '🧗', '🚵', '🚴', '🏆', '🥇', '🥈', '🥉', '🏅', '🎖', '🏵', '🎗', '🎫', '🎟', '🎪', '🤹', '🎭', '🩰', '🎨', '🎬', '🎤', '🎧', '🎼', '🎹', '🥁', '🪘', '🎷', '🎺', '🪗', '🎸', '🪕', '🎻', '🎲', '♟', '🎯', '🎳', '🎮', '🎰'],
                objects: ['💡', '🔦', '🕯', '🪔', '🧯', '🛢', '💸', '💵', '💴', '💶', '💷', '💰', '💳', '💎', '⚖️', '🪜', '🧰', '🪛', '🔧', '🔨', '⚒', '🛠', '⛏', '🪚', '🔩', '⚙️', '🪤', '🧱', '⛓', '🧲', '🔫', '💣', '🧨', '🪓', '🔪', '🗡', '⚔️', '🛡', '🚬', '⚰️', '🪦', '⚱️', '🏺', '🔮', '📿', '🧿', '💈', '⚗️', '🔭', '🔬', '🕳', '🩹', '🩺', '💊', '💉', '🩸', '🧬', '🦠', '🧫', '🧪', '🌡', '🧹', '🪠', '🧺', '🧻', '🚽', '🪣', '🧼', '🪥', '🧽', '🧴', '🛎', '🔑', '🗝', '🚪', '🪑', '🛋', '🛏', '🛌', '🧸', '🖼', '🛍', '🛒', '🎁', '🎈', '🎏', '🎀', '🎊', '🎉', '🎎', '🏮', '🎐', '🧧', '✉️', '📩', '📨', '📧', '💌', '📥', '📤', '📦', '🏷', '📪', '📫', '📬', '📭', '📮', '📯', '📜', '📃', '📄', '📑', '🧾', '📊', '📈', '📉', '🗒', '🗓', '📆', '📅', '🗑', '📇', '🗃', '🗳', '🗄', '📋', '📁', '📂', '🗂', '🗞', '📰', '📓', '📔', '📒', '📕', '📗', '📘', '📙', '📚', '📖', '🔖', '🧷', '🔗', '📎', '🖇', '📐', '📏', '🧮', '📌', '📍', '✂️', '🖊', '🖋', '✒️', '🖌', '🖍', '📝', '✏️', '🔍', '🔎', '🔏', '🔐', '🔒', '🔓']
            };

            // Добавляем эмодзи в контейнер
            for (const category in emojis) {
                emojis[category].forEach(emoji => {
                    const emojiElement = document.createElement('div');
                    emojiElement.classList.add('emoji');
                    emojiElement.textContent = emoji;
                    emojiElement.addEventListener('click', () => {
                        messageInput.value += emoji;
                        messageInput.focus();
                    });
                    emojiContainer.appendChild(emojiElement);
                });
            }

            // Обработчики категорий эмодзи
            document.querySelectorAll('.emoji-category').forEach(category => {
                category.addEventListener('click', () => {
                    document.querySelector('.emoji-category.active').classList.remove('active');
                    category.classList.add('active');
                    // Здесь можно реализовать фильтрацию по категориям
                });
            });
        }

        // Показать уведомление
        function showNotification(message, type = 'success') {
            notification.textContent = message;
            notification.className = `notification ${type} hidden`;
            notification.classList.remove('hidden');
            notification.classList.add('show');
            
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    notification.classList.add('hidden');
                }, 300);
            }, 3000);
        }

        // Вход пользователя
        function loginUser() {
            const email = document.getElementById('login-email').value.trim();
            const password = document.getElementById('login-password').value.trim();
            
            // Валидация
            let isValid = true;
            document.getElementById('login-email-error').style.display = 'none';
            document.getElementById('login-password-error').style.display = 'none';
            
            if (!email) {
                document.getElementById('login-email-error').textContent = 'Введите email';
                document.getElementById('login-email-error').style.display = 'block';
                isValid = false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                document.getElementById('login-email-error').textContent = 'Введите корректный email';
                document.getElementById('login-email-error').style.display = 'block';
                isValid = false;
            }
            
            if (!password) {
                document.getElementById('login-password-error').textContent = 'Введите пароль';
                document.getElementById('login-password-error').style.display = 'block';
                isValid = false;
            } else if (password.length < 6) {
                document.getElementById('login-password-error').textContent = 'Пароль должен содержать не менее 6 символов';
                document.getElementById('login-password-error').style.display = 'block';
                isValid = false;
            }
            
            if (!isValid) return;
            
            // Показываем индикатор загрузки
            loginButton.innerHTML = 'Вход <span class="loader"></span>';
            loginButton.disabled = true;
            
            auth.signInWithEmailAndPassword(email, password)
                .then(() => {
                    // Успешный вход
                })
                .catch(error => {
                    // Обработка ошибок
                    let errorMessage = 'Ошибка входа';
                    switch (error.code) {
                        case 'auth/user-not-found':
                            errorMessage = 'Пользователь с таким email не найден';
                            document.getElementById('login-email-error').textContent = errorMessage;
                            document.getElementById('login-email-error').style.display = 'block';
                            break;
                        case 'auth/wrong-password':
                            errorMessage = 'Неверный пароль';
                            document.getElementById('login-password-error').textContent = errorMessage;
                            document.getElementById('login-password-error').style.display = 'block';
                            break;
                        case 'auth/too-many-requests':
                            errorMessage = 'Слишком много попыток входа. Попробуйте позже';
                            break;
                        default:
                            errorMessage = error.message;
                    }
                    showNotification(errorMessage, 'error');
                })
                .finally(() => {
                    loginButton.textContent = 'Войти';
                    loginButton.disabled = false;
                });
        }

        // Регистрация пользователя
        function registerUser() {
            const firstName = document.getElementById('register-firstname').value.trim();
            const lastName = document.getElementById('register-lastname').value.trim();
            const email = document.getElementById('register-email').value.trim();
            const password = document.getElementById('register-password').value.trim();
            
            // Валидация
            let isValid = true;
            document.getElementById('register-firstname-error').style.display = 'none';
            document.getElementById('register-lastname-error').style.display = 'none';
            document.getElementById('register-email-error').style.display = 'none';
            document.getElementById('register-password-error').style.display = 'none';
            
            if (!firstName) {
                document.getElementById('register-firstname-error').textContent = 'Введите имя';
                document.getElementById('register-firstname-error').style.display = 'block';
                isValid = false;
            }
            
            if (!lastName) {
                document.getElementById('register-lastname-error').textContent = 'Введите фамилию';
                document.getElementById('register-lastname-error').style.display = 'block';
                isValid = false;
            }
            
            if (!email) {
                document.getElementById('register-email-error').textContent = 'Введите email';
                document.getElementById('register-email-error').style.display = 'block';
                isValid = false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                document.getElementById('register-email-error').textContent = 'Введите корректный email';
                document.getElementById('register-email-error').style.display = 'block';
                isValid = false;
            }
            
            if (!password) {
                document.getElementById('register-password-error').textContent = 'Введите пароль';
                document.getElementById('register-password-error').style.display = 'block';
                isValid = false;
            } else if (password.length < 6) {
                document.getElementById('register-password-error').textContent = 'Пароль должен содержать не менее 6 символов';
                document.getElementById('register-password-error').style.display = 'block';
                isValid = false;
            }
            
            if (!isValid) return;
            
            // Показываем индикатор загрузки
            registerButton.innerHTML = 'Регистрация <span class="loader"></span>';
            registerButton.disabled = true;
            
            auth.createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    
                    // Сохраняем дополнительную информацию о пользователе
                    return database.ref('users/' + user.uid).set({
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        createdAt: firebase.database.ServerValue.TIMESTAMP,
                        lastSeen: firebase.database.ServerValue.TIMESTAMP,
                        status: 'online'
                    });
                })
                .then(() => {
                    showNotification('Регистрация прошла успешно!', 'success');
                    registerForm.classList.add('hidden');
                    loginForm.classList.remove('hidden');
                    animateElements();
                })
                .catch(error => {
                    let errorMessage = 'Ошибка регистрации';
                    switch (error.code) {
                        case 'auth/email-already-in-use':
                            errorMessage = 'Email уже используется';
                            document.getElementById('register-email-error').textContent = errorMessage;
                            document.getElementById('register-email-error').style.display = 'block';
                            break;
                        case 'auth/weak-password':
                            errorMessage = 'Пароль слишком слабый';
                            document.getElementById('register-password-error').textContent = errorMessage;
                            document.getElementById('register-password-error').style.display = 'block';
                            break;
                        default:
                            errorMessage = error.message;
                    }
                    showNotification(errorMessage, 'error');
                })
                .finally(() => {
                    registerButton.textContent = 'Зарегистрироваться';
                    registerButton.disabled = false;
                });
        }

        // Загрузка профиля пользователя
        function loadUserProfile() {
            database.ref('users/' + currentUser.uid).once('value')
                .then(snapshot => {
                    const userData = snapshot.val();
                    
                    if (userData) {
                        // Сохраняем данные пользователя
                        currentUser = {
                            ...currentUser,
                            ...userData
                        };
                        
                        // Обновляем UI
                        document.getElementById('username-sidebar').textContent = 
                            `${userData.firstName} ${userData.lastName}`;
                        
                        document.getElementById('edit-firstname').value = userData.firstName || '';
                        document.getElementById('edit-lastname').value = userData.lastName || '';
                        document.getElementById('edit-username').value = userData.username || '';
                        document.getElementById('edit-email').value = currentUser.email;
                        
                        // Аватар
                        updateAvatarUI(userData.avatarUrl, userData.firstName);
                        
                        // Обновляем статус
                        updateUserStatus(userData.status || 'online');
                    }
                });
        }

        // Обновление аватара в UI
        function updateAvatarUI(avatarUrl, firstName) {
            const avatarLetter = firstName ? firstName.charAt(0).toUpperCase() : 'U';
            const avatarElements = document.querySelectorAll('.user-avatar');
            
            avatarElements.forEach(element => {
                if (avatarUrl) {
                    element.style.backgroundImage = `url(${avatarUrl})`;
                    element.innerHTML = '';
                } else {
                    element.style.backgroundImage = '';
                    element.innerHTML = `<span>${avatarLetter}</span>`;
                    
                    // Генерируем цвет для аватарки на основе первой буквы
                    const colors = getComputedStyle(document.documentElement).getPropertyValue('--avatar-colors').split(', ');
                    const colorIndex = avatarLetter.charCodeAt(0) % colors.length;
                    element.style.backgroundColor = colors[colorIndex].trim();
                }
            });
        }

        // Проверка доступности юзернейма
        function checkUsernameAvailability() {
            const username = editUsername.value.trim().toLowerCase();
            
            if (!username) {
                usernameCheck.classList.add('hidden');
                return;
            }
            
            // Проверка формата юзернейма
            if (!/^[a-z0-9_]{3,20}$/.test(username)) {
                usernameCheck.classList.remove('hidden');
                usernameCheck.classList.remove('available');
                usernameCheck.classList.add('taken');
                usernameCheckText.textContent = 'Только латинские буквы, цифры и _ (3-20 символов)';
                return;
            }
            
            // Проверка в базе данных
            database.ref('usernames').once('value').then(snapshot => {
                const usernames = snapshot.val() || {};
                
                if (usernames[username] && usernames[username] !== currentUser.uid) {
                    usernameCheck.classList.remove('hidden');
                    usernameCheck.classList.remove('available');
                    usernameCheck.classList.add('taken');
                    usernameCheckText.textContent = 'Этот юзернейм уже занят';
                } else {
                    usernameCheck.classList.remove('hidden');
                    usernameCheck.classList.remove('taken');
                    usernameCheck.classList.add('available');
                    usernameCheckText.textContent = 'Этот юзернейм доступен';
                }
            });
        }

        // Обновление статуса пользователя
        function updateUserStatus(status) {
            const statusElement = document.getElementById('user-status');
            const statusIndicator = document.querySelector('.user-info small::before');
            
            if (status === 'online') {
                statusElement.textContent = 'online';
                statusElement.parentElement.classList.remove('offline');
            } else {
                statusElement.textContent = formatLastSeen(status);
                statusElement.parentElement.classList.add('offline');
            }
        }

        // Форматирование времени последнего посещения
        function formatLastSeen(timestamp) {
            if (!timestamp) return 'last seen recently';
            
            const now = Date.now();
            const lastSeen = new Date(timestamp);
            const diff = now - timestamp;
            
            if (diff < 60000) { // Менее минуты
                return 'last seen just now';
            } else if (diff < 3600000) { // Менее часа
                const minutes = Math.floor(diff / 60000);
                return `last seen ${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
            } else if (diff < 86400000) { // Менее суток
                const hours = Math.floor(diff / 3600000);
                return `last seen ${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
            } else {
                return `last seen at ${lastSeen.toLocaleDateString()}`;
            }
        }

        // Открытие настроек
        function openSettings() {
            settingsModal.classList.remove('hidden');
            setTimeout(() => {
                settingsModal.classList.add('visible');
            }, 10);
        }

        // Закрытие настроек
        function closeSettings() {
            settingsModal.classList.remove('visible');
            setTimeout(() => {
                settingsModal.classList.add('hidden');
            }, 300);
        }

        // Загрузка аватарки
        function uploadUserAvatar() {
            const file = avatarInput.files[0];
            if (!file) return;
            
            // Проверяем тип и размер файла
            if (!file.type.match('image.*')) {
                showNotification('Пожалуйста, выберите изображение', 'error');
                return;
            }
            
            if (file.size > 5 * 1024 * 1024) { // 5MB
                showNotification('Размер изображения не должен превышать 5MB', 'error');
                return;
            }
            
            // Показываем индикатор загрузки
            uploadAvatar.innerHTML = 'Загрузка <span class="loader"></span>';
            uploadAvatar.disabled = true;
            
            const storageRef = storage.ref(`avatars/${currentUser.uid}`);
            const uploadTask = storageRef.put(file);
            
            uploadTask.on('state_changed',
                null,
                error => {
                    showNotification('Ошибка загрузки аватара: ' + error.message, 'error');
                    uploadAvatar.textContent = 'Загрузить фото';
                    uploadAvatar.disabled = false;
                },
                () => {
                    uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                        // Сохраняем URL аватара в базе данных
                        database.ref('users/' + currentUser.uid).update({
                            avatarUrl: downloadURL
                        }).then(() => {
                            loadUserProfile();
                            showNotification('Аватар успешно обновлен', 'success');
                        }).catch(error => {
                            showNotification('Ошибка сохранения аватара: ' + error.message, 'error');
                        });
                    }).catch(error => {
                        showNotification('Ошибка получения URL аватара: ' + error.message, 'error');
                    }).finally(() => {
                        uploadAvatar.textContent = 'Загрузить фото';
                        uploadAvatar.disabled = false;
                    });
                }
            );
        }

        // Удаление аватарки
        function removeUserAvatar() {
            // Показываем индикатор загрузки
            removeAvatar.innerHTML = 'Удаление <span class="loader"></span>';
            removeAvatar.disabled = true;
            
            database.ref('users/' + currentUser.uid).update({
                avatarUrl: null
            }).then(() => {
                loadUserProfile();
                showNotification('Аватар удален', 'success');
            }).catch(error => {
                showNotification('Ошибка удаления аватара: ' + error.message, 'error');
            }).finally(() => {
                removeAvatar.textContent = 'Удалить фото';
                removeAvatar.disabled = false;
            });
        }

        // Сохранение профиля
        function saveProfile() {
            const firstName = document.getElementById('edit-firstname').value.trim();
            const lastName = document.getElementById('edit-lastname').value.trim();
            const username = document.getElementById('edit-username').value.trim().toLowerCase();
            
            // Валидация
            let isValid = true;
            document.getElementById('edit-firstname-error').style.display = 'none';
            document.getElementById('edit-lastname-error').style.display = 'none';
            editUsernameError.style.display = 'none';
            
            if (!firstName) {
                document.getElementById('edit-firstname-error').textContent = 'Введите имя';
                document.getElementById('edit-firstname-error').style.display = 'block';
                isValid = false;
            }
            
            if (!lastName) {
                document.getElementById('edit-lastname-error').textContent = 'Введите фамилию';
                document.getElementById('edit-lastname-error').style.display = 'block';
                isValid = false;
            }
            
            if (username && !/^[a-z0-9_]{3,20}$/.test(username)) {
                editUsernameError.textContent = 'Только латинские буквы, цифры и _ (3-20 символов)';
                editUsernameError.style.display = 'block';
                isValid = false;
            }
            
            if (!isValid) return;
            
            // Показываем индикатор загрузки
            saveProfileButton.innerHTML = 'Сохранение <span class="loader"></span>';
            saveProfileButton.disabled = true;
            
            // Проверяем, изменился ли юзернейм
            const updates = {
                firstName: firstName,
                lastName: lastName
            };
            
            if (username) {
                // Проверяем доступность юзернейма
                database.ref('usernames').once('value').then(snapshot => {
                    const usernames = snapshot.val() || {};
                    
                    if (usernames[username] && usernames[username] !== currentUser.uid) {
                        editUsernameError.textContent = 'Этот юзернейм уже занят';
                        editUsernameError.style.display = 'block';
                        saveProfileButton.textContent = 'Сохранить изменения';
                        saveProfileButton.disabled = false;
                        return;
                    }
                    
                    // Если юзернейм доступен, сохраняем
                    updates.username = username;
                    
                    // Обновляем ссылки на юзернейм
                    const usernameUpdates = {};
                    usernameUpdates[username] = currentUser.uid;
                    
                    // Удаляем старый юзернейм, если он был
                    if (currentUser.username) {
                        usernameUpdates[currentUser.username] = null;
                    }
                    
                    database.ref('usernames').update(usernameUpdates)
                        .then(() => {
                            return database.ref('users/' + currentUser.uid).update(updates);
                        })
                        .then(() => {
                            currentUser.username = username;
                            loadUserProfile();
                            closeSettings();
                            showNotification('Профиль успешно обновлен', 'success');
                        })
                        .catch(error => {
                            showNotification('Ошибка обновления профиля: ' + error.message, 'error');
                        })
                        .finally(() => {
                            saveProfileButton.textContent = 'Сохранить изменения';
                            saveProfileButton.disabled = false;
                        });
                });
            } else {
                // Если юзернейм не указан, просто сохраняем
                database.ref('users/' + currentUser.uid).update(updates)
                    .then(() => {
                        loadUserProfile();
                        closeSettings();
                        showNotification('Профиль успешно обновлен', 'success');
                    })
                    .catch(error => {
                        showNotification('Ошибка обновления профиля: ' + error.message, 'error');
                    })
                    .finally(() => {
                        saveProfileButton.textContent = 'Сохранить изменения';
                        saveProfileButton.disabled = false;
                    });
            }
        }

        // Загрузка чатов
        function loadChats() {
            // Здесь должна быть логика загрузки чатов из базы данных
            // Это упрощенный пример
            const chatsList = document.getElementById('chats-list');
            chatsList.innerHTML = `
                <div class="chat-item active">
                    <div class="user-avatar" style="background-color: #2196f3;">
                        <span>G</span>
                    </div>
                    <div class="chat-info">
                        <div class="chat-name">Общий чат</div>
                        <div class="last-message">Добро пожаловать в чат!</div>
                    </div>
                    <div class="chat-time">${formatTime(new Date())}</div>
                </div>
            `;
            
            // Добавляем обработчики событий для чатов
            const chatItems = chatsList.querySelectorAll('.chat-item');
            chatItems.forEach(item => {
                item.addEventListener('click', () => {
                    // Удаляем активный класс у всех чатов
                    chatItems.forEach(chat => chat.classList.remove('active'));
                    // Добавляем активный класс текущему чату
                    item.classList.add('active');
                    
                    // Загружаем сообщения для выбранного чата
                    const chatId = 'general'; // В реальном приложении нужно получать ID чата
                    if (chatId !== currentChatId) {
                        currentChatId = chatId;
                        loadMessages();
                    }
                });
            });
        }

        // Загрузка сообщений
        function loadMessages() {
            // Очищаем контейнер сообщений
            messagesContainer.innerHTML = '<div id="loading-messages" style="text-align: center; padding: 20px; color: var(--text-secondary);">Загрузка сообщений...</div>';
            
            // Останавливаем предыдущий слушатель, если он есть
            if (messagesListener) {
                messagesListener();
            }
            
            // Загружаем сообщения из базы данных
            messagesListener = database.ref('messages/' + currentChatId).orderByChild('timestamp').limitToLast(50).on('child_added', snapshot => {
                const message = snapshot.val();
                displayMessage(message, snapshot.key);
                
                // Скрываем индикатор загрузки после получения первого сообщения
                if (loadingMessages && loadingMessages.parentNode) {
                    loadingMessages.remove();
                }
            }, error => {
                showNotification('Ошибка загрузки сообщений: ' + error.message, 'error');
                if (loadingMessages) {
                    loadingMessages.textContent = 'Не удалось загрузить сообщения';
                }
            });
            
            // Прокручиваем вниз после загрузки сообщений
            setTimeout(() => {
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }, 100);
        }

        // Отображение сообщения
        function displayMessage(message, messageId) {
            const messageElement = document.createElement('div');
            messageElement.classList.add('message');
            messageElement.dataset.id = messageId;
            
            // Определяем, наше это сообщение или чужое
            if (message.userId === currentUser.uid) {
                messageElement.classList.add('message-outgoing');
            } else {
                messageElement.classList.add('message-incoming');
                
                // Для входящих сообщений добавляем имя отправителя
                if (message.senderName) {
                    const senderElement = document.createElement('div');
                    senderElement.classList.add('message-sender');
                    senderElement.textContent = message.senderName;
                    messageElement.appendChild(senderElement);
                }
            }
            
            // Форматируем время
            const time = new Date(message.timestamp);
            const timeString = formatTime(time);
            
            // Добавляем статус сообщения (только для исходящих)
            let statusIcon = '';
            if (message.userId === currentUser.uid) {
                statusIcon = message.read ? ' <i class="fas fa-check-double" style="color: var(--primary-color);"></i>' : ' <i class="fas fa-check"></i>';
            }
            
            // В зависимости от типа сообщения добавляем соответствующий контент
            let messageContent = '';
            switch (message.type) {
                case 'photo':
                    messageContent = `
                        <img src="${message.fileUrl}" class="message-media" alt="Фото">
                        <div class="message-time">${timeString}${statusIcon}</div>
                    `;
                    break;
                case 'video':
                    messageContent = `
                        <video src="${message.fileUrl}" class="message-media" controls></video>
                        <div class="message-time">${timeString}${statusIcon}</div>
                    `;
                    break;
                case 'file':
                    messageContent = `
                        <div class="message-file">
                            <i class="fas fa-file"></i>
                            <div class="message-file-info">
                                <div class="message-file-name">${message.fileName}</div>
                                <div class="message-file-size">${formatFileSize(message.fileSize)}</div>
                            </div>
                        </div>
                        <div class="message-time">${timeString}${statusIcon}</div>
                    `;
                    break;
                case 'location':
                    messageContent = `
                        <div class="message-location">
                            <div class="message-location-map"></div>
                            <div class="message-location-info">
                                <i class="fas fa-map-marker-alt"></i>
                                <span>Местоположение</span>
                            </div>
                        </div>
                        <div class="message-time">${timeString}${statusIcon}</div>
                    `;
                    break;
                case 'contact':
                    messageContent = `
                        <div class="message-contact">
                            <div class="message-contact-avatar">
                                ${message.contactName.charAt(0)}
                            </div>
                            <div class="message-contact-info">
                                <div class="message-contact-name">${message.contactName}</div>
                                <div class="message-contact-phone">${message.contactPhone}</div>
                            </div>
                        </div>
                        <div class="message-time">${timeString}${statusIcon}</div>
                    `;
                    break;
                default:
                    messageContent = `
                        <div class="message-text">${message.text}</div>
                        <div class="message-time">${timeString}${statusIcon}</div>
                    `;
            }
            
            messageElement.innerHTML += messageContent;
            messagesContainer.appendChild(messageElement);
            
            // Прокручиваем к новому сообщению
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }

        // Форматирование размера файла
        function formatFileSize(bytes) {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        }

        // Форматирование времени
        function formatTime(date) {
            return date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        }

        // Отправка сообщения
        function sendMessage() {
            const text = messageInput.value.trim();
            if (!text) return;
            
            // Показываем индикатор отправки
            sendButton.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i>';
            sendButton.disabled = true;
            
            const timestamp = Date.now();
            const message = {
                text: text,
                userId: currentUser.uid,
                senderName: `${currentUser.firstName} ${currentUser.lastName}`,
                timestamp: timestamp,
                read: false
            };
            
            // Сохраняем сообщение в базе данных
            database.ref('messages/' + currentChatId + '/' + timestamp).set(message)
                .then(() => {
                    messageInput.value = '';
                    
                    // Обновляем последнее сообщение в списке чатов
                    updateLastMessageInChat(currentChatId, text, timestamp);
                })
                .catch(error => {
                    showNotification('Ошибка отправки сообщения: ' + error.message, 'error');
                })
                .finally(() => {
                    sendButton.innerHTML = '<i class="fas fa-paper-plane"></i>';
                    sendButton.disabled = false;
                });
        }

        // Обновление последнего сообщения в списке чатов
        function updateLastMessageInChat(chatId, text, timestamp) {
            const chatRef = database.ref('chats/' + chatId);
            chatRef.update({
                lastMessage: text,
                lastMessageTime: timestamp
            }).catch(error => {
                console.error('Ошибка обновления чата:', error);
            });
        }

        // Функция для открытия информации о чате
        function openChatInfo() {
            loadChatMembers();
            loadChatMedia();
            chatInfoModal.classList.remove('hidden');
            setTimeout(() => {
                chatInfoModal.classList.add('visible');
            }, 10);
        }

        // Загрузка участников чата
        function loadChatMembers() {
            chatMembersList.innerHTML = '';
            
            // В реальном приложении нужно загружать участников чата из базы данных
            // Это упрощенный пример
            const members = [
                { id: 'user1', name: 'Валентин М.', username: 'valya', avatar: null, status: 'online' },
                { id: 'user2', name: 'Илья З.', username: 'ilya', avatar: null, status: 'last seen recently' }
            ];
            
            members.forEach(member => {
                const memberElement = document.createElement('div');
                memberElement.className = 'chat-info-member';
                
                memberElement.innerHTML = `
                    <div class="user-avatar small">
                        ${member.avatar ? '' : `<span>${member.name.charAt(0)}</span>`}
                    </div>
                    <div style="margin-left: 10px;">
                        <div>${member.name}</div>
                        <small>@${member.username} • ${member.status}</small>
                    </div>
                `;
                
                if (member.avatar) {
                    memberElement.querySelector('.user-avatar').style.backgroundImage = `url(${member.avatar})`;
                } else {
                    // Устанавливаем цвет аватарки
                    const colors = getComputedStyle(document.documentElement).getPropertyValue('--avatar-colors').split(', ');
                    const colorIndex = member.name.charCodeAt(0) % colors.length;
                    memberElement.querySelector('.user-avatar').style.backgroundColor = colors[colorIndex].trim();
                }
                
                chatMembersList.appendChild(memberElement);
            });
        }

        // Загрузка медиафайлов чата
        function loadChatMedia() {
            chatMediaGrid.innerHTML = '';
            
            // В реальном приложении нужно загружать медиафайлы из базы данных
            // Это упрощенный пример
            const media = [
                { type: 'photo', url: 'https://avatars.mds.yandex.net/get-entity_search/5542822/1175907648/S600xU_2x', timestamp: Date.now() },
                { type: 'photo', url: 'https://avatars.mds.yandex.net/get-entity_search/42097/1177706188/S600xU_2x', timestamp: Date.now() },
                { type: 'photo', url: 'https://cdn.culture.ru/images/2a07ad0f-6639-5f11-8d7f-01cc58816365', timestamp: Date.now() },
                { type: 'photo', url: 'https://pic.rutubelist.ru/userappearance/2e/53/2e532b918cdfceb88bff6cf313f22ef7.jpeg', timestamp: Date.now() },
                { type: 'photo', url: 'https://invest.tatarstan.ru/upload/medialibrary/3b6/naberezhnaya-rs.jpg', timestamp: Date.now() },
                { type: 'photo', url: 'https://prorus.ru/_/manager/files/5c9/8d22a8647e/7.jpg', timestamp: Date.now() }
            ];
            
            media.forEach(item => {
                const mediaItem = document.createElement('div');
                mediaItem.className = 'chat-media-item';
                mediaItem.innerHTML = `<img src="${item.url}" alt="Медиа">`;
                chatMediaGrid.appendChild(mediaItem);
            });
        }

        // Функция для открытия поиска в чате
        function openChatSearch() {
            chatSearchModal.classList.remove('hidden');
            setTimeout(() => {
                chatSearchModal.classList.add('visible');
                chatSearchInput.focus();
            }, 10);
        }

        // Функция для поиска сообщений в чате
        function searchChatMessages() {
            const query = chatSearchInput.value.trim().toLowerCase();
            if (!query) {
                chatSearchResults.innerHTML = '<div class="no-results">Введите поисковый запрос</div>';
                return;
            }
            
            // В реальном приложении нужно искать сообщения в базе данных
            // Это упрощенный пример
            database.ref('messages/' + currentChatId).once('value').then(snapshot => {
                const messages = snapshot.val() || {};
                chatSearchResults.innerHTML = '';
                
                Object.keys(messages).forEach(key => {
                    const message = messages[key];
                    if (message.text && message.text.toLowerCase().includes(query)) {
                        const searchResult = document.createElement('div');
                        searchResult.className = 'search-message';
                        searchResult.innerHTML = `
                            <div class="search-message-text">${message.text}</div>
                            <div class="search-message-info">
                                <span>${message.senderName}</span>
                                <span>${formatTime(new Date(message.timestamp))}</span>
                            </div>
                        `;
                        chatSearchResults.appendChild(searchResult);
                    }
                });
                
                if (chatSearchResults.children.length === 0) {
                    chatSearchResults.innerHTML = '<div class="no-results">Сообщения не найдены</div>';
                }
            });
        }

        // Функция для открытия настроек уведомлений чата
        function openChatNotifications() {
            chatNotificationsModal.classList.remove('hidden');
            setTimeout(() => {
                chatNotificationsModal.classList.add('visible');
            }, 10);
        }

        // Функция для открытия подтверждения очистки истории
        function openClearHistory() {
            clearHistoryModal.classList.remove('hidden');
            setTimeout(() => {
                clearHistoryModal.classList.add('visible');
            }, 10);
        }

        // Функция для очистки истории чата
        function clearChatHistory() {
            // В реальном приложении нужно удалять сообщения из базы данных
            database.ref('messages/' + currentChatId).remove()
                .then(() => {
                    showNotification('История чата очищена', 'success');
                    clearHistoryModal.classList.add('hidden');
                    messagesContainer.innerHTML = '<div class="no-messages">Нет сообщений</div>';
                })
                .catch(error => {
                    showNotification('Ошибка при очистке истории: ' + error.message, 'error');
                });
        }

        // Функция для начала звонка
        function startCall(withVideo) {
            // В реальном приложении нужно использовать WebRTC для звонков
            // Это упрощенный пример
            
            callTitle.textContent = 'Звонок...';
            callStatus.textContent = 'Установка соединения';
            callContainer.classList.remove('hidden');
            
            // Запрашиваем разрешение на доступ к камере и микрофону
            navigator.mediaDevices.getUserMedia({
                audio: true,
                video: withVideo
            }).then(stream => {
                localStream = stream;
                localVideo.srcObject = stream;
                
                if (withVideo) {
                    localVideo.classList.remove('hidden');
                }
                
                // Имитируем установку соединения
                setTimeout(() => {
                    callTitle.textContent = 'Иван Иванов';
                    callStatus.textContent = '00:05';
                    
                    // Имитируем получение видео собеседника
                    setTimeout(() => {
                        remoteVideo.srcObject = localStream.clone();
                    }, 1000);
                }, 2000);
                
                currentCall = {
                    id: Date.now().toString(),
                    withVideo: withVideo,
                    startedAt: new Date()
                };
            }).catch(error => {
                showNotification('Ошибка доступа к камере/микрофону: ' + error.message, 'error');
                endCall();
            });
        }

        // Функция для завершения звонка
        function endCall() {
            if (localStream) {
                localStream.getTracks().forEach(track => track.stop());
                localStream = null;
            }
            
            if (remoteStream) {
                remoteStream.getTracks().forEach(track => track.stop());
                remoteStream = null;
            }
            
            localVideo.srcObject = null;
            remoteVideo.srcObject = null;
            
            callContainer.classList.add('hidden');
            currentCall = null;
        }

        // Функция для отключения/включения микрофона
        function toggleMute() {
            if (!localStream) return;
            
            isMuted = !isMuted;
            localStream.getAudioTracks().forEach(track => {
                track.enabled = !isMuted;
            });
            
            muteButton.innerHTML = isMuted ? '<i class="fas fa-microphone-slash"></i>' : '<i class="fas fa-microphone"></i>';
        }

        // Функция для отключения/включения видео
        function toggleVideo() {
            if (!localStream) return;
            
            isVideoOff = !isVideoOff;
            localStream.getVideoTracks().forEach(track => {
                track.enabled = !isVideoOff;
            });
            
            videoToggle.innerHTML = isVideoOff ? '<i class="fas fa-video-slash"></i>' : '<i class="fas fa-video"></i>';
        }

        // Функция для демонстрации экрана
        function toggleScreenShare() {
            if (isScreenSharing) {
                stopScreenShare();
            } else {
                startScreenShare();
            }
        }

        // Функция для начала демонстрации экрана
        function startScreenShare() {
            navigator.mediaDevices.getDisplayMedia({ video: true })
                .then(stream => {
                    // Останавливаем предыдущие видео треки
                    localStream.getVideoTracks().forEach(track => track.stop());
                    
                    // Добавляем новый видео трек с экрана
                    const screenTrack = stream.getVideoTracks()[0];
                    localStream.addTrack(screenTrack);
                    
                    isScreenSharing = true;
                    screenShareButton.innerHTML = '<i class="fas fa-stop"></i>';
                    
                    // Обработчик завершения демонстрации экрана
                    screenTrack.onended = () => {
                        stopScreenShare();
                    };
                })
                .catch(error => {
                    showNotification('Ошибка демонстрации экрана: ' + error.message, 'error');
                });
        }

        // Функция для остановки демонстрации экрана
        function stopScreenShare() {
            if (!localStream) return;
            
            // Останавливаем трек экрана
            const screenTrack = localStream.getVideoTracks().find(track => track.kind === 'video');
            if (screenTrack) {
                screenTrack.stop();
                localStream.removeTrack(screenTrack);
            }
            
            // Включаем камеру, если была отключена
            if (!isVideoOff) {
                navigator.mediaDevices.getUserMedia({ video: true })
                    .then(stream => {
                        const videoTrack = stream.getVideoTracks()[0];
                        localStream.addTrack(videoTrack);
                        localVideo.srcObject = localStream;
                    });
            }
            
            isScreenSharing = false;
            screenShareButton.innerHTML = '<i class="fas fa-desktop"></i>';
        }

        // Функция для отправки фото
        function handlePhotoUpload(e) {
            const files = e.target.files;
            if (!files || files.length === 0) return;
            
            Array.from(files).forEach(file => {
                if (!file.type.match('image.*') && !file.type.match('video.*')) {
                    showNotification('Пожалуйста, выберите изображение или видео', 'error');
                    return;
                }
                
                if (file.size > 10 * 1024 * 1024) { // 10MB
                    showNotification('Размер файла не должен превышать 10MB', 'error');
                    return;
                }
                
                uploadFile(file, file.type.match('image.*') ? 'photo' : 'video');
            });
        }

        // Функция для отправки видео
        function handleVideoUpload(e) {
            const files = e.target.files;
            if (!files || files.length === 0) return;
            
            Array.from(files).forEach(file => {
                if (!file.type.match('video.*')) {
                    showNotification('Пожалуйста, выберите видео', 'error');
                    return;
                }
                
                if (file.size > 50 * 1024 * 1024) { // 50MB
                    showNotification('Размер видео не должен превышать 50MB', 'error');
                    return;
                }
                
                uploadFile(file, 'video');
            });
        }

        // Функция для отправки файла
        function handleFileUpload(e) {
            const files = e.target.files;
            if (!files || files.length === 0) return;
            
            Array.from(files).forEach(file => {
                if (file.size > 100 * 1024 * 1024) { // 100MB
                    showNotification('Размер файла не должен превышать 100MB', 'error');
                    return;
                }
                
                uploadFile(file, 'file');
            });
        }

        // Общая функция для загрузки файлов
        function uploadFile(file, type) {
            const timestamp = Date.now();
            const filePath = `files/${currentUser.uid}/${timestamp}_${file.name}`;
            const storageRef = storage.ref(filePath);
            const uploadTask = storageRef.put(file);
            
            // Показываем индикатор загрузки
            showNotification(`Загрузка ${type === 'photo' ? 'фото' : type === 'video' ? 'видео' : 'файла'}...`, 'info');
            
            uploadTask.on('state_changed',
                null,
                error => {
                    showNotification(`Ошибка загрузки ${type === 'photo' ? 'фото' : type === 'video' ? 'видео' : 'файла'}: ${error.message}`, 'error');
                },
                () => {
                    uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                        // Сохраняем сообщение с файлом
                        const message = {
                            type: type,
                            fileUrl: downloadURL,
                            fileName: file.name,
                            fileSize: file.size,
                            userId: currentUser.uid,
                            senderName: `${currentUser.firstName} ${currentUser.lastName}`,
                            timestamp: timestamp,
                            read: false
                        };
                        
                        database.ref('messages/' + currentChatId + '/' + timestamp).set(message)
                            .then(() => {
                                showNotification(`${type === 'photo' ? 'Фото' : type === 'video' ? 'Видео' : 'Файл'} отправлено`, 'success');
                                fileUploadModal.classList.add('hidden');
                            })
                            .catch(error => {
                                showNotification(`Ошибка отправки ${type === 'photo' ? 'фото' : type === 'video' ? 'видео' : 'файла'}: ${error.message}`, 'error');
                            });
                    });
                }
            );
        }

        // Функция для отправки местоположения
        function sendLocation() {
            if (!navigator.geolocation) {
                showNotification('Геолокация не поддерживается вашим браузером', 'error');
                return;
            }
            
            // Показываем индикатор загрузки
            showNotification('Определение местоположения...', 'info');
            
            navigator.geolocation.getCurrentPosition(
                position => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    
                    const timestamp = Date.now();
                    const message = {
                        type: 'location',
                        latitude: latitude,
                        longitude: longitude,
                        userId: currentUser.uid,
                        senderName: `${currentUser.firstName} ${currentUser.lastName}`,
                        timestamp: timestamp,
                        read: false
                    };
                    
                    database.ref('messages/' + currentChatId + '/' + timestamp).set(message)
                        .then(() => {
                            showNotification('Местоположение отправлено', 'success');
                            fileUploadModal.classList.add('hidden');
                        })
                        .catch(error => {
                            showNotification('Ошибка отправки местоположения: ' + error.message, 'error');
                        });
                },
                error => {
                    showNotification('Ошибка получения местоположения: ' + error.message, 'error');
                },
                { enableHighAccuracy: true }
            );
        }

        // Функция для отправки контакта
        function sendContact() {
            // В реальном приложении нужно выбрать контакт из списка
            // Это упрощенный пример
            const contact = {
                name: 'Иван Иванов',
                phone: '+7 (123) 456-78-90'
            };
            
            const timestamp = Date.now();
            const message = {
                type: 'contact',
                contactName: contact.name,
                contactPhone: contact.phone,
                userId: currentUser.uid,
                senderName: `${currentUser.firstName} ${currentUser.lastName}`,
                timestamp: timestamp,
                read: false
            };
            
            database.ref('messages/' + currentChatId + '/' + timestamp).set(message)
                .then(() => {
                    showNotification('Контакт отправлен', 'success');
                    fileUploadModal.classList.add('hidden');
                })
                .catch(error => {
                    showNotification('Ошибка отправки контакта: ' + error.message, 'error');
                });
        }

        // Функция для поиска пользователей
        function searchUsers() {
            const query = userSearchInput.value.trim().toLowerCase();
            if (!query) {
                userSearchResults.innerHTML = '';
                return;
            }
            
            // В реальном приложении нужно искать пользователей в базе данных
            database.ref('users').once('value').then(snapshot => {
                const users = snapshot.val() || {};
                userSearchResults.innerHTML = '';
                
                Object.keys(users).forEach(userId => {
                    const user = users[userId];
                    if (user.username && user.username.toLowerCase().includes(query)) {
                        const userElement = document.createElement('div');
                        userElement.className = 'user-search-result';
                        
                        userElement.innerHTML = `
                            <div class="user-avatar small">
                                ${user.avatarUrl ? '' : `<span>${user.firstName ? user.firstName.charAt(0) : 'U'}</span>`}
                            </div>
                            <div style="margin-left: 10px;">
                                <div>${user.firstName} ${user.lastName}</div>
                                <small>@${user.username}</small>
                            </div>
                        `;
                        
                        if (user.avatarUrl) {
                            userElement.querySelector('.user-avatar').style.backgroundImage = `url(${user.avatarUrl})`;
                        } else {
                            // Устанавливаем цвет аватарки
                            const colors = getComputedStyle(document.documentElement).getPropertyValue('--avatar-colors').split(', ');
                            const colorIndex = (user.firstName || 'User').charCodeAt(0) % colors.length;
                            userElement.querySelector('.user-avatar').style.backgroundColor = colors[colorIndex].trim();
                        }
                        
                        userElement.addEventListener('click', () => {
                            // В реальном приложении нужно открыть чат с этим пользователем
                            showNotification(`Открыть чат с @${user.username}`, 'info');
                            userSearchModal.classList.add('hidden');
                        });
                        
                        userSearchResults.appendChild(userElement);
                    }
                });
                
                if (userSearchResults.children.length === 0) {
                    userSearchResults.innerHTML = '<div class="no-results">Пользователи не найдены</div>';
                }
            });
        }

        // Функция для показа меню сообщения
        function showMessageMenu(messageElement, x, y) {
            selectedMessageId = messageElement.dataset.id;
            
            // Позиционируем меню
            messageMenu.style.left = `${x}px`;
            messageMenu.style.top = `${y}px`;
            
            // Показываем меню
            messageMenu.classList.remove('hidden');
        }

        // Функция для удаления сообщения (только для себя)
        function deleteMessage() {
            if (!selectedMessageId) return;
            
            database.ref('messages/' + currentChatId + '/' + selectedMessageId).remove()
                .then(() => {
                    showNotification('Сообщение удалено', 'success');
                    messageMenu.classList.add('hidden');
                })
                .catch(error => {
                    showNotification('Ошибка удаления сообщения: ' + error.message, 'error');
                });
        }

        // Функция для удаления сообщения у всех
        function deleteMessageForEveryone() {
            if (!selectedMessageId) return;
            
            database.ref('messages/' + currentChatId + '/' + selectedMessageId).remove()
                .then(() => {
                    showNotification('Сообщение удалено у всех участников', 'success');
                    messageMenu.classList.add('hidden');
                })
                .catch(error => {
                    showNotification('Ошибка удаления сообщения: ' + error.message, 'error');
                });
        }

        // Функция для ответа на сообщение
        function replyToMessage() {
            if (!selectedMessageId) return;
            
            // В реальном приложении нужно реализовать логику ответа
            showNotification('Функция ответа на сообщение', 'info');
            messageMenu.classList.add('hidden');
        }

        // Функция для пересылки сообщения
        function forwardMessage() {
            if (!selectedMessageId) return;
            
            // В реальном приложении нужно реализовать логику пересылки
            showNotification('Функция пересылки сообщения', 'info');
            messageMenu.classList.add('hidden');
        }

        // Функция для выхода из аккаунта
        function logoutUser() {
            auth.signOut().then(() => {
                showNotification('Вы успешно вышли из системы', 'success');
                closeSettings();
            }).catch(error => {
                showNotification('Ошибка при выходе из системы: ' + error.message, 'error');
            });
        }

        // Функция для удаления аккаунта
        function deleteAccount() {
            // Показываем индикатор загрузки
            confirmDeleteButton.innerHTML = 'Удаление <span class="loader"></span>';
            confirmDeleteButton.disabled = true;
            
            // Удаляем пользователя из Firebase Authentication
            currentUser.delete().then(() => {
                // Удаляем данные пользователя из базы данных
                return database.ref('users/' + currentUser.uid).remove();
            }).then(() => {
                showNotification('Аккаунт успешно удален', 'success');
                deleteAccountModal.classList.add('hidden');
            }).catch(error => {
                showNotification('Ошибка удаления аккаунта: ' + error.message, 'error');
            }).finally(() => {
                confirmDeleteButton.textContent = 'Удалить';
                confirmDeleteButton.disabled = false;
            });
        }

        // Функция для загрузки списка аккаунтов
        function loadAccounts() {
            accountsMenu.innerHTML = '';
            
            // В реальном приложении нужно загружать аккаунты из локального хранилища
            // Это упрощенный пример
            accounts = [
                { email: currentUser.email, firstName: currentUser.firstName, lastName: currentUser.lastName, avatarUrl: currentUser.avatarUrl }
            ];
            
            accounts.forEach((account, index) => {
                const accountItem = document.createElement('div');
                accountItem.className = 'account-item';
                accountItem.innerHTML = `
                    <div class="account-item-avatar" style="${account.avatarUrl ? `background-image: url(${account.avatarUrl})` : ''}">
                        ${account.avatarUrl ? '' : `<span>${account.firstName.charAt(0)}</span>`}
                    </div>
                    <div class="account-item-name">${account.firstName} ${account.lastName}</div>
                `;
                
                if (index === currentAccountIndex) {
                    accountItem.innerHTML += '<i class="fas fa-check"></i>';
                }
                
                accountItem.addEventListener('click', () => {
                    switchAccount(index);
                });
                
                accountsMenu.appendChild(accountItem);
            });
            
            // Добавляем кнопку для добавления нового аккаунта
            accountsMenu.appendChild(addAccountButton.cloneNode(true));
        }

        // Функция для переключения между аккаунтами
        function switchAccount(index) {
            if (index === currentAccountIndex) return;
            
            // В реальном приложении нужно реализовать переключение между аккаунтами
            showNotification('Переключение на аккаунт ' + accounts[index].email, 'info');
            currentAccountIndex = index;
            accountsMenu.classList.remove('visible');
        }

        // Функция для добавления нового аккаунта
        function addAccount() {
            if (accounts.length >= 2) {
                showNotification('Можно добавить только 2 аккаунта', 'error');
                return;
            }
            
            // В реальном приложении нужно реализовать добавление нового аккаунта
            showNotification('Добавление нового аккаунта', 'info');
            accountsMenu.classList.remove('visible');
        }

        // Запуск приложения
        window.addEventListener('DOMContentLoaded', init);

        // Добавляем эффект ripple для всех кнопок с классом ripple
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('ripple') || e.target.closest('.ripple')) {
                const button = e.target.classList.contains('ripple') ? e.target : e.target.closest('.ripple');
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const ripple = document.createElement('span');
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                ripple.classList.add('ripple-effect');
                
                button.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            }
        });

        // Добавляем стиль для ripple эффекта
        const rippleStyle = document.createElement('style');
        rippleStyle.textContent = `
            .ripple-effect {
                position: absolute;
                border-radius: 50%;
                background-color: rgba(255, 255, 255, 0.7);
                transform: scale(0);
                animation: ripple 0.6s ease;
                pointer-events: none;
            }
            
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(rippleStyle);
