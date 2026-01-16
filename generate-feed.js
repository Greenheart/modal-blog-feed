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
