// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/padlock2_1.png" />
          {assets}
        </head>
        <body style={`margin: 0; background-color: #2c363f; color: #F3F6F6`}>
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));
