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

<!--
### Technologies used
* IPFS (Hosting and sharing of assets): https://web3.storage/
* Pillar (payments and wallet creation)
* Unlock Protocol (purchasing): https://app.unlock-protocol.com/dashboard
* Audius (music and content listings)
-->

### How to run

Define the following env variables

<pre>
    REACT_APP_STORAGE_KEY = {YOUR_WEB3_STORAGE_KEY}
</pre>

`yarn; yarn start`


<!-- 
Demo flow:
1. Intro
2. Assets
3. Upload
4. Generate CID with hosted content
5. Preview page
6. Show checkout modal
7. Generate wallet
8. NFT, other potential receipt

-->

### Future Work

- Integrate payments and checkout flows directly from the catalog (enable the product to be used table side)

<!--
### Other links
* https://www.notion.so/Prizes-HackFS-d2aeebcda5694c7a9c06dc7aa2b7a2d8
* https://www.qr-code-generator.com/qr-code-api/?target=api-ad

React
* https://www.npmjs.com/package/react-catalog-view
* https://www.npmjs.com/package/react-image-gallery

-->
