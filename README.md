# icomoon-versioning application
This application was built to help find potential issues common to icon font creation and management over time.

# Icomoon Versioning Versioning
One of the hardest things to do when using IcoMoon to create Icon Fonts is to manage versioning. Glyphs can be modified or removed, codes and names can be changed leaving you with no idea when these changes were made or who made them.

The current version of the IcoMoon App creates a .zip file when you click the **Download** button containing the generated style sheet and font files. There is also a **selection.json** file that contains not just the glyphs chosen for the icon font but also the metadata used in their creation. This file can be added to your version control and imported into the IcoMoon app using the **Import Project** link.

Versioning this file will give you the ability to see changes in the metadat or the glyphs and use the version tool to determine when changes were made or detect potential breaking changes before they are published.

# How to use the icomoon-versioning application
The intent of this application is to give a visual comparison between the last published icon font and the one that you are about to publish. Place the last published **selection.json** into `resources/old` folder and the newest, not yet published **selection.json** into the `resources/new` folder and run the application.

After cloning the project run

```
npm install
```

To run in dev mode

```
npm run dev
```

Load the application by putting the address `http://localhost:8080` into your browser's address bar.
