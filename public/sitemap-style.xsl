<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" indent="yes"/>

  <xsl:template match="/">
    <html>
      <head>
        <title>Gogeneric Sitemap</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          .url { margin-bottom: 15px; }
          .loc { color: blue; }
          .changefreq { color: green; }
          .priority { color: purple; }
        </style>
      </head>
      <body>
        <h2>Gogeneric Sitemap</h2>
        <xsl:for-each select="urlset/url">
          <div class="url">
            <div class="loc">URL: <xsl:value-of select="loc"/></div>
            <div class="changefreq">Changefreq: <xsl:value-of select="changefreq"/></div>
            <div class="priority">Priority: <xsl:value-of select="priority"/></div>
          </div>
        </xsl:for-each>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
