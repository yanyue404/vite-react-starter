import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

// Bear Store (示例计数器)
export const useBearStore = create(
  devtools(
    (set) => ({
      bears: 0,
      increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
      decreasePopulation: () => set((state) => ({ bears: Math.max(0, state.bears - 1) })),
      removeAllBears: () => set({ bears: 0 }),
    }),
    { name: "BearStore" }
  )
);

// User Store (用户信息管理)
const defaultUserInfo = {
  id: "",
  name: "",
  phone: "",
  address: "",
};

export const useUserStore = create(
  devtools(
    persist(
      (set) => ({
        userInfo: null,
        isLoggedIn: false,
        setUserInfo: (userInfo) => set({ userInfo, isLoggedIn: true }),
        updateUserInfo: (partial) =>
          set((state) => ({
            userInfo: state.userInfo ? { ...state.userInfo, ...partial } : { ...defaultUserInfo, ...partial },
          })),
        clearUserInfo: () => set({ userInfo: null, isLoggedIn: false }),
        login: (userInfo) => set({ userInfo, isLoggedIn: true }),
        logout: () => set({ userInfo: null, isLoggedIn: false }),
      }),
      { name: "UserStore", storage: createJSONStorage(() => sessionStorage) }
    ),
    { name: "UserStore" }
  )
);

// Product Store (产品管理)
export const useProductStore = create(
  devtools(
    persist(
      (set, get) => ({
        products: [],
        selectedProduct: null,
        favorites: [],
        setProducts: (products) => set({ products }),
        addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
        removeProduct: (id) =>
          set((state) => ({
            products: state.products.filter((p) => p.id !== id),
            favorites: state.favorites.filter((fid) => fid !== id),
          })),
        selectProduct: (product) => set({ selectedProduct: product }),
        toggleFavorite: (id) =>
          set((state) => ({
            favorites: state.favorites.includes(id)
              ? state.favorites.filter((fid) => fid !== id)
              : [...state.favorites, id],
          })),
        isFavorite: (id) => get().favorites.includes(id),
      }),
      { name: "ProductStore", storage: createJSONStorage(() => sessionStorage) }
    ),
    { name: "ProductStore" }
  )
);

// App Store (应用全局状态)
export const useAppStore = create(
  devtools(
    persist(
      (set) => ({
        appState: {
          isLoading: false,
          theme: "light",
          language: "zh",
        },
        setLoading: (isLoading) => set((state) => ({ appState: { ...state.appState, isLoading } })),
        setTheme: (theme) => set((state) => ({ appState: { ...state.appState, theme } })),
        setLanguage: (language) => set((state) => ({ appState: { ...state.appState, language } })),
        toggleTheme: () =>
          set((state) => ({
            appState: {
              ...state.appState,
              theme: state.appState.theme === "light" ? "dark" : "light",
            },
          })),
      }),
      { name: "AppStore", storage: createJSONStorage(() => sessionStorage) }
    ),
    { name: "AppStore" }
  )
);
