<!--
<p align='center'>
    <img src='./img/logo_sq.png' width=600/>
</p> -->

## CheckoutFS

Create instant checkout pages for your business or service hosted on IPFS.

Built for the HackFS 2021 hackathon.

### Features

- Discover existing catalogs and menus
- Upload images and descriptions for the catalog
- Show sharable product page hosted on IPFS
- Integrated pricing and checkout
- Create a new wallet to support payments to help new businesses adopt and receive cryptocurrency payments.
- IPFS powered receipts and transaction record keeping

### Inspiration

Pain points:

- To create a hosted product catalog, usually you'd need to pay a hosted provider like squarespace or shopify.
- Many of these existing providers don't integrate cryptocurrency
- Providers aren't distributed and suffer downsides of existing centralized platforms (vendor lock in, variable pricing, outages, etc.)

### Technologies used

- IPFS (Hosting and sharing of assets): https://web3.storage/
- Pillar (payments and wallet creation for uploaders)
- Unlock Protocol (purchasing): https://app.unlock-protocol.com/dashboard
- Audius: Music sharing and content listings.
- Ceramic: Used for storefront metadata storage and retrieval using streams (community node: https://developers.ceramic.network/run/nodes/community-nodes/).
- Fluence: Price oracle interaction for rendering real time USD quotes on checkout pages based on latest Eth price (fluence enables doing this without a deployed smart contract or other oracle).

### How to run

Define the following env variables

<pre>
    REACT_APP_STORAGE_KEY = {YOUR_WEB3_STORAGE_KEY}
</pre>

`yarn; yarn start`

### Aqua / Fluence

For price oracle, regenerate aqua script file with `js` flag.

<pre>
npm i -g @fluencelabs/aqua-cli # install aqua cli
aqua-cli -i aqua-scripts -o aqua-output --js
</pre>

<!--
Demo flow:
1. Intro
2. Assets (IPFS / filecoin)
3. Upload (IPFS / filecoin)
4. Generate CID with hosted content (IPFS / filecoin)
5. QR Code for page.
6. Preview page (fluence, ceramic)
7. Show checkout modal (unlock).
8. Generate wallet to receive funds (pillar)

-->

### Future Work

- Integrate payments and checkout flows directly from the catalog (enable the product to be used table side)
- Add support for address collection for physical or remote item purchase.

<!--
### Other links
* https://www.notion.so/Prizes-HackFS-d2aeebcda5694c7a9c06dc7aa2b7a2d8
* https://www.qr-code-generator.com/qr-code-api/?target=api-ad

React
* https://www.npmjs.com/package/react-catalog-view
* https://www.npmjs.com/package/react-image-gallery

-->
