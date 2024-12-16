# SAV.
React App with Search, and Pagination

Features
1.Google ReCAPTCHA Integration:
Users must verify using Google ReCAPTCHA before interacting with the app.

2.Client-Side Pagination:
Items are displayed with pagination, with 5 items shown per page. Users can navigate through pages using the "Next" and "Previous" buttons.

3.Search by Item Name:
Users can filter items based on their category. The app will dynamically update the displayed items based on the search input.

Optimization Details
1.Lazy Loading:
The app optimizes performance by implementing lazy loading for fetching mock data. This ensures that items are loaded only when the "Load Items" button is clicked, preventing unnecessary data fetching on initial page load.

2.Efficient State Management:
The app uses React hooks (useState and useEffect) to manage the state of items, search term, pagination, and ReCAPTCHA verification, ensuring minimal re-renders and efficient data flow.

3.SEO Optimization:
Since this is a client-side rendered app, SEO optimization is primarily dependent on the content displayed. The app uses meaningful HTML tags and avoids loading unnecessary data up front, improving performance. Pagination and dynamic content loading also ensure that only relevant data is rendered on the page.
Deployed Link-https://sav-com.vercel.app/
