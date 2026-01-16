/**
 * Generate a web feed for the blog posts at https://modal.cx/blog/
 *
 * Purpose: Make it easy to generate and publish an Atom web feed
 * even if the website even if the website is static HTML.
 *
 * Updated: 2026-01-16
 *
 * ## Usage:
 *
 * 1. Open https://modal.cx/blog/ (or a local version of the same page) in a browser.
 * 2. Copy and paste the following script into the dev tools console to generate the feed.
 * 3. When prompted, download and save the file `feed.atom` to the root directory of the website source code.
 * 4. Publish the `/feed.atom` with the next version of the website.
 *
 * ## Additional recommended changes:
 *
 * You can find the `feed-discovery.html`
 * 1. Allow Feed readers to auto-detect the feed by adding a meta tag to all web pages.
 * 2. Add a link to the page footer to make it easy for humans to know they can subscribe to updates.
 *
 * You can find the relevant HTML snippets in the attached file `feed-discovery.html`.
 */
(async () => {
  // Relevant documentation: https://www.npmjs.com/package/feed
  const { Feed } = await import("https://cdn.jsdelivr.net/npm/feed@5.2.0/+esm");

  /**
   * Generate a web feed by extracting relevant information from the DOM.
   *
   * @returns {Feed} A built feed, ready to be output to various formats.
   */
  function generateFeed() {
    const feed = new Feed({
      title: "Modal Collective",
      description: document.querySelector('meta[name="description"]').content,
      copyright: document.querySelector("body > footer").innerText,
    });

    const posts = Array.from(
      document.querySelectorAll(".article-list section"),
    );

    posts.forEach((post) => {
      const title = post.querySelector("h2 a");
      const [_authors, date] = post
        .querySelector(".meta")
        .innerText.split(" • ");

      feed.addItem({
        title: title.innerText,
        id: title.href,
        link: title.href,
        date: new Date(date),
        image: post.querySelector("img").src,
      });
    });

    return feed;
  }

  /**
   * Download a file with text content.
   *
   * @param {string} fileName
   * @param {string} content
   * @param {string} fileType
   */
  function downloadFile(fileName, content, fileType) {
    const blob = new Blob([content], { type: fileType });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  async function main() {
    const feed = generateFeed();
    // The output format can be changed if desired, but Atom is recommended.
    // feed.rss2() -> RSS (XML)
    // feed.json() -> JSON feed
    downloadFile("feed.atom", feed.atom1(), "application/atom+xml");
  }

  await main();
})();
