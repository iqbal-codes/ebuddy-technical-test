## How to Determine potential users
### Action
1. Analyzed the data structure and Firestore's sorting capabilities
2. Developed a composite scoring algorithm to determine potential users that :
   - Converts ratings to 2-digit precision (e.g., 4.5 → 45)
   - Standardizes rental counts to 4 digits (e.g., 30 → 0030)
   - Appends activity timestamp (e.g., 1741703612)
   - the composite scoring value : 0.4300301741703612
3. Implemented score pre-calculation during user updates
4. Created a batch recalculation API for existing data if needed
5. Modified the query to use the pre-calculated scores
### Result
- Achieved precise user sorting with a single database query
- Successfully prioritized users with:
  - Higher ratings appearing first (4.5 > 4.3)
  - More rentals breaking rating ties
  - Recent activity as the final tiebreaker
- Improved query performance by eliminating the need for complex sorting logic
- Maintained scalability for large user bases

## How do you ensure that the 'recently active' field in a Firestore document remains updated?
I imagined that to update the `recently active` field in firestore document, Every time users are finish interacted with the app like not focusing on the web / logged out / closed the web, it will call the API `update-user-data/:id` and sent `recentlyActive` field by current epoch time data. also on FE Admin site, it will re-fetch the users data on every 30 seconds by using interval to make sure the data on the Admin site is up to date.

## Part 5: Personality & technical Questions

1. The Tabs & contents of settings page are not SSR, because when I try to disable javascript & reload the page, that components not
visible.
2. As the frontend engineer PIC for CrowdVer Tools, I was tasked with addressing a critical challenge: enabling field teams to conduct surveys of farmers' ponds in remote areas with limited or no internet connectivity. CrowdVer Tools is an essential app used to validate farmers' data, but the lack of reliable internet access was causing delays and inefficiencies in data collection and synchronization. To solve this, I led the transformation of the app into an offline-first solution using Progressive Web App (PWA) technology and data caching.
I began by researching offline-first approaches and determined that PWAs were the best fit due to their ability to function offline and cache data locally. I collaborated with the backend team to design a robust data synchronization mechanism that would handle conflicts and ensure data integrity. Using service workers, I enabled the app to load and operate without an internet connection, while IndexedDB was used to cache survey data on the user's device. I also developed a synchronization feature that automatically detects when the device reconnects to the internet and uploads the cached data to the server. To ensure reliability, I implemented error handling for scenarios like failed sync attempts or data conflicts.
After implementation, I conducted extensive testing in simulated offline environments and gathered feedback from field teams to identify and address edge cases. The result was a significant improvement in the app's usability and reliability. Field teams could now conduct surveys seamlessly in remote areas, and data synchronization worked flawlessly when connectivity was restored. This not only accelerated the data validation process but also enhanced the overall user experience, making CrowdVer Tools a more robust and dependable tool for the organization.
3. When I’m working on a project, I start by understanding the goals and requirements to ensure I’m aligned with the expectations. then I create a detailed plan, breaking the project into smaller tasks & setting priorities. I gather any necessary resources or information before diving into execution. During the process, I stay organized, communicate with my team, and adapt as needed to overcome challenges. Once the project is complete, I review my work, seek fedback, and ensure everything is delivered on time and to a high standard.
4. When I approach learning a new topic, I start by getting a broad overview to understand the basics. I then identify reliable resources, like online courses or expert recommendations, and break the topic into smaller, manageable parts. I focus on applying what I learn through hands-on practice or projects. Finally, I review and reflect on what I’ve learned to reinforce my understanding and identify areas for further exploration.
5. Fast & efficient
6. Macbook, iPad, iPhone, mac mini & apple watch
7. As soon as possible
