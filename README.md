#ССЫЛКА: https://peppy-genie-87a8fd.netlify.app/
# Что выполнено:

## 1 уровень (обязательный - необходимый минимум)

- [x] Реализованы **Требования к функциональности.**
- [x] Для хранения учетных записей пользователей, их Избранного и Истории поиска, используется **Firebase.**

### React

- [x] **Пишем функциональные компоненты c хуками** в приоритете над классовыми.
- [x] Есть разделение на **умные и глупые компоненты.**
      Умные: [Card](https://github.com/SalazarSDF/aston-react/blob/main/src/entities/card.tsx),
      Глупые: [FavoriteButton](https://github.com/SalazarSDF/aston-react/blob/main/src/entities/button-favorites.tsx)
- [x] Есть **рендеринг списков**. [CardsList](https://github.com/SalazarSDF/aston-react/blob/main/src/widgets/cards-list.tsx)
- [x] Реализована хотя бы одна **форма**. [SignUpForm](https://github.com/SalazarSDF/aston-react/blob/main/src/pages/sign-up-page.tsx)
- [x] Есть применение **Контекст API**. [ThemeContext](https://github.com/SalazarSDF/aston-react/blob/main/src/app/theme-context.tsx)
- [x] Есть применение **предохранителя**. ErrorBoundary в [Main](https://github.com/SalazarSDF/aston-react/blob/main/src/main.tsx)
- [x] Есть хотя бы один **кастомный хук**. [UseLocalStorage](https://github.com/SalazarSDF/aston-react/blob/main/src/shared/use-local-storage.ts)
- [x] Хотя бы несколько компонентов используют **PropTypes**. [Card](https://github.com/SalazarSDF/aston-react/blob/main/src/entities/card.tsx), [FavoriteCard](https://github.com/SalazarSDF/aston-react/blob/main/src/entities/favorite-card.tsx)
- [x] Поиск не должен триггерить много запросов к серверу (**debounce**). [SearchBar](https://github.com/SalazarSDF/aston-react/blob/main/src/entities/search-bar.tsx)
- [x] Есть применение **lazy + Suspense**. [RootRouter](https://github.com/SalazarSDF/aston-react/blob/main/src/app/index.tsx)

### Redux

- [x] Используем **Modern Redux with Redux Toolkit**. [store](https://github.com/SalazarSDF/aston-react/blob/main/src/app/store.ts)
- [x] Используем **слайсы**. [userSlice](https://github.com/SalazarSDF/aston-react/blob/main/src/features/users/userSlice.ts)
- [x] Есть хотя бы одна **кастомная мидлвара**. [logger](https://github.com/SalazarSDF/aston-react/blob/main/src/features/middleware-logger.ts)
- [x] Используется **RTK Query**. [apiSlice](https://github.com/SalazarSDF/aston-react/blob/main/src/app/apiSlice.ts)
- [x] Используется **Transforming Responses**. [apiSlice](https://github.com/SalazarSDF/aston-react/blob/main/src/app/apiSlice.ts)

## 2 Уровень (необязательный)

- [x] Использование **TypeScript**.
- [x] Использование **Firebase** для учетных записей пользователей и их Избранного и Истории поиска. [firebase](https://github.com/SalazarSDF/aston-react/blob/main/src/app/firebase.ts)
- [x] Настроен **CI/CD**.
