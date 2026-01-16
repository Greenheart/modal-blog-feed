# Generate a web feed for the blog posts at https://modal.cx/blog/

Purpose: Make it easy to generate and publish an Atom web feed
even if the website is static HTML.

Updated: 2026-01-16

## Usage:

1. Open https://modal.cx/blog/ (or a local version of the same page) in a browser.
2. Copy and paste the following script into the dev tools console to generate the feed.
3. When prompted, download and save the file `feed.atom` to the root directory of the website source code.
4. Publish the `/feed.atom` with the next version of the website.

## Additional recommended changes:

You can find the `feed-discovery.html`

1. Allow Feed readers to auto-detect the feed by adding a meta tag to all web pages.
2. Add a link to the page footer to make it easy for humans to know they can subscribe to updates.

You can find the relevant HTML snippets in the attached file [`feed-discovery.html`](./feed-discovery.html).
