# COLLX: Card library prototype

This prototype was created via Expo for the sake of time efficiency. It uses Apollo GraphQL to query the public Pokemon TCG Cards Database API (https://tcgdex.dev/).

## Quick start

In the project directory, run `npm install`, then `npm run start` to start the packager. Follow the instructions on-screen - type "i" to run iOS simulator or "a" for Android simulator.

## Design considerations

### How to query for the data?

[...]

### Query full card data all at once, or query for deeper card details upon clicking into the individual card?

The former approach leads to a faster UI, since all the data would be preloaded on the card list screen and does not require an additional server call when viewing the card details screen. On the other hand, the latter approach leads to more accurate, up-to-date data, which may be important in the case of something like price data that can change frequently.

For the sake of convenience, this demo app goes with the second approach (query for individual card data) because React Router, the default navigation system for an Expo React Native app, discourages passing data objects between pages. In a "real" project, I personally prefer the React Navigation library where this is easier to do. Of course, in the end this is a UX discussion that should be held with product and design team.

### What format to use for the "Like" data?

Since the project requirement was that Likes only needed to be stored in local state, I aimed for a simple-as-possible format where the state contained an array of card IDs that the user has Liked, and removes the corresponding IDs if the user un-Likes them.

In a real-world app, this data would need to be persisted in local storage, along with other user data. Depending on the use cases of the app, it may be more useful to store the Likes as one field of an individual card object.

Of course, if we go with the server-side solution where a user's "likes" are persisted via mutations, then on the client-side it's much simpler :)

## Future todos

Since this is a proof of concept project, certain planned features have not been implemented:

-   Write a lot of unit tests for utility functions
-   Better dark mode color palette support... or just delete light mode :)
